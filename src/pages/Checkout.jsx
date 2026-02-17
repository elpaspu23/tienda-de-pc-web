import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import MercadoPagoCardForm from '../components/payment/MercadoPagoCardForm';
import CountryCodeSelector from '../components/checkout/CountryCodeSelector';
import OrderSummary from '../components/checkout/OrderSummary';
import '../checkout-enhanced.css';
import '../payment.css';

export default function Checkout() {
  const { cart, cartTotal: total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const [countryCode, setCountryCode] = useState('+57');
  const [paymentExtra, setPaymentExtra] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Colombia',
    paymentMethod: 'mercadopago'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const processOrder = async (extraPaymentData = null) => {
    setIsProcessing(true);

    // Simulate API call
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId); // Save order ID

    console.log('Procesando orden:', {
      ...formData,
      phone: `${countryCode} ${formData.phone}`,
      paymentDetails: extraPaymentData || paymentExtra
    });

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate invoice generation
    const generatedInvoiceNumber = `INV-${newOrderId}-001`;
    setInvoiceNumber(generatedInvoiceNumber);

    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (formData.paymentMethod === 'mercadopago') {
      // If payment is card, it's handled by the card form's onSubmit
      // We only validate here
      console.log('Esperando datos de tarjeta...');
      return;
    }
    processOrder();
  };

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="success-message"
        style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">¡Pedido Confirmado!</h2>
        <p className="text-xl mb-6">Gracias por tu compra, <strong>{formData.name}</strong></p>

        <div className="bg-gray-50 p-6 rounded-xl mb-6 text-left border border-gray-100">
          <p className="mb-2"><strong>Número de orden:</strong> {orderId}</p>
          <p className="mb-2">
            📄 <strong>Factura generada:</strong> {invoiceNumber}
          </p>
          <p className="text-sm text-gray-500">
            Hemos enviado la factura y confirmación a {formData.email}
          </p>
        </div>

        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
        >
          Volver al Inicio
        </Link>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-checkout text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link to="/" className="text-emerald-600 font-semibold hover:underline">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="checkout-layout">

        {/* Left Column: Forms */}
        <div className="checkout-column-left">
          <div className="checkout-header mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
            <p className="text-gray-600">Completa tu pedido de forma rápida y segura</p>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit}>

            {/* Shipping Section */}
            <section className="checkout-section">
              <div className="section-header">
                <div className="header-icon">
                  <MapPin size={24} />
                </div>
                <h2>Información de Envío</h2>
              </div>

              <div className="form-grid">
                <div className="form-group full">
                  <label className="form-label">Nombre completo</label>
                  <div className="form-input-wrapper">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className="form-group full">
                  <label className="form-label">Correo electrónico</label>
                  <div className="form-input-wrapper">
                    <Mail className="input-icon" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className="form-group full">
                  <label className="form-label">Teléfono</label>
                  <div className="phone-input-group">
                    <CountryCodeSelector value={countryCode} onChange={setCountryCode} />
                    <div className="form-input-wrapper flex-1">
                      <Phone className="input-icon" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Formato: {countryCode} {formData.phone}</span>
                </div>

                <div className="form-group full">
                  <label className="form-label">Dirección</label>
                  <div className="form-input-wrapper">
                    <MapPin className="input-icon" size={20} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-input"
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-input no-icon"
                      placeholder="Bogotá"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Código Postal</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="form-input no-icon"
                      placeholder="110111"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="checkout-section mt-8">
              <div className="section-header">
                <div className="header-icon">
                  <CreditCard size={24} />
                </div>
                <h2>Método de Pago</h2>
              </div>

              <PaymentMethodSelector
                selected={formData.paymentMethod}
                onSelect={(method) => setFormData({ ...formData, paymentMethod: method })}
                extraData={paymentExtra}
                onExtraDataChange={setPaymentExtra}
              />

              {/* Show Inline Card Form ONLY if MercadoPago is selected */}
              {formData.paymentMethod === 'mercadopago' && (
                <MercadoPagoCardForm
                  amount={total}
                  onSubmit={(cardData) => processOrder(cardData)}
                />
              )}

            </section>

            {/* Show standard submit button ONLY if NOT MercadoPago (card form has its own button) */}
            {formData.paymentMethod !== 'mercadopago' && (
              <button
                type="submit"
                className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : `Pagar $${total.toLocaleString('es-CO')}`}
              </button>
            )}

          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-column-right">
          <OrderSummary cart={cart} total={total} />
        </div>

      </div>
    </div>
  );
}
