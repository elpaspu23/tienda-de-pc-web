# 📧 GUÍA COMPLETA - SISTEMA DE ENVÍO DE FACTURAS POR EMAIL

## 📋 ÍNDICE
1. [Instalación de Dependencias](#instalación)
2. [Configuración de Email](#configuración-email)
3. [Estructura de Archivos](#estructura)
4. [Configuración Paso a Paso](#configuración-paso-a-paso)
5. [Integración con Webhooks](#integración-webhooks)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## 1️⃣ INSTALACIÓN DE DEPENDENCIAS

```bash
npm install nodemailer puppeteer
```

### Dependencias:
- **nodemailer**: Envío de emails
- **puppeteer**: Generación de PDFs desde HTML

---

## 2️⃣ CONFIGURACIÓN DE EMAIL

### Opción A: Gmail (Para desarrollo/pequeñas tiendas)

#### Paso 1: Habilitar autenticación de 2 pasos
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos → Activar

#### Paso 2: Generar contraseña de aplicación
1. Seguridad → Contraseñas de aplicaciones
2. Selecciona "Correo" y "Otro"
3. Genera la contraseña
4. Copia la contraseña de 16 caracteres

#### Paso 3: Configurar variables de entorno
```env
EMAIL_PROVIDER=gmail
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=ventas@techstore.com
```

### Opción B: SendGrid (Recomendado para producción)

#### Paso 1: Crear cuenta en SendGrid
1. Ve a https://sendgrid.com
2. Crea una cuenta gratis (100 emails/día)

#### Paso 2: Obtener API Key
1. Settings → API Keys → Create API Key
2. Selecciona "Full Access"
3. Copia la API Key

#### Paso 3: Verificar dominio
1. Settings → Sender Authentication
2. Verifica tu dominio de email

#### Paso 4: Variables de entorno
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=ventas@techstore.com
```

### Opción C: AWS SES (Para alto volumen)

```env
EMAIL_PROVIDER=ses
AWS_SES_HOST=email-smtp.us-east-1.amazonaws.com
AWS_SES_ACCESS_KEY=AKIAXXXXXXXXXXXXXXXX
AWS_SES_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=ventas@techstore.com
```

---

## 3️⃣ ESTRUCTURA DE ARCHIVOS

```
proyecto/
├── server.js
├── .env
├── services/
│   └── emailService.js
├── controllers/
│   └── webhookHandler.js
├── routes/
│   └── webhooks.js
├── templates/
│   └── invoice-template.html
└── models/
    ├── Order.js
    └── Transaction.js
```

---

## 4️⃣ CONFIGURACIÓN PASO A PASO

### Paso 1: Crear archivo .env

```env
# === CONFIGURACIÓN GENERAL ===
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://localhost/techstore

# === EMAIL ===
EMAIL_PROVIDER=gmail
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=ventas@techstore.com

# === MERCADOPAGO ===
MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxx

# === EPAYCO (PSE, Nequi, Daviplata) ===
EPAYCO_PUBLIC_KEY=xxxxxxxx
EPAYCO_PRIVATE_KEY=xxxxxxxx

# === PAYPAL ===
PAYPAL_CLIENT_ID=xxxxxxxx
PAYPAL_CLIENT_SECRET=xxxxxxxx
```

### Paso 2: Configurar server.js

```javascript
const express = require('express');
const webhookRoutes = require('./routes/webhooks');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', webhookRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
```

### Paso 3: Copiar archivos proporcionados

1. **emailService.js** → `services/emailService.js`
2. **webhookHandler.js** → `controllers/webhookHandler.js`
3. **routes-webhooks.js** → `routes/webhooks.js`
4. **invoice-template.html** → `templates/invoice-template.html`

### Paso 4: Actualizar rutas de archivos

En `emailService.js`, actualiza la ruta del template:
```javascript
const templatePath = path.join(__dirname, '../templates/invoice-template.html');
```

---

## 5️⃣ INTEGRACIÓN CON WEBHOOKS

### MercadoPago

1. **Configurar webhook en el dashboard:**
   - URL: `https://tu-dominio.com/api/webhooks/mercadopago`
   - Eventos: `payment`

2. **En tu código de creación de preferencia:**
```javascript
const preference = {
  // ... otros campos
  external_reference: orderId, // ID de tu orden
  notification_url: 'https://tu-dominio.com/api/webhooks/mercadopago'
};
```

### PSE / ePayco

```javascript
const pseData = {
  // ... otros campos
  url_confirmation: 'https://tu-dominio.com/api/webhooks/pse',
  method_confirmation: 'POST'
};
```

### PayPal

1. **Configurar webhook en PayPal Dashboard:**
   - URL: `https://tu-dominio.com/api/webhooks/paypal`
   - Eventos: `PAYMENT.CAPTURE.COMPLETED`

---

## 6️⃣ TESTING

### Test 1: Envío manual de factura

```javascript
// test-invoice.js
const { sendInvoiceEmail } = require('./services/emailService');

const testData = {
  id: 'ORD-123456',
  customer: {
    name: 'Juan Pérez',
    idType: 'CC',
    idNumber: '1234567890',
    email: 'tu-email-de-prueba@gmail.com', // TU EMAIL AQUÍ
    phone: '3001234567',
    address: 'Calle 100 #15-20',
    city: 'Bogotá',
    country: 'Colombia'
  },
  shipping: null, // Usa dirección del cliente
  items: [
    {
      name: 'iPad Pro 12.9"',
      description: 'Devoluciones internacionales gratis',
      quantity: 1,
      price: 189999
    },
    {
      name: 'AirPods con Pantalla LED',
      description: 'En stock',
      quantity: 1,
      price: 11999
    }
  ],
  subtotal: 201998,
  discount: 0,
  shippingCost: 0,
  total: 201998,
  paymentMethod: 'mercadopago',
  transactionId: 'MP-TEST-123456',
  paymentDate: new Date()
};

sendInvoiceEmail(testData)
  .then(result => {
    console.log('✅ Email de prueba enviado!');
    console.log('Número de factura:', result.invoiceNumber);
  })
  .catch(error => {
    console.error('❌ Error:', error);
  });
```

**Ejecutar:**
```bash
node test-invoice.js
```

### Test 2: Verificar generación de PDF

```javascript
// test-pdf.js
const { generateInvoiceHTML, generateInvoicePDF } = require('./services/emailService');
const fs = require('fs').promises;

async function testPDF() {
  const testData = {
    // ... mismo testData de arriba
  };
  
  const { html } = await generateInvoiceHTML(testData);
  const pdf = await generateInvoicePDF(html);
  
  await fs.writeFile('test-invoice.pdf', pdf);
  console.log('✅ PDF generado: test-invoice.pdf');
}

testPDF();
```

### Test 3: Webhook local con ngrok

```bash
# Instalar ngrok
npm install -g ngrok

# Iniciar túnel
ngrok http 5000

# Copiar URL (ej: https://abc123.ngrok.io)
# Configurar en webhooks de las pasarelas
```

---

## 7️⃣ PERSONALIZACIÓN

### Cambiar logo y colores

En `invoice-template.html`:

```html
<!-- Cambiar nombre de la empresa -->
<div class="company-name">TU EMPRESA</div>

<!-- Cambiar información -->
<div class="company-details">
  Tu Dirección<br>
  NIT: XXX-XXX-XXX<br>
  Tel: +57 XXX XXX XXXX
</div>
```

En el `<style>`:
```css
/* Cambiar color principal */
--primary-green: #10b981; /* Cambia este valor */
```

### Agregar más campos a la factura

1. Edita `invoice-template.html`
2. Agrega `{{NUEVO_CAMPO}}` donde lo necesites
3. En `emailService.js`, agrega el reemplazo:
```javascript
const replacements = {
  // ... campos existentes
  '{{NUEVO_CAMPO}}': orderData.nuevoCampo
};
```

---

## 8️⃣ TROUBLESHOOTING

### ❌ "Error: Invalid login: 535-5.7.8 Username and Password not accepted"

**Solución:**
- Verifica que tengas autenticación de 2 pasos activada
- Usa una contraseña de aplicación, NO tu contraseña de Gmail
- Verifica que no haya espacios en la contraseña

### ❌ "Error: Could not find Chrome"

**Solución:**
```bash
# Instalar Chrome/Chromium para Puppeteer
npm install puppeteer --save
```

### ❌ Email llega a spam

**Solución:**
1. Configura SPF, DKIM y DMARC en tu dominio
2. Usa un servicio profesional (SendGrid, SES)
3. No uses palabras spam en el asunto
4. Mantén ratio de engagement alto

### ❌ PDF muy grande

**Solución:**
En `emailService.js`:
```javascript
const pdfBuffer = await page.pdf({
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  // Reducir calidad de imágenes
  quality: 80
});
```

---

## 9️⃣ PRODUCCIÓN

### Checklist antes de ir a producción:

- [ ] Cambiar credenciales de test a producción
- [ ] Configurar dominio de email verificado
- [ ] Configurar HTTPS
- [ ] Probar todos los webhooks
- [ ] Configurar monitoreo de emails
- [ ] Configurar logs
- [ ] Hacer backup de templates
- [ ] Probar con pedidos reales pequeños

### Variables de entorno de producción:

```env
NODE_ENV=production
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=tu-api-key-real
EMAIL_FROM=ventas@tudominio.com
```

---

## 🎯 EJEMPLO COMPLETO DE USO

```javascript
// En tu endpoint de checkout exitoso
app.post('/checkout/success', async (req, res) => {
  const { orderId } = req.body;
  
  // 1. Obtener datos de la orden
  const order = await Order.findById(orderId);
  
  // 2. Preparar datos para factura
  const invoiceData = {
    id: order.id,
    customer: {
      name: order.customerName,
      email: order.customerEmail,
      // ... más campos
    },
    items: order.items,
    total: order.total,
    paymentMethod: order.paymentMethod,
    transactionId: order.transactionId,
    paymentDate: new Date()
  };
  
  // 3. Enviar factura
  try {
    const result = await sendInvoiceEmail(invoiceData);
    console.log('✅ Factura enviada:', result.invoiceNumber);
    
    // 4. Actualizar orden con número de factura
    await Order.update(orderId, {
      invoiceNumber: result.invoiceNumber,
      invoiceSentAt: new Date()
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error enviando factura:', error);
    // No fallar el checkout si falla el email
    res.json({ success: true, invoiceError: true });
  }
});
```

---

## 📚 RECURSOS ADICIONALES

- Nodemailer: https://nodemailer.com/
- Puppeteer: https://pptr.dev/
- SendGrid: https://sendgrid.com/docs/
- AWS SES: https://docs.aws.amazon.com/ses/

---

**¿Necesitas ayuda?**
- 📧 Email: soporte@techstore.com
- 💬 Slack: #dev-team

**Última actualización:** Febrero 2026
