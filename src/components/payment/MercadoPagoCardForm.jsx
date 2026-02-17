import React, { useState } from 'react';
import { CreditCard, Lock, User, Calendar, Shield } from 'lucide-react';

export default function MercadoPagoCardForm({ amount, onSubmit }) {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        docType: 'CC',
        docNumber: '',
        email: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const parts = [];
        for (let i = 0; i < v.length && i < 16; i += 4) parts.push(v.substring(i, i + 4));
        return parts.join(' ');
    };

    const formatExpiry = (value) => {
        const v = value.replace(/\D/g, '');
        if (v.length >= 2) return v.substring(0, 2) + '/' + v.substring(2, 4);
        return v;
    };

    const detectCardType = (num) => {
        const n = num.replace(/\s/g, '');
        if (n.startsWith('4')) return 'visa';
        if (/^5[1-5]/.test(n)) return 'mastercard';
        if (/^3[47]/.test(n)) return 'amex';
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let v = value;
        if (name === 'cardNumber') v = formatCardNumber(value);
        else if (name === 'expiryDate') v = formatExpiry(value);
        else if (name === 'cardName') v = value.toUpperCase();
        else if (name === 'cvv' || name === 'docNumber') v = value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, [name]: v }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => { setIsProcessing(false); onSubmit(formData); }, 2000);
    };

    const cardType = detectCardType(formData.cardNumber);

    const inputStyle = (name) => ({
        width: '100%', padding: '12px 14px 12px 40px',
        background: focusedField === name ? 'rgba(0,229,160,0.06)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${focusedField === name ? '#00e5a0' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '12px', color: '#fff',
        fontSize: '14px', fontWeight: 500, outline: 'none',
        transition: 'all 0.2s',
        fontFamily: name === 'cardNumber' || name === 'cvv' || name === 'expiryDate'
            ? 'monospace' : "'DM Sans', system-ui, sans-serif",
        letterSpacing: name === 'cardNumber' ? '2px' : 'normal',
        boxShadow: focusedField === name ? '0 0 0 3px rgba(0,229,160,0.1)' : 'none',
    });

    const iconStyle = {
        position: 'absolute', left: '12px', top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
    };

    const labelStyle = {
        display: 'block', fontSize: '12px', fontWeight: 600,
        color: 'rgba(255,255,255,0.45)', marginBottom: '8px',
        letterSpacing: '0.5px', textTransform: 'uppercase',
        fontFamily: "'DM Sans', system-ui, sans-serif",
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
                .mp-select option { background: #0d1117; color: #fff; }
                .mp-pay-btn:hover:not(:disabled) { transform: translateY(-2px) !important; box-shadow: 0 14px 40px rgba(0,229,160,0.4) !important; }
                .mp-pay-btn:active:not(:disabled) { transform: translateY(0) !important; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .mp-spinner { display: inline-block; width: 18px; height: 18px; border: 2px solid rgba(10,15,26,0.3); border-top-color: #0a0f1a; border-radius: 50%; animation: spin 0.7s linear infinite; }
            `}</style>

            <div style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
                {/* Card preview mini */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0,229,160,0.12), rgba(0,180,216,0.08))',
                    border: '1px solid rgba(0,229,160,0.15)',
                    borderRadius: '16px', padding: '18px 20px',
                    marginBottom: '24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: '0 0 4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            Número de tarjeta
                        </p>
                        <p style={{
                            fontFamily: 'monospace', fontSize: '16px', fontWeight: 600,
                            color: formData.cardNumber ? '#fff' : 'rgba(255,255,255,0.2)',
                            letterSpacing: '3px', margin: 0,
                        }}>
                            {formData.cardNumber || '•••• •••• •••• ••••'}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {cardType === 'visa' && (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                                alt="Visa" style={{ height: '24px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                        )}
                        {cardType === 'mastercard' && (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                alt="Mastercard" style={{ height: '30px' }} />
                        )}
                        {!cardType && (
                            <div style={{
                                width: '44px', height: '28px', borderRadius: '6px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'rgba(255,255,255,0.2)',
                            }}>
                                <CreditCard size={14} />
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Número de tarjeta */}
                    <div>
                        <label style={labelStyle}>Número de tarjeta</label>
                        <div style={{ position: 'relative' }}>
                            <CreditCard size={15} style={iconStyle} />
                            <input
                                type="text" name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('cardNumber')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                style={inputStyle('cardNumber')}
                                required
                            />
                        </div>
                    </div>

                    {/* Nombre */}
                    <div>
                        <label style={labelStyle}>Nombre en la tarjeta</label>
                        <div style={{ position: 'relative' }}>
                            <User size={15} style={iconStyle} />
                            <input
                                type="text" name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('cardName')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="COMO APARECE EN LA TARJETA"
                                style={{ ...inputStyle('cardName'), letterSpacing: '1px' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Vencimiento + CVV */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={labelStyle}>Vencimiento</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={15} style={iconStyle} />
                                <input
                                    type="text" name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('expiryDate')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="MM/AA"
                                    maxLength="5"
                                    style={{ ...inputStyle('expiryDate'), textAlign: 'center' }}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>CVV</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={15} style={iconStyle} />
                                <input
                                    type="password" name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('cvv')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="•••"
                                    maxLength="4"
                                    style={{ ...inputStyle('cvv'), textAlign: 'center' }}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Documento */}
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px' }}>
                        <div>
                            <label style={labelStyle}>Tipo</label>
                            <select
                                name="docType" value={formData.docType}
                                onChange={handleChange}
                                className="mp-select"
                                style={{
                                    width: '100%', padding: '12px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1.5px solid rgba(255,255,255,0.08)',
                                    borderRadius: '12px', color: '#fff',
                                    fontSize: '14px', fontWeight: 500, outline: 'none',
                                    cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif",
                                }}
                            >
                                <option value="CC">CC</option>
                                <option value="CE">CE</option>
                                <option value="NIT">NIT</option>
                                <option value="PP">Pasaporte</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Número de documento</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text" name="docNumber"
                                    value={formData.docNumber}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('docNumber')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="1234567890"
                                    style={{ ...inputStyle('docNumber'), paddingLeft: '14px' }}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label style={labelStyle}>Email para factura</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ ...iconStyle, fontSize: '14px' }}>@</span>
                            <input
                                type="email" name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="tu@email.com"
                                style={inputStyle('email')}
                                required
                            />
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="mp-pay-btn"
                        disabled={isProcessing}
                        style={{
                            width: '100%', padding: '15px',
                            marginTop: '4px',
                            background: isProcessing
                                ? 'rgba(0,229,160,0.4)'
                                : 'linear-gradient(135deg, #00e5a0, #00c070)',
                            border: 'none', borderRadius: '14px',
                            color: '#0a0f1a', fontWeight: 700, fontSize: '15px',
                            fontFamily: "'Syne', system-ui, sans-serif",
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            boxShadow: '0 8px 24px rgba(0,229,160,0.25)',
                            transition: 'all 0.2s', letterSpacing: '0.3px',
                        }}
                    >
                        {isProcessing ? (
                            <><span className="mp-spinner" /> Procesando pago...</>
                        ) : (
                            <><Shield size={16} /> Pagar ${amount.toLocaleString('es-CO')}</>
                        )}
                    </button>

                    {/* Security note */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                        padding: '12px',
                        background: 'rgba(0,229,160,0.04)',
                        border: '1px solid rgba(0,229,160,0.1)',
                        borderRadius: '12px',
                    }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                            🔒 Pago 100% Seguro
                        </p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
                            Procesado por MercadoPago · Encriptación SSL
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
