import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import MercadoPagoCardForm from '../components/payment/MercadoPagoCardForm';
import CountryCodeSelector from '../components/checkout/CountryCodeSelector';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutBenefits from '../components/checkout/CheckoutBenefits';
import '../index.css';

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
    // Validate Shipping Fields manually (needed for MercadoPago flow which bypasses form submit)
    const missing = [];
    if (!formData.name) missing.push('Nombre');
    if (!formData.email) missing.push('Email');
    if (!formData.phone) missing.push('Teléfono');
    if (!formData.address) missing.push('Dirección');
    if (!formData.city) missing.push('Ciudad');

    if (missing.length > 0) {
      alert(`Por favor completa los siguientes datos de envío: ${missing.join(', ')}`);
      return;
    }

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
          <p className="text-sm text-gray-500 mb-4">
            Hemos enviado la factura y confirmación a {formData.email}
          </p>

          <div style={{ marginTop: '24px' }}>
            <button
              onClick={() => alert(`Descargando factura ${invoiceNumber}.pdf... (Simulación)`)}
              className="download-invoice-btn"
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '15px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                background: 'rgba(0,229,160,0.1)',
                padding: '8px', borderRadius: '8px',
                color: '#00e5a0', display: 'flex'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </div>
              Descargar Factura PDF
            </button>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', textAlign: 'center' }}>
              Formato oficial DIAN
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-lg"
          >
            Volver al Inicio
          </Link>

          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] shadow-sm"
          >
            <span style={{ fontSize: '18px' }}>💬</span> Soporte
          </a>
        </div>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <p className="text-sm text-gray-400">
            ¿Te gustó tu experiencia? <a href="#" className="text-emerald-500 font-bold hover:underline">Califícanos</a>
          </p>
        </div>
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
    <div className="min-h-screen bg-gray-50">
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
                <div style={{ marginTop: '24px' }}>
                  <MercadoPagoCardForm
                    amount={total}
                    onSubmit={(cardData) => processOrder(cardData)}
                  />
                </div>
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
        <div className="checkout-column-right" style={{ position: 'sticky', top: '24px', height: 'fit-content' }}>
          <OrderSummary cart={cart} total={total} />
          <CheckoutBenefits />
        </div>

      </div>
    </div>
  );
}
