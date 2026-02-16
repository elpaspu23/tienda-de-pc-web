import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, Shield, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createOrder } from '../api/service';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'mercadopago',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate order ID
    const newOrderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    setOrderId(newOrderId);

    // Prepare order data
    const orderData = {
      orderId: newOrderId,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode
      },
      paymentMethod: formData.paymentMethod,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: cartTotal,
      shipping: shippingCost,
      total: total
    };

    // Save to JSON Server
    try {
      await createOrder(orderData);
      console.log('Order saved to API:', orderData);
    } catch (error) {
      console.log('Order saved locally (API not running)');
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para continuar</p>
        <Link to="/products" className="btn-primary">Ver Productos</Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <motion.div
        className="order-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="success-icon">✓</div>
        <h2>¡Pedido Confirmado! 🎉</h2>
        <p className="order-id">Número de orden: <strong>{orderId}</strong></p>
        <p>Te hemos enviado un email de confirmación a <strong>{formData.email}</strong></p>
        <p>Recibirás tu pedido en 24-48 horas hábiles.</p>
        <Link to="/" className="btn-primary">Volver al Inicio</Link>
      </motion.div>
    );
  }

  const shippingCost = cartTotal > 50000 ? 0 : 2999;
  const total = cartTotal + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>💳 Finalizar Compra</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Customer Info */}
          <section className="form-section">
            <h2><Truck size={20} /> Información de Envío</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="juan@email.com"
                />
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+54 11 1234 5678"
                />
              </div>
              <div className="form-group full">
                <label>Dirección *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Calle 123, Departamento 4B"
                />
              </div>
              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Buenos Aires"
                />
              </div>
              <div className="form-group">
                <label>Código Postal *</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  placeholder="C1428"
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="form-section">
            <h2><CreditCard size={20} /> Método de Pago</h2>
            
            <div className="payment-methods">
              <label className={`payment-option ${formData.paymentMethod === 'mercadopago' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mercadopago"
                  checked={formData.paymentMethod === 'mercadopago'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                />
                <span className="payment-icon">💳</span>
                <div>
                  <strong>MercadoPago</strong>
                  <p>Pagá con QR, tarjeta o saldo</p>
                </div>
              </label>
              
              <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                />
                <span className="payment-icon">💰</span>
                <div>
                  <strong>Tarjeta de Crédito/Débito</strong>
                  <p>Visa, Mastercard, American Express</p>
                </div>
              </label>

              <label className={`payment-option ${formData.paymentMethod === 'transfer' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={formData.paymentMethod === 'transfer'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                />
                <span name="payment-icon">🏦</span>
                <div>
                  <strong>Transferencia Bancaria</strong>
                  <p>5% de descuento adicional</p>
                </div>
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="card-form">
                <div className="form-group full">
                  <label>Número de tarjeta</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                <div className="form-group">
                  <label>Vencimiento</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
              </div>
            )}

            {formData.paymentMethod === 'transfer' && (
              <div className="transfer-info">
                <p><strong>Banco:</strong> Banco Santander</p>
                <p><strong>CBU:</strong> 0000000000000000000000</p>
                <p><strong>Alias:</strong> techstore.mp</p>
                <p className="discount">🎉 ¡5% de descuento aplicado!</p>
              </div>
            )}
          </section>

          <button
            type="submit"
            className="btn-checkout-submit"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="spinner" size={20} />
                Procesando pago...
              </>
            ) : (
              <>Pagar {formatPrice(total)}</>
            )}
          </button>

          <div className="security-badges">
            <Shield size={16} />
            <span>Pago 100% seguro</span>
          </div>
        </form>

        {/* Order Summary */}
        <aside className="order-summary">
          <h3>Resumen del Pedido</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Cantidad: {item.quantity}</p>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}</span>
            </div>
            {shippingCost > 0 && (
              <p className="free-shipping-hint">
                ¡Agregá {formatPrice(50000 - cartTotal)} más para envío gratis!
              </p>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
