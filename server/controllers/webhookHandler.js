// webhookHandler.js - Integración de webhooks con envío automático de factura

const { sendInvoiceEmail } = require('./emailService');
const Transaction = require('./models/Transaction');
const Order = require('./models/Order');

// ============================================
// WEBHOOK DE MERCADOPAGO
// ============================================

const handleMercadoPagoWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;
    
    console.log('📥 Webhook MercadoPago recibido:', type);
    
    if (type === 'payment') {
      const mercadopago = require('mercadopago');
      const payment = await mercadopago.payment.findById(data.id);
      
      const paymentData = payment.body;
      const orderId = paymentData.external_reference; // ID del pedido
      
      // Buscar la orden en la base de datos
      const order = await Order.findById(orderId);
      
      if (!order) {
        console.error('❌ Orden no encontrada:', orderId);
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      
      // Actualizar estado de la transacción
      await Transaction.update({
        orderId: orderId,
        status: paymentData.status,
        gatewayTransactionId: data.id,
        gatewayResponse: paymentData
      });
      
      // Si el pago fue aprobado, enviar factura
      if (paymentData.status === 'approved') {
        console.log('✅ Pago aprobado, enviando factura...');
        
        // Actualizar orden
        await Order.updateStatus(orderId, 'paid');
        
        // Preparar datos para la factura
        const invoiceData = {
          id: order.id,
          customer: {
            name: order.customerName,
            idType: order.customerIdType,
            idNumber: order.customerIdNumber,
            email: order.customerEmail,
            phone: order.customerPhone,
            address: order.customerAddress,
            city: order.customerCity,
            country: order.customerCountry || 'Colombia'
          },
          shipping: order.shippingAddress ? {
            name: order.shippingName,
            address: order.shippingAddress,
            city: order.shippingCity,
            state: order.shippingState,
            country: order.shippingCountry,
            phone: order.shippingPhone
          } : null,
          items: order.items,
          subtotal: order.subtotal,
          discount: order.discount || 0,
          shippingCost: order.shippingCost || 0,
          total: order.total,
          paymentMethod: 'mercadopago',
          transactionId: data.id,
          paymentDate: new Date()
        };
        
        // Enviar factura por email
        const emailResult = await sendInvoiceEmail(invoiceData);
        
        console.log('📧 Factura enviada:', emailResult.invoiceNumber);
        
        // Guardar número de factura en la orden
        await Order.update(orderId, { 
          invoiceNumber: emailResult.invoiceNumber,
          invoiceSentAt: new Date()
        });
      }
    }
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('❌ Error en webhook MercadoPago:', error);
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// WEBHOOK DE PSE (vía ePayco)
// ============================================

const handlePSEWebhook = async (req, res) => {
  try {
    const { x_transaction_id, x_ref_payco, x_response, x_approval_code } = req.body;
    
    console.log('📥 Webhook PSE recibido');
    
    // Buscar la orden
    const order = await Order.findByReference(x_ref_payco);
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    // Actualizar transacción
    await Transaction.update({
      orderId: order.id,
      status: x_response === 'Aceptada' ? 'approved' : 'rejected',
      gatewayTransactionId: x_transaction_id,
      gatewayResponse: req.body
    });
    
    // Si fue aprobado, enviar factura
    if (x_response === 'Aceptada') {
      console.log('✅ Pago PSE aprobado, enviando factura...');
      
      await Order.updateStatus(order.id, 'paid');
      
      const invoiceData = prepareInvoiceData(order, 'pse', x_transaction_id);
      const emailResult = await sendInvoiceEmail(invoiceData);
      
      await Order.update(order.id, { 
        invoiceNumber: emailResult.invoiceNumber,
        invoiceSentAt: new Date()
      });
      
      console.log('📧 Factura PSE enviada:', emailResult.invoiceNumber);
    }
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('❌ Error en webhook PSE:', error);
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// WEBHOOK DE PAYPAL
// ============================================

const handlePayPalWebhook = async (req, res) => {
  try {
    const { event_type, resource } = req.body;
    
    console.log('📥 Webhook PayPal recibido:', event_type);
    
    if (event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const orderId = resource.purchase_units[0].custom_id;
      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      
      await Transaction.update({
        orderId: order.id,
        status: 'approved',
        gatewayTransactionId: resource.id,
        gatewayResponse: resource
      });
      
      console.log('✅ Pago PayPal completado, enviando factura...');
      
      await Order.updateStatus(order.id, 'paid');
      
      const invoiceData = prepareInvoiceData(order, 'paypal', resource.id);
      const emailResult = await sendInvoiceEmail(invoiceData);
      
      await Order.update(order.id, { 
        invoiceNumber: emailResult.invoiceNumber,
        invoiceSentAt: new Date()
      });
      
      console.log('📧 Factura PayPal enviada:', emailResult.invoiceNumber);
    }
    
    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('❌ Error en webhook PayPal:', error);
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// FUNCIÓN AUXILIAR PARA PREPARAR DATOS
// ============================================

const prepareInvoiceData = (order, paymentMethod, transactionId) => {
  return {
    id: order.id,
    customer: {
      name: order.customerName,
      idType: order.customerIdType,
      idNumber: order.customerIdNumber,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.customerAddress,
      city: order.customerCity,
      country: order.customerCountry || 'Colombia'
    },
    shipping: order.shippingAddress ? {
      name: order.shippingName,
      address: order.shippingAddress,
      city: order.shippingCity,
      state: order.shippingState,
      country: order.shippingCountry,
      phone: order.shippingPhone
    } : null,
    items: order.items,
    subtotal: order.subtotal,
    discount: order.discount || 0,
    shippingCost: order.shippingCost || 0,
    total: order.total,
    paymentMethod: paymentMethod,
    transactionId: transactionId,
    paymentDate: new Date()
  };
};

// ============================================
// ENDPOINT MANUAL PARA REENVIAR FACTURA
// ============================================

const resendInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    console.log(`📧 Reenviando factura para orden ${orderId}...`);
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    if (order.status !== 'paid') {
      return res.status(400).json({ 
        error: 'La orden debe estar pagada para enviar factura' 
      });
    }
    
    const transaction = await Transaction.findByOrderId(orderId);
    const invoiceData = prepareInvoiceData(
      order, 
      transaction.paymentMethod, 
      transaction.gatewayTransactionId
    );
    
    const emailResult = await sendInvoiceEmail(invoiceData);
    
    res.json({ 
      success: true, 
      message: 'Factura reenviada exitosamente',
      invoiceNumber: emailResult.invoiceNumber
    });
    
  } catch (error) {
    console.error('❌ Error reenviando factura:', error);
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// EXPORTS
// ============================================

module.exports = {
  handleMercadoPagoWebhook,
  handlePSEWebhook,
  handlePayPalWebhook,
  resendInvoice
};
