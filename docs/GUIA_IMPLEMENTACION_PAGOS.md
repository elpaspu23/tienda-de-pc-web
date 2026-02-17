# GUÍA COMPLETA DE IMPLEMENTACIÓN - PASARELAS DE PAGO

## 📋 ÍNDICE
1. MercadoPago (Latinoamérica)
2. PSE (Colombia)
3. Nequi (Colombia)
4. Daviplata (Colombia)
5. PayPal (Internacional)

---

## 1️⃣ MERCADOPAGO

### Instalación
```bash
npm install @mercadopago/sdk-react
npm install mercadopago
```

### Backend (Node.js/Express)
```javascript
// server.js
const mercadopago = require('mercadopago');

// Configura tus credenciales
mercadopago.configure({
  access_token: 'TU_ACCESS_TOKEN_DE_MERCADOPAGO'
});

// Endpoint para crear preferencia de pago
app.post('/create_preference', async (req, res) => {
  const { items, payer } = req.body;

  let preference = {
    items: items,
    payer: {
      name: payer.name,
      email: payer.email,
      phone: {
        area_code: payer.area_code,
        number: payer.phone
      },
      address: {
        zip_code: payer.zip_code,
        street_name: payer.street_name
      }
    },
    back_urls: {
      success: 'https://tu-sitio.com/success',
      failure: 'https://tu-sitio.com/failure',
      pending: 'https://tu-sitio.com/pending'
    },
    auto_return: 'approved',
    notification_url: 'https://tu-sitio.com/webhooks/mercadopago'
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook para recibir notificaciones
app.post('/webhooks/mercadopago', async (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'payment') {
    const payment = await mercadopago.payment.findById(data.id);
    console.log('Estado del pago:', payment.body.status);
    // Actualizar tu base de datos
  }
  
  res.sendStatus(200);
});
```

### Frontend (React)
```javascript
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializar MercadoPago
initMercadoPago('TU_PUBLIC_KEY');

function CheckoutMercadoPago() {
  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    const items = [
      {
        title: 'iPad Pro 12.9"',
        quantity: 1,
        unit_price: 189999,
        currency_id: 'COP'
      }
    ];

    const response = await fetch('/create_preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        payer: {
          name: 'Juan Pérez',
          email: 'juan@email.com',
          phone: '3001234567'
        }
      })
    });

    const { id } = await response.json();
    setPreferenceId(id);
  };

  return (
    <div>
      {!preferenceId ? (
        <button onClick={createPreference}>Pagar con MercadoPago</button>
      ) : (
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
  );
}
```

### Credenciales necesarias
- **Public Key**: Para el frontend
- **Access Token**: Para el backend
- Obtenerlas en: https://www.mercadopago.com.co/developers/panel

---

## 2️⃣ PSE (PAGOS SEGUROS EN LÍNEA - COLOMBIA)

### Proveedor recomendado: ePayco o PayU

### Con ePayco:
```bash
npm install epayco-sdk-node
```

### Backend
```javascript
const epayco = require('epayco-sdk-node');

const epaycoClient = epayco({
  apiKey: 'TU_API_KEY',
  privateKey: 'TU_PRIVATE_KEY',
  lang: 'ES',
  test: true // false en producción
});

app.post('/pse/payment', async (req, res) => {
  const { bank, amount, invoice, description } = req.body;

  const pseData = {
    bank: bank, // Código del banco
    invoice: invoice,
    description: description,
    value: amount,
    tax: '0',
    tax_base: amount,
    currency: 'COP',
    type_person: '0', // 0 = Persona natural
    doc_type: 'CC',
    doc_number: req.body.doc_number,
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    country: 'CO',
    cell_phone: req.body.phone,
    url_response: 'https://tu-sitio.com/response',
    url_confirmation: 'https://tu-sitio.com/confirmation',
    method_confirmation: 'GET'
  };

  try {
    const payment = await epaycoClient.bank.create(pseData);
    res.json({ url: payment.data.urlbanco });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener lista de bancos PSE
app.get('/pse/banks', async (req, res) => {
  try {
    const banks = await epaycoClient.bank.pseBank();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Frontend
```javascript
function PSEPayment() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    const response = await fetch('/pse/banks');
    const data = await response.json();
    setBanks(data.data);
  };

  const handlePSEPayment = async () => {
    const response = await fetch('/pse/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bank: selectedBank,
        amount: '256994',
        invoice: `INV-${Date.now()}`,
        description: 'Compra en TechStore',
        doc_number: '1234567890',
        name: 'Juan',
        last_name: 'Pérez',
        email: 'juan@email.com',
        phone: '3001234567'
      })
    });

    const { url } = await response.json();
    window.location.href = url; // Redirige al banco
  };

  return (
    <div>
      <select onChange={(e) => setSelectedBank(e.target.value)}>
        <option value="">Selecciona tu banco</option>
        {banks.map(bank => (
          <option key={bank.bankCode} value={bank.bankCode}>
            {bank.bankName}
          </option>
        ))}
      </select>
      <button onClick={handlePSEPayment}>Pagar con PSE</button>
    </div>
  );
}
```

---

## 3️⃣ NEQUI (COLOMBIA)

### Integración mediante ePayco
```javascript
// Backend
app.post('/nequi/payment', async (req, res) => {
  const { phone, amount } = req.body;

  const nequiData = {
    token_card: phone, // Número de celular Nequi
    customer_id: phone,
    doc_type: 'CC',
    doc_number: req.body.doc_number,
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    bill: `BILL-${Date.now()}`,
    description: 'Compra TechStore',
    value: amount,
    tax: '0',
    tax_base: amount,
    currency: 'COP',
    dues: '1',
    ip: req.ip
  };

  try {
    const payment = await epaycoClient.charge.create(nequiData);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Frontend
```javascript
function NequiPayment() {
  const handleNequiPayment = async () => {
    const phone = prompt('Ingresa tu número Nequi:');
    
    const response = await fetch('/nequi/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phone,
        amount: '256994',
        doc_number: '1234567890',
        name: 'Juan',
        last_name: 'Pérez',
        email: 'juan@email.com'
      })
    });

    const result = await response.json();
    
    if (result.data.estado === 'Aceptada') {
      alert('¡Pago aprobado!');
    } else {
      alert('Pago rechazado: ' + result.data.respuesta);
    }
  };

  return (
    <button onClick={handleNequiPayment}>
      Pagar con Nequi
    </button>
  );
}
```

---

## 4️⃣ DAVIPLATA (COLOMBIA)

### Similar a Nequi, mediante ePayco o integración directa

```javascript
// La implementación es similar a Nequi
// Daviplata también funciona con número de celular
app.post('/daviplata/payment', async (req, res) => {
  // Implementación similar a Nequi
  // Consultar documentación específica de Daviplata API
});
```

---

## 5️⃣ PAYPAL

### Instalación
```bash
npm install @paypal/react-paypal-js
npm install @paypal/checkout-server-sdk
```

### Backend
```javascript
const paypal = require('@paypal/checkout-server-sdk');

// Configuración del entorno
const clientId = 'TU_CLIENT_ID';
const clientSecret = 'TU_CLIENT_SECRET';
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Crear orden
app.post('/paypal/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '256.99' // Convertir de COP a USD
      },
      description: 'Compra en TechStore'
    }]
  });

  try {
    const order = await client.execute(request);
    res.json({ orderID: order.result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Capturar pago
app.post('/paypal/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  try {
    const capture = await client.execute(request);
    res.json({ capture: capture.result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Frontend
```javascript
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function PayPalCheckout() {
  const createOrder = async () => {
    const response = await fetch('/paypal/create-order', {
      method: 'POST'
    });
    const { orderID } = await response.json();
    return orderID;
  };

  const onApprove = async (data) => {
    const response = await fetch('/paypal/capture-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID })
    });
    const details = await response.json();
    alert('Pago completado!');
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "TU_CLIENT_ID" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'vertical' }}
      />
    </PayPalScriptProvider>
  );
}
```

---

## 🔐 SEGURIDAD

### Mejores prácticas:
1. **NUNCA expongas tus claves privadas en el frontend**
2. Usa HTTPS en producción
3. Valida los webhooks con firmas
4. Guarda logs de todas las transacciones
5. Implementa rate limiting
6. Sanitiza todas las entradas del usuario

### Variables de entorno (.env)
```
# MercadoPago
MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxx
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxx

# ePayco
EPAYCO_PUBLIC_KEY=xxxxx
EPAYCO_PRIVATE_KEY=xxxxx

# PayPal
PAYPAL_CLIENT_ID=xxxxx
PAYPAL_CLIENT_SECRET=xxxxx
```

---

## 📊 MONITOREO Y WEBHOOKS

### Estructura de base de datos para transacciones
```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(255) UNIQUE,
  payment_method VARCHAR(50),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  status VARCHAR(50),
  gateway_transaction_id VARCHAR(255),
  user_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Manejo de webhooks
```javascript
app.post('/webhooks/:gateway', async (req, res) => {
  const { gateway } = req.params;
  
  // Verificar firma del webhook
  // Actualizar estado de la transacción
  // Enviar email de confirmación
  
  res.sendStatus(200);
});
```

---

## 🚀 PRÓXIMOS PASOS

1. Registrarte en cada plataforma
2. Obtener credenciales de prueba
3. Implementar en entorno de desarrollo
4. Hacer pruebas exhaustivas
5. Obtener credenciales de producción
6. Deploy a producción

## 📚 DOCUMENTACIÓN OFICIAL

- MercadoPago: https://www.mercadopago.com.co/developers
- ePayco: https://docs.epayco.co/
- PayPal: https://developer.paypal.com/
- PSE: https://www.pse.com.co/
