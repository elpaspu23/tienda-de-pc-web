// emailService.js - Servicio completo para envío de facturas por email

const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

// ============================================
// CONFIGURACIÓN DEL TRANSPORTER DE EMAIL
// ============================================

// Opción 1: Gmail (para desarrollo/pequeñas tiendas)
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // tu-email@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD // Contraseña de aplicación
    }
  });
};

// Opción 2: SendGrid (recomendado para producción)
const createSendGridTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  });
};

// Opción 3: AWS SES (para alto volumen)
const createSESTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.AWS_SES_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.AWS_SES_ACCESS_KEY,
      pass: process.env.AWS_SES_SECRET_KEY
    }
  });
};

// Selecciona el transporter según configuración
const getTransporter = () => {
  const emailProvider = process.env.EMAIL_PROVIDER || 'gmail';
  
  switch(emailProvider) {
    case 'gmail':
      return createGmailTransporter();
    case 'sendgrid':
      return createSendGridTransporter();
    case 'ses':
      return createSESTransporter();
    default:
      return createGmailTransporter();
  }
};

// ============================================
// GENERACIÓN DE FACTURA EN HTML
// ============================================

const generateInvoiceHTML = async (orderData) => {
  // Leer el template HTML
  const templatePath = path.join(__dirname, '../templates/invoice-template.html');
  let htmlTemplate = await fs.readFile(templatePath, 'utf-8');
  
  // Generar número de factura
  const invoiceNumber = `INV-${orderData.id}-${Date.now()}`;
  
  // Formatear fecha
  const invoiceDate = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Formatear items
  const itemsHTML = orderData.items.map(item => `
    <tr>
      <td>
        <div class="item-name">${item.name}</div>
        <div class="item-description">${item.description || ''}</div>
      </td>
      <td>${item.quantity}</td>
      <td>$ ${formatCurrency(item.price)}</td>
      <td>$ ${formatCurrency(item.quantity * item.price)}</td>
    </tr>
  `).join('');
  
  // Reemplazar variables en el template
  const replacements = {
    '{{INVOICE_NUMBER}}': invoiceNumber,
    '{{INVOICE_DATE}}': invoiceDate,
    '{{STATUS}}': 'PAGADO',
    '{{CUSTOMER_NAME}}': orderData.customer.name,
    '{{CUSTOMER_ID_TYPE}}': orderData.customer.idType || 'CC',
    '{{CUSTOMER_ID}}': orderData.customer.idNumber,
    '{{CUSTOMER_EMAIL}}': orderData.customer.email,
    '{{CUSTOMER_PHONE}}': orderData.customer.phone,
    '{{CUSTOMER_ADDRESS}}': orderData.customer.address,
    '{{CUSTOMER_CITY}}': orderData.customer.city,
    '{{CUSTOMER_COUNTRY}}': orderData.customer.country || 'Colombia',
    '{{SHIPPING_NAME}}': orderData.shipping?.name || orderData.customer.name,
    '{{SHIPPING_ADDRESS}}': orderData.shipping?.address || orderData.customer.address,
    '{{SHIPPING_CITY}}': orderData.shipping?.city || orderData.customer.city,
    '{{SHIPPING_STATE}}': orderData.shipping?.state || '',
    '{{SHIPPING_COUNTRY}}': orderData.shipping?.country || 'Colombia',
    '{{SHIPPING_PHONE}}': orderData.shipping?.phone || orderData.customer.phone,
    '{{ITEMS}}': itemsHTML,
    '{{CURRENCY}}': '$',
    '{{SUBTOTAL}}': formatCurrency(orderData.subtotal),
    '{{DISCOUNT}}': formatCurrency(orderData.discount || 0),
    '{{SHIPPING_COST}}': orderData.shippingCost > 0 ? `$ ${formatCurrency(orderData.shippingCost)}` : 'Gratis',
    '{{TOTAL}}': formatCurrency(orderData.total),
    '{{PAYMENT_METHOD}}': getPaymentMethodName(orderData.paymentMethod),
    '{{TRANSACTION_ID}}': orderData.transactionId,
    '{{PAYMENT_DATE}}': new Date(orderData.paymentDate).toLocaleDateString('es-CO')
  };
  
  // Aplicar reemplazos
  for (const [key, value] of Object.entries(replacements)) {
    htmlTemplate = htmlTemplate.replace(new RegExp(key, 'g'), value);
  }
  
  return {
    html: htmlTemplate,
    invoiceNumber
  };
};

// ============================================
// GENERACIÓN DE PDF
// ============================================

const generateInvoicePDF = async (htmlContent) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      printBackground: true
    });
    
    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

// ============================================
// ENVÍO DE EMAIL CON FACTURA
// ============================================

const sendInvoiceEmail = async (orderData) => {
  try {
    console.log(`📧 Generando factura para pedido ${orderData.id}...`);
    
    // 1. Generar HTML de la factura
    const { html: invoiceHTML, invoiceNumber } = await generateInvoiceHTML(orderData);
    
    // 2. Generar PDF de la factura
    console.log('📄 Generando PDF...');
    const pdfBuffer = await generateInvoicePDF(invoiceHTML);
    
    // 3. Configurar el email
    const transporter = getTransporter();
    
    const mailOptions = {
      from: {
        name: 'TechStore',
        address: process.env.EMAIL_FROM || 'ventas@techstore.com'
      },
      to: orderData.customer.email,
      subject: `✅ Factura de tu pedido #${orderData.id} - TechStore`,
      html: getEmailBodyHTML(orderData, invoiceNumber),
      attachments: [
        {
          filename: `Factura-${invoiceNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };
    
    // 4. Enviar email
    console.log('📮 Enviando email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email enviado exitosamente: ${info.messageId}`);
    
    return {
      success: true,
      messageId: info.messageId,
      invoiceNumber
    };
    
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
};

// ============================================
// TEMPLATE DEL CUERPO DEL EMAIL
// ============================================

const getEmailBodyHTML = (orderData, invoiceNumber) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f9fafb;
          padding: 30px;
        }
        .order-summary {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #10b981;
        }
        .product-list {
          list-style: none;
          padding: 0;
        }
        .product-item {
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .total {
          font-size: 24px;
          color: #10b981;
          font-weight: bold;
          text-align: right;
          margin-top: 20px;
        }
        .button {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
        }
        .footer {
          background: #333;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          border-radius: 0 0 8px 8px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 ¡Gracias por tu compra!</h1>
        <p>Tu pedido ha sido confirmado</p>
      </div>
      
      <div class="content">
        <p>Hola <strong>${orderData.customer.name}</strong>,</p>
        
        <p>¡Excelente noticia! Tu pago ha sido procesado exitosamente y tu pedido está confirmado.</p>
        
        <div class="order-summary">
          <h2>📦 Resumen del Pedido</h2>
          <p><strong>Número de pedido:</strong> #${orderData.id}</p>
          <p><strong>Factura:</strong> ${invoiceNumber}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-CO')}</p>
          
          <h3>Productos:</h3>
          <ul class="product-list">
            ${orderData.items.map(item => `
              <li class="product-item">
                <strong>${item.name}</strong><br>
                Cantidad: ${item.quantity} × $${formatCurrency(item.price)} = <strong>$${formatCurrency(item.quantity * item.price)}</strong>
              </li>
            `).join('')}
          </ul>
          
          <div class="total">
            Total: $${formatCurrency(orderData.total)}
          </div>
        </div>
        
        <p><strong>📄 Tu factura está adjunta en este correo en formato PDF.</strong></p>
        
        <p>📍 <strong>Dirección de envío:</strong><br>
        ${orderData.shipping?.address || orderData.customer.address}<br>
        ${orderData.shipping?.city || orderData.customer.city}, ${orderData.shipping?.country || 'Colombia'}</p>
        
        <p>⏱️ <strong>Tiempo estimado de entrega:</strong> 3-5 días hábiles</p>
        
        <center>
          <a href="https://techstore.com/orders/${orderData.id}" class="button">
            Ver estado del pedido
          </a>
        </center>
        
        <p style="margin-top: 30px;">Si tienes alguna pregunta, no dudes en contactarnos:</p>
        <p>
          📧 Email: soporte@techstore.com<br>
          📱 WhatsApp: +57 300 123 4567<br>
          🌐 Web: www.techstore.com
        </p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} TechStore. Todos los derechos reservados.</p>
        <p>Este es un email automático, por favor no responder directamente.</p>
      </div>
    </body>
    </html>
  `;
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO').format(amount);
};

const getPaymentMethodName = (method) => {
  const methods = {
    'mercadopago': 'MercadoPago',
    'pse': 'PSE',
    'nequi': 'Nequi',
    'daviplata': 'Daviplata',
    'paypal': 'PayPal',
    'credit_card': 'Tarjeta de Crédito',
    'debit_card': 'Tarjeta de Débito'
  };
  return methods[method] || method;
};

// ============================================
// FUNCIÓN PARA ENVIAR EMAIL DE CONFIRMACIÓN SIMPLE
// ============================================

const sendOrderConfirmationEmail = async (orderData) => {
  const transporter = getTransporter();
  
  const mailOptions = {
    from: {
      name: 'TechStore',
      address: process.env.EMAIL_FROM || 'ventas@techstore.com'
    },
    to: orderData.customer.email,
    subject: `✅ Pedido confirmado #${orderData.id} - TechStore`,
    html: getEmailBodyHTML(orderData, `INV-${orderData.id}`)
  };
  
  return await transporter.sendMail(mailOptions);
};

// ============================================
// EXPORTS
// ============================================

module.exports = {
  sendInvoiceEmail,
  sendOrderConfirmationEmail,
  generateInvoiceHTML,
  generateInvoicePDF
};
