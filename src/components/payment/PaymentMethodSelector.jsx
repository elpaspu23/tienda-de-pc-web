import { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PAYMENT_METHODS = [
    {
        id: 'mercadopago',
        name: 'MercadoPago',
        description: 'Tarjetas de crédito y débito',
        icon: CreditCard,
        badge: 'Más usado',
        accent: '#00e5a0',
        accentBg: 'rgba(0,229,160,0.1)',
        cards: ['Visa', 'Mastercard', 'Amex']
    },
    {
        id: 'pse',
        name: 'PSE',
        description: 'Débito desde tu cuenta bancaria',
        icon: Building2,
        badge: 'Inmediato',
        accent: '#00b4d8',
        accentBg: 'rgba(0,180,216,0.1)',
        banks: ['Bancolombia', 'Davivienda', 'BBVA', 'Banco de Bogotá', 'Nequi', 'Scotiabank']
    },
    {
        id: 'nequi',
        name: 'Nequi',
        description: 'Paga con tu app Nequi',
        icon: Smartphone,
        badge: 'Rápido',
        accent: '#a855f7',
        accentBg: 'rgba(168,85,247,0.1)',
        requiresPhone: true
    },
    {
        id: 'daviplata',
        name: 'Daviplata',
        description: 'Paga con Daviplata',
        icon: Wallet,
        accent: '#f43f5e',
        accentBg: 'rgba(244,63,94,0.1)',
        requiresPhone: true
    },
    {
        id: 'paypal',
        name: 'PayPal',
        description: 'Pago internacional seguro',
        icon: CreditCard,
        badge: 'Internacional',
        accent: '#f59e0b',
        accentBg: 'rgba(245,158,11,0.1)',
    }
];

export default function PaymentMethodSelector({ selected, onSelect, extraData, onExtraDataChange }) {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
                .pms-bank:hover { background: rgba(0,180,216,0.12) !important; border-color: rgba(0,180,216,0.3) !important; color: #00b4d8 !important; }
                .pms-bank.sel { background: rgba(0,180,216,0.15) !important; border-color: #00b4d8 !important; color: #00b4d8 !important; }
                .pms-phone-in:focus { border-color: rgba(0,229,160,0.4) !important; box-shadow: 0 0 0 3px rgba(0,229,160,0.08) !important; background: rgba(0,229,160,0.05) !important; }
                .pms-card-btn:hover:not(.selected-card) { border-color: rgba(255,255,255,0.15) !important; background: rgba(255,255,255,0.04) !important; }
            `}</style>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selected === method.id;

                    return (
                        <div key={method.id} style={{ borderRadius: '16px', overflow: 'hidden' }}>
                            {/* Method button */}
                            <motion.button
                                type="button"
                                className={`pms-card-btn ${isSelected ? 'selected-card' : ''}`}
                                onClick={() => onSelect(method.id)}
                                whileTap={{ scale: 0.99 }}
                                style={{
                                    width: '100%', display: 'flex',
                                    alignItems: 'center', justifyContent: 'space-between',
                                    padding: '16px',
                                    background: isSelected
                                        ? `linear-gradient(135deg, ${method.accentBg}, rgba(255,255,255,0.02))`
                                        : 'rgba(255,255,255,0.03)',
                                    border: `1.5px solid ${isSelected ? method.accent : 'rgba(255,255,255,0.07)'}`,
                                    borderRadius: '16px',
                                    cursor: 'pointer', transition: 'all 0.22s',
                                    textAlign: 'left',
                                    boxShadow: isSelected ? `0 4px 20px ${method.accentBg}` : 'none',
                                }}
                            >
                                {/* Left */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '12px',
                                        background: isSelected ? method.accentBg : 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${isSelected ? method.accent + '40' : 'rgba(255,255,255,0.08)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: isSelected ? method.accent : 'rgba(255,255,255,0.4)',
                                        transition: 'all 0.22s', flexShrink: 0,
                                    }}>
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                            <span style={{
                                                fontFamily: "'Syne', system-ui, sans-serif",
                                                fontSize: '15px', fontWeight: 700,
                                                color: isSelected ? '#fff' : 'rgba(255,255,255,0.8)',
                                            }}>
                                                {method.name}
                                            </span>
                                            {method.badge && (
                                                <span style={{
                                                    fontSize: '10px', fontWeight: 700,
                                                    color: method.accent,
                                                    background: method.accentBg,
                                                    padding: '2px 8px', borderRadius: '20px',
                                                    letterSpacing: '0.3px',
                                                    border: `1px solid ${method.accent}30`,
                                                }}>
                                                    {method.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p style={{
                                            fontSize: '12px',
                                            color: isSelected ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.3)',
                                            margin: 0,
                                        }}>
                                            {method.description}
                                        </p>
                                        {method.cards && (
                                            <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                                                {method.cards.map(card => (
                                                    <span key={card} style={{
                                                        fontSize: '10px', fontWeight: 600,
                                                        color: 'rgba(255,255,255,0.3)',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        padding: '2px 6px', borderRadius: '5px',
                                                        border: '1px solid rgba(255,255,255,0.07)',
                                                    }}>
                                                        {card}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Check */}
                                <div style={{ flexShrink: 0 }}>
                                    {isSelected ? (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            style={{ color: method.accent }}
                                        >
                                            <CheckCircle2 size={22} />
                                        </motion.div>
                                    ) : (
                                        <div style={{
                                            width: '22px', height: '22px', borderRadius: '50%',
                                            border: '2px solid rgba(255,255,255,0.12)',
                                        }} />
                                    )}
                                </div>
                            </motion.button>

                            {/* Expanded: Banks (PSE) */}
                            <AnimatePresence>
                                {isSelected && method.banks && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        style={{
                                            overflow: 'hidden',
                                            background: 'rgba(0,180,216,0.04)',
                                            border: `1.5px solid ${method.accent}`,
                                            borderTop: 'none', borderRadius: '0 0 16px 16px',
                                        }}
                                    >
                                        <div style={{ padding: '16px' }}>
                                            <p style={{
                                                fontSize: '12px', fontWeight: 600,
                                                color: 'rgba(255,255,255,0.35)',
                                                margin: '0 0 10px',
                                                letterSpacing: '0.5px', textTransform: 'uppercase',
                                            }}>
                                                Selecciona tu banco:
                                            </p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                {method.banks.map(bank => (
                                                    <button
                                                        key={bank}
                                                        type="button"
                                                        className={`pms-bank ${extraData?.bank === bank ? 'sel' : ''}`}
                                                        onClick={e => { e.stopPropagation(); onExtraDataChange({ ...extraData, bank }); }}
                                                        style={{
                                                            padding: '8px 12px',
                                                            background: 'rgba(255,255,255,0.03)',
                                                            border: '1.5px solid rgba(255,255,255,0.08)',
                                                            borderRadius: '10px',
                                                            color: 'rgba(255,255,255,0.5)',
                                                            fontSize: '12px', fontWeight: 500,
                                                            cursor: 'pointer', transition: 'all 0.15s',
                                                            display: 'flex', alignItems: 'center', gap: '6px',
                                                            fontFamily: "'DM Sans', system-ui, sans-serif",
                                                        }}
                                                    >
                                                        <Building2 size={12} />
                                                        {bank}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Expanded: Phone (Nequi / Daviplata) */}
                                {isSelected && method.requiresPhone && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        style={{
                                            overflow: 'hidden',
                                            background: `${method.accentBg}`,
                                            border: `1.5px solid ${method.accent}`,
                                            borderTop: 'none', borderRadius: '0 0 16px 16px',
                                        }}
                                    >
                                        <div style={{ padding: '16px' }}>
                                            <p style={{
                                                fontSize: '12px', fontWeight: 600,
                                                color: 'rgba(255,255,255,0.35)',
                                                margin: '0 0 10px',
                                                letterSpacing: '0.5px', textTransform: 'uppercase',
                                            }}>
                                                Número de {method.name}:
                                            </p>
                                            <div style={{ display: 'flex', gap: '0', borderRadius: '12px', overflow: 'hidden' }}>
                                                <span style={{
                                                    padding: '11px 14px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1.5px solid rgba(255,255,255,0.1)',
                                                    borderRight: 'none',
                                                    color: 'rgba(255,255,255,0.4)',
                                                    fontSize: '13px', fontWeight: 600,
                                                    display: 'flex', alignItems: 'center',
                                                    borderRadius: '12px 0 0 12px',
                                                }}>
                                                    +57
                                                </span>
                                                <input
                                                    type="tel"
                                                    className="pms-phone-in"
                                                    placeholder="300 123 4567"
                                                    maxLength={12}
                                                    value={extraData?.phone || ''}
                                                    onChange={e => { e.stopPropagation(); onExtraDataChange({ ...extraData, phone: e.target.value }); }}
                                                    onClick={e => e.stopPropagation()}
                                                    style={{
                                                        flex: 1, padding: '11px 14px',
                                                        background: 'rgba(255,255,255,0.04)',
                                                        border: '1.5px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '0 12px 12px 0',
                                                        color: '#fff', fontSize: '14px',
                                                        outline: 'none', transition: 'all 0.2s',
                                                        fontFamily: 'monospace',
                                                    }}
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
        </>
    );
}
