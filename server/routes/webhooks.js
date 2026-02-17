// routes/webhooks.js - Rutas para webhooks y manejo de facturas

const express = require('express');
const router = express.Router();
const {
  handleMercadoPagoWebhook,
  handlePSEWebhook,
  handlePayPalWebhook,
  resendInvoice
} = require('../controllers/webhookHandler');

// ============================================
// WEBHOOKS (llamados por las pasarelas de pago)
// ============================================

// MercadoPago
router.post('/webhooks/mercadopago', handleMercadoPagoWebhook);

// PSE / ePayco
router.post('/webhooks/pse', handlePSEWebhook);
router.post('/webhooks/epayco', handlePSEWebhook); // Mismo handler

// Nequi (usa ePayco)
router.post('/webhooks/nequi', handlePSEWebhook);

// Daviplata (usa ePayco)
router.post('/webhooks/daviplata', handlePSEWebhook);

// PayPal
router.post('/webhooks/paypal', handlePayPalWebhook);

// ============================================
// ENDPOINTS ADMINISTRATIVOS
// ============================================

// Reenviar factura manualmente
router.post('/admin/orders/:orderId/resend-invoice', resendInvoice);

// Obtener factura en PDF
router.get('/admin/orders/:orderId/invoice/pdf', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { generateInvoiceHTML, generateInvoicePDF } = require('../services/emailService');
    const Order = require('../models/Order');
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    
    // Preparar datos
    const invoiceData = {
      id: order.id,
      customer: {
        name: order.customerName,
        email: order.customerEmail,
        // ... resto de campos
      },
      items: order.items,
      total: order.total
      // ... resto de campos
    };
    
    const { html } = await generateInvoiceHTML(invoiceData);
    const pdfBuffer = await generateInvoicePDF(html);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Factura-${order.invoiceNumber}.pdf`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ver HTML de factura (para debugging)
router.get('/admin/orders/:orderId/invoice/preview', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { generateInvoiceHTML } = require('../services/emailService');
    const Order = require('../models/Order');
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).send('Orden no encontrada');
    }
    
    const invoiceData = {
      // ... preparar datos igual que arriba
    };
    
    const { html } = await generateInvoiceHTML(invoiceData);
    res.send(html);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error generando vista previa');
  }
});

module.exports = router;
