import { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PAYMENT_METHODS = [
    {
        id: 'mercadopago',
        name: 'MercadoPago',
        description: 'Tarjetas de crédito y débito',
        icon: CreditCard,
        badge: 'Más usado',
        badgeColor: 'blue',
        cards: ['Visa', 'Mastercard', 'American Express']
    },
    {
        id: 'pse',
        name: 'PSE',
        description: 'Pago desde tu cuenta bancaria',
        icon: Building2,
        badge: 'Inmediato',
        badgeColor: 'green',
        banks: ['Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá', 'Nequi', 'Scotiabank']
    },
    {
        id: 'nequi',
        name: 'Nequi',
        description: 'Paga con tu app Nequi',
        icon: Smartphone,
        badge: 'Rápido',
        badgeColor: 'purple',
        requiresPhone: true
    },
    {
        id: 'daviplata',
        name: 'Daviplata',
        description: 'Paga con Daviplata',
        icon: Wallet,
        badgeColor: 'red',
        requiresPhone: true
    },
    {
        id: 'paypal',
        name: 'PayPal',
        description: 'Pago internacional seguro',
        icon: CreditCard,
        badge: 'Internacional',
        badgeColor: 'yellow'
    }
];

export default function PaymentMethodSelector({ selected, onSelect, extraData, onExtraDataChange }) {
    return (
        <div className="pms-container">
            {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isSelected = selected === method.id;

                return (
                    <div key={method.id}>
                        <motion.button
                            type="button"
                            className={`pms-card ${isSelected ? 'pms-card--selected' : ''}`}
                            onClick={() => onSelect(method.id)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="pms-card-left">
                                <div className={`pms-icon pms-icon--${method.badgeColor}`}>
                                    <Icon size={22} />
                                </div>
                                <div className="pms-info">
                                    <div className="pms-name-row">
                                        <span className="pms-name">{method.name}</span>
                                        {method.badge && (
                                            <span className={`pms-badge pms-badge--${method.badgeColor}`}>
                                                {method.badge}
                                            </span>
                                        )}
                                    </div>
                                    <span className="pms-description">{method.description}</span>
                                    {method.cards && (
                                        <div className="pms-cards">
                                            {method.cards.map(card => (
                                                <span key={card} className="pms-card-tag">{card}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="pms-card-right">
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="pms-check"
                                    >
                                        <CheckCircle2 size={24} />
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>

                        {/* Expanded content */}
                        <AnimatePresence>
                            {isSelected && method.banks && (
                                <motion.div
                                    className="pms-expanded"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="pms-expanded-inner">
                                        <p className="pms-expanded-label">Selecciona tu banco:</p>
                                        <div className="pms-banks-grid">
                                            {method.banks.map(bank => (
                                                <button
                                                    key={bank}
                                                    type="button"
                                                    className={`pms-bank-btn ${extraData?.bank === bank ? 'pms-bank-btn--selected' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onExtraDataChange({ ...extraData, bank });
                                                    }}
                                                >
                                                    <Building2 size={14} />
                                                    {bank}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {isSelected && method.requiresPhone && (
                                <motion.div
                                    className="pms-expanded"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="pms-expanded-inner">
                                        <p className="pms-expanded-label">
                                            Ingresa tu número de {method.name}:
                                        </p>
                                        <div className="pms-phone-input-wrap">
                                            <span className="pms-phone-prefix">+57</span>
                                            <input
                                                type="tel"
                                                className="pms-phone-input"
                                                placeholder="300 123 4567"
                                                maxLength={12}
                                                value={extraData?.phone || ''}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    onExtraDataChange({ ...extraData, phone: e.target.value });
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
