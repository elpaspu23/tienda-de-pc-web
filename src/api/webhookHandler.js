import { sendInvoiceEmail } from './emailService.js';

// ============================================
// MANEJO DE ORDEN MANUAL / WEBHOOK
// ============================================

export const handleManualOrder = async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validación básica
    if (!orderData || !orderData.customer || !orderData.customer.email) {
      return res?.status(400).json({ error: 'Faltan datos de la orden o cliente' });
    }

    console.log('📝 Procesando orden:', orderData.id || 'Nueva');

    // 1. (Opcional) Aquí validaríamos el pago si fuera webhook real
    // ...

    // 2. Enviar email con factura
    await sendInvoiceEmail(orderData);

    // 3. Responder éxito
    if (res) {
        res.status(200).json({ 
            success: true, 
            message: 'Orden procesada y factura enviada',
            invoiceNumber: orderData.invoiceNumber
        });
    }

  } catch (error) {
    console.error('Error procesando orden:', error);
    if (res) {
        res.status(500).json({ error: 'Error interno procesando la orden', details: error.message });
    }
  }
};
