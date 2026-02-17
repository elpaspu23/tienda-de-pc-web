// test-envio-factura.js
// Script simple para probar el envío de facturas

require('dotenv').config();
const { sendInvoiceEmail } = require('./services/emailService');

// ============================================
// DATOS DE PRUEBA
// ============================================

const datosOrdenPrueba = {
  id: 'ORD-2026-001',
  
  // Información del cliente
  customer: {
    name: 'María García Rodríguez',
    idType: 'CC',
    idNumber: '1234567890',
    email: 'TU-EMAIL-AQUI@gmail.com', // ⚠️ CAMBIA ESTO POR TU EMAIL
    phone: '+57 300 123 4567',
    address: 'Carrera 15 #93-20, Apartamento 501',
    city: 'Bogotá',
    country: 'Colombia'
  },
  
  // Dirección de envío (opcional, si es diferente)
  shipping: {
    name: 'María García Rodríguez',
    address: 'Carrera 15 #93-20, Apartamento 501',
    city: 'Bogotá',
    state: 'Cundinamarca',
    country: 'Colombia',
    phone: '+57 300 123 4567'
  },
  
  // Productos comprados
  items: [
    {
      name: 'iPad Pro 12.9"',
      description: 'Chip M2, 256GB, WiFi + Cellular',
      quantity: 1,
      price: 189999
    },
    {
      name: 'AirPods con Pantalla LED',
      description: 'Bluetooth 5.0, Cancelación de ruido',
      quantity: 1,
      price: 11999
    },
    {
      name: 'AirPods Pro 2 Gen',
      description: 'Con estuche de carga USB-C',
      quantity: 1,
      price: 15999
    },
    {
      name: 'AirPods 3era Gen',
      description: 'Audio espacial personalizado',
      quantity: 3,
      price: 12999
    }
  ],
  
  // Totales
  subtotal: 256994,
  discount: 0,
  shippingCost: 0, // Envío gratis
  total: 256994,
  
  // Información de pago
  paymentMethod: 'mercadopago',
  transactionId: 'MP-123456789',
  paymentDate: new Date('2026-02-16T14:30:00')
};

// ============================================
// EJECUTAR PRUEBA
// ============================================

console.log('🚀 Iniciando prueba de envío de factura...\n');
console.log('📧 Email destino:', datosOrdenPrueba.customer.email);
console.log('💰 Total de la orden: $' + datosOrdenPrueba.total.toLocaleString('es-CO'));
console.log('');

sendInvoiceEmail(datosOrdenPrueba)
  .then(result => {
    console.log('\n✅ ¡ÉXITO! Email enviado correctamente');
    console.log('📄 Número de factura:', result.invoiceNumber);
    console.log('🆔 Message ID:', result.messageId);
    console.log('\n📬 Revisa tu bandeja de entrada!');
  })
  .catch(error => {
    console.error('\n❌ ERROR al enviar email:');
    console.error(error.message);
    console.error('\n💡 Posibles soluciones:');
    console.error('1. Verifica tu archivo .env');
    console.error('2. Confirma que Gmail tiene autenticación de 2 pasos');
    console.error('3. Usa una contraseña de aplicación (no tu contraseña normal)');
    console.error('4. Revisa que no haya espacios en las variables de entorno');
  });

// ============================================
// NOTAS IMPORTANTES
// ============================================

console.log('\n📝 NOTAS:');
console.log('- Cambia TU-EMAIL-AQUI por tu email real');
console.log('- Asegúrate de tener configurado el .env');
console.log('- El PDF se adjuntará automáticamente al email');
console.log('');
