# 📝 ESPECIFICACIONES TÉCNICAS - SISTEMA DE PAGOS TECHSTORE

## 🎯 OBJETIVO DEL PROYECTO

Implementar un sistema completo de procesamiento de pagos para TechStore que soporte múltiples pasarelas de pago locales e internacionales, con una interfaz moderna y segura.

---

## 📋 REQUERIMIENTOS FUNCIONALES

### RF-01: Selección de Método de Pago
- El usuario debe poder visualizar todos los métodos de pago disponibles
- Cada método debe mostrar: icono, nombre, descripción, badge informativo
- Al seleccionar un método, debe resaltarse visualmente (borde verde, checkmark)
- Solo se puede seleccionar un método a la vez

### RF-02: Métodos de Pago Requeridos
1. **MercadoPago** (Latinoamérica)
   - Soporte para tarjetas Visa, Mastercard, American Express
   - Badge: "Más usado"
   
2. **PSE** (Colombia)
   - Selector de banco (Bancolombia, Davivienda, BBVA, Nequi)
   - Badge: "Inmediato"
   
3. **Nequi** (Colombia)
   - Pago mediante número de celular
   - Badge: "Rápido"
   
4. **Daviplata** (Colombia)
   - Pago mediante número de celular
   
5. **PayPal** (Internacional)
   - Integración con botones oficiales de PayPal
   - Badge: "Internacional"

### RF-03: Resumen de Compra
- Debe mostrarse el subtotal de productos
- Indicar estado del envío (gratis/con costo)
- Mostrar total a pagar destacado en verde

### RF-04: Validaciones
- No permitir continuar sin seleccionar método de pago
- Validar datos de usuario antes de procesar
- Validar montos mínimos/máximos según pasarela

### RF-05: Flujo de Pago
1. Usuario selecciona método de pago
2. Si requiere datos adicionales (banco, teléfono), mostrar formulario
3. Usuario hace clic en "Continuar al pago"
4. Redirección a pasarela o procesamiento directo
5. Webhook recibe confirmación
6. Actualización de estado del pedido
7. Redirección a página de confirmación

### RF-06: Estados de Transacción
- **Pending**: Pago iniciado pero no confirmado
- **Approved**: Pago aprobado
- **Rejected**: Pago rechazado
- **Cancelled**: Pago cancelado por el usuario
- **Refunded**: Pago reembolsado

---

## 🎨 REQUERIMIENTOS DE DISEÑO (UI/UX)

### DIS-01: Paleta de Colores
```css
--primary-green: #10b981 (emerald-500)
--success-green: #059669 (emerald-600)
--hover-green: #047857 (emerald-700)
--bg-gradient: linear-gradient(to-br, #f9fafb, #f3f4f6)
--card-bg: #ffffff
--border-default: #e5e7eb
--border-active: #10b981
```

### DIS-02: Componentes Visuales

**Tarjeta de Método de Pago:**
- Border radius: 12px
- Padding: 20px
- Border: 2px
- Hover effect: scale(1.02) + shadow
- Seleccionado: border verde + ring verde + checkmark

**Botón Principal:**
- Height: 48px
- Border radius: 12px
- Font size: 18px
- Font weight: bold
- Disabled state: gris claro

**Badge Informativo:**
- Font size: 12px
- Padding: 4px 8px
- Border radius: 9999px (pill shape)
- Background: verde claro

### DIS-03: Responsive Design
- Mobile first approach
- Breakpoints:
  - Mobile: < 640px (1 columna)
  - Tablet: 640px - 1024px (1 columna)
  - Desktop: > 1024px (layout optimizado)

### DIS-04: Iconografía
- Usar Lucide React icons
- Tamaño: 24px
- Color: Heredado del contenedor padre

### DIS-05: Animaciones
- Transiciones: 200ms ease
- Hover effects sutiles
- Feedback visual inmediato en selección

---

## 🏗️ ARQUITECTURA TÉCNICA

### ARQ-01: Stack Tecnológico

**Frontend:**
- React 18+
- TailwindCSS
- Lucide React (iconos)
- React Router (navegación)

**Backend:**
- Node.js 18+
- Express.js
- PostgreSQL (base de datos)
- Redis (caché y sesiones)

**Librerías de Pago:**
```json
{
  "@mercadopago/sdk-react": "^0.0.15",
  "mercadopago": "^2.0.0",
  "@paypal/react-paypal-js": "^8.1.3",
  "@paypal/checkout-server-sdk": "^1.0.3",
  "epayco-sdk-node": "^1.0.0"
}
```

### ARQ-02: Estructura de Directorios
```
src/
├── components/
│   ├── payment/
│   │   ├── PaymentMethods.jsx
│   │   ├── MercadoPagoCheckout.jsx
│   │   ├── PSECheckout.jsx
│   │   ├── NequiCheckout.jsx
│   │   ├── DaviplataCheckout.jsx
│   │   └── PayPalCheckout.jsx
│   └── common/
│       ├── Button.jsx
│       └── Badge.jsx
├── services/
│   ├── api.js
│   └── payment.js
├── hooks/
│   └── usePayment.js
└── utils/
    └── formatters.js

server/
├── routes/
│   ├── payments.js
│   └── webhooks.js
├── controllers/
│   ├── mercadopago.js
│   ├── pse.js
│   ├── nequi.js
│   ├── daviplata.js
│   └── paypal.js
├── models/
│   └── Transaction.js
└── middleware/
    ├── auth.js
    └── validatePayment.js
```

### ARQ-03: Base de Datos

**Tabla: transactions**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(100) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id),
  payment_method VARCHAR(50) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'COP',
  status VARCHAR(20) NOT NULL,
  gateway_transaction_id VARCHAR(255),
  gateway_response JSON,
  metadata JSON,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_id ON transactions(order_id);
CREATE INDEX idx_user_id ON transactions(user_id);
CREATE INDEX idx_status ON transactions(status);
```

**Tabla: payment_logs**
```sql
CREATE TABLE payment_logs (
  id SERIAL PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id),
  event_type VARCHAR(50),
  event_data JSON,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 SEGURIDAD

### SEG-01: Manejo de Credenciales
- Todas las credenciales en variables de entorno
- NUNCA exponer claves privadas en el cliente
- Usar .env.example como plantilla

### SEG-02: Validación de Webhooks
```javascript
// Ejemplo de validación de firma
const validateWebhook = (signature, body, secret) => {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  return hash === signature;
};
```

### SEG-03: HTTPS Obligatorio
- Certificado SSL/TLS en producción
- Redirect automático HTTP → HTTPS
- HSTS headers configurados

### SEG-04: Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // 10 intentos
  message: 'Demasiados intentos de pago'
});

app.use('/api/payments', paymentLimiter);
```

### SEG-05: Sanitización de Datos
```javascript
const sanitize = require('mongo-sanitize');

app.post('/payment', (req, res) => {
  const clean = sanitize(req.body);
  // Procesar...
});
```

---

## 🧪 TESTING

### TEST-01: Tests Unitarios
```javascript
describe('Payment Processing', () => {
  it('should create MercadoPago preference', async () => {
    const preference = await createMercadoPagoPreference(mockData);
    expect(preference).toHaveProperty('id');
  });

  it('should validate payment amount', () => {
    expect(validateAmount(100000)).toBe(true);
    expect(validateAmount(-100)).toBe(false);
  });
});
```

### TEST-02: Tests de Integración
- Probar flujo completo de cada pasarela
- Verificar webhooks
- Validar estados de transacción

### TEST-03: Tests E2E
```javascript
// Usando Cypress
describe('Checkout Flow', () => {
  it('completes payment with MercadoPago', () => {
    cy.visit('/checkout');
    cy.get('[data-testid="payment-mercadopago"]').click();
    cy.get('[data-testid="submit-payment"]').click();
    cy.url().should('include', '/success');
  });
});
```

---

## 🚀 DEPLOYMENT

### DEP-01: Entornos
- **Development**: localhost:3000
- **Staging**: staging.techstore.com
- **Production**: techstore.com

### DEP-02: Variables de Entorno
```env
# Development
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://localhost/techstore_dev

# MercadoPago
MERCADOPAGO_PUBLIC_KEY_TEST=TEST-xxxxx
MERCADOPAGO_ACCESS_TOKEN_TEST=TEST-xxxxx

# Production
NODE_ENV=production
MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxx
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxx
```

### DEP-03: CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

---

## 📊 MONITOREO Y LOGGING

### MON-01: Métricas a Trackear
- Tasa de conversión por método de pago
- Tiempo promedio de procesamiento
- Tasa de rechazos
- Ingresos por pasarela

### MON-02: Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'payments.log' })
  ]
});

logger.info('Payment initiated', {
  orderId: order.id,
  method: 'mercadopago',
  amount: order.total
});
```

---

## 📱 CASOS DE USO

### CU-01: Pago con MercadoPago
1. Usuario llega a checkout
2. Selecciona MercadoPago
3. Click en "Continuar al pago"
4. Sistema crea preferencia de pago
5. Usuario redirigido a MercadoPago
6. Usuario completa pago
7. MercadoPago envía webhook
8. Sistema actualiza estado
9. Usuario redirigido a confirmación

### CU-02: Pago con PSE
1. Usuario selecciona PSE
2. Despliega selector de bancos
3. Usuario selecciona su banco
4. Click en "Continuar al pago"
5. Sistema crea transacción PSE
6. Usuario redirigido al banco
7. Usuario completa autenticación
8. Banco procesa pago
9. Webhook confirma pago
10. Redirección a confirmación

---

## 🎯 CRITERIOS DE ACEPTACIÓN

### CA-01: Funcionalidad
- ✅ Todas las pasarelas funcionan correctamente
- ✅ Webhooks procesan correctamente
- ✅ Estados de transacción se actualizan
- ✅ Emails de confirmación se envían

### CA-02: UI/UX
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Feedback visual claro
- ✅ Tiempos de carga < 2s

### CA-03: Seguridad
- ✅ HTTPS habilitado
- ✅ Credenciales protegidas
- ✅ Webhooks validados
- ✅ Rate limiting activo

### CA-04: Performance
- ✅ Tiempo de respuesta API < 500ms
- ✅ Webhook processing < 2s
- ✅ 99.9% uptime

---

## 📚 DOCUMENTACIÓN ADICIONAL

### Recursos para el Desarrollador:
1. API Reference: `/docs/api.md`
2. Database Schema: `/docs/schema.sql`
3. Environment Setup: `/docs/setup.md`
4. Troubleshooting: `/docs/troubleshooting.md`

### Enlaces Útiles:
- MercadoPago Docs: https://www.mercadopago.com.co/developers
- PayPal Developer: https://developer.paypal.com
- ePayco API: https://docs.epayco.co
- PSE Integration: https://www.pse.com.co

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Setup (Semana 1)
- [ ] Crear cuentas en todas las pasarelas
- [ ] Obtener credenciales de prueba
- [ ] Configurar proyecto base
- [ ] Setup base de datos

### Fase 2: Backend (Semana 2-3)
- [ ] Implementar endpoints de MercadoPago
- [ ] Implementar endpoints de PSE
- [ ] Implementar endpoints de Nequi/Daviplata
- [ ] Implementar endpoints de PayPal
- [ ] Configurar webhooks

### Fase 3: Frontend (Semana 4)
- [ ] Diseñar componente principal
- [ ] Implementar cada método de pago
- [ ] Integrar con backend
- [ ] Agregar validaciones

### Fase 4: Testing (Semana 5)
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests E2E
- [ ] Testing manual completo

### Fase 5: Deploy (Semana 6)
- [ ] Deploy a staging
- [ ] QA final
- [ ] Obtener credenciales de producción
- [ ] Deploy a producción
- [ ] Monitoreo post-deploy

---

**Documento creado por:** TechStore Development Team  
**Última actualización:** Febrero 2026  
**Versión:** 1.0
