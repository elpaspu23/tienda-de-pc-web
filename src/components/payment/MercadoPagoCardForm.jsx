import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

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

    // Formatear número de tarjeta (4 en 4)
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Formatear fecha (MM/AA)
    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiry(value);
        } else if (name === 'cardName') {
            formattedValue = value.toUpperCase();
        } else if (name === 'cvv' || name === 'docNumber') {
            formattedValue = value.replace(/\D/g, '');
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simular proceso de tokenización y pago
        setTimeout(() => {
            setIsProcessing(false);
            onSubmit(formData);
        }, 2000);
    };

    return (
        <div className="mp-card-form-container">
            <h3 className="mp-form-title">Pago con Tarjeta de Crédito/Débito</h3>

            <form onSubmit={handleSubmit} className="mp-card-form">
                {/* Número de tarjeta */}
                <div className="mp-form-group full-width">
                    <label>Número de tarjeta</label>
                    <div className="input-with-icon">
                        <CreditCard className="input-icon" size={20} />
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className="mp-input monospace"
                            required
                        />
                        <div className="card-logos">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                        </div>
                    </div>
                </div>

                {/* Nombre */}
                <div className="mp-form-group full-width">
                    <label>Nombre en la tarjeta</label>
                    <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="COMO APARECE EN LA TARJETA"
                        className="mp-input uppercase"
                        required
                    />
                </div>

                {/* Fecha y CVV */}
                <div className="mp-form-row">
                    <div className="mp-form-group">
                        <label>Vencimiento</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            maxLength="5"
                            className="mp-input center-text"
                            required
                        />
                    </div>
                    <div className="mp-form-group">
                        <label>CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength="4"
                            className="mp-input center-text"
                            required
                        />
                    </div>
                </div>

                {/* Documento */}
                <div className="mp-form-row">
                    <div className="mp-form-group small">
                        <label>Tipo</label>
                        <select
                            name="docType"
                            value={formData.docType}
                            onChange={handleChange}
                            className="mp-input"
                        >
                            <option value="CC">CC</option>
                            <option value="CE">CE</option>
                            <option value="NIT">NIT</option>
                        </select>
                    </div>
                    <div className="mp-form-group">
                        <label>Número de documento</label>
                        <input
                            type="text"
                            name="docNumber"
                            value={formData.docNumber}
                            onChange={handleChange}
                            placeholder="1234567890"
                            className="mp-input"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mp-form-group full-width">
                    <label>Email para factura</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="mp-input"
                        required
                    />
                </div>

                {/* Botón */}
                <button type="submit" className="mp-pay-button" disabled={isProcessing}>
                    {isProcessing ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        `Pagar $${amount.toLocaleString('es-CO')}`
                    )}
                </button>

                {/* Security Badges */}
                <div className="mp-security">
                    <div className="badge">🔒 Pago 100% Seguro</div>
                    <div className="badge-sub">Procesado por MercadoPago • Encriptación SSL</div>
                </div>
            </form>
        </div>
    );
}
