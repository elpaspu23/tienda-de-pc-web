import React from 'react';
import { Package, ShieldCheck, CheckCircle2, Lock, Truck } from 'lucide-react';

export default function OrderSummary({ cart, total }) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
                .os-card { font-family: 'DM Sans', system-ui, sans-serif; }
                .os-item-card:hover { border-color: rgba(0,229,160,0.25) !important; transform: translateX(3px); }
                .os-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,229,160,0.35) !important; }
                .os-badge-icon:hover { background: rgba(0,229,160,0.18) !important; transform: scale(1.08); }
            `}</style>

            <div className="os-card" style={{
                background: 'linear-gradient(160deg, #0d1117 0%, #0a0f1a 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px 24px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '38px', height: '38px', borderRadius: '12px',
                            background: 'rgba(0,229,160,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#00e5a0',
                        }}>
                            <Package size={18} />
                        </div>
                        <h2 style={{
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontSize: '17px', fontWeight: 700, color: '#fff',
                            margin: 0, letterSpacing: '-0.3px',
                        }}>
                            Resumen del Pedido
                        </h2>
                    </div>
                    <span style={{
                        background: 'rgba(0,229,160,0.12)',
                        color: '#00e5a0', fontSize: '12px', fontWeight: 600,
                        padding: '3px 10px', borderRadius: '20px',
                    }}>
                        {cart.reduce((s, i) => s + i.quantity, 0)} items
                    </span>
                </div>

                {/* Items */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="os-item-card"
                            style={{
                                display: 'flex', gap: '12px', alignItems: 'center',
                                padding: '12px', borderRadius: '14px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                transition: 'all 0.2s',
                                cursor: 'default',
                            }}
                        >
                            {/* Image */}
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '10px',
                                overflow: 'hidden', flexShrink: 0,
                                background: 'rgba(255,255,255,0.06)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {item.image && (item.image.includes('http') || item.image.startsWith('/')) ? (
                                    <img src={item.image} alt={item.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '1.6rem' }}>📦</span>
                                )}
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                                    fontSize: '13px', fontWeight: 700, color: '#fff',
                                    margin: '0 0 5px',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>
                                    {item.name}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{
                                        fontSize: '11px', color: 'rgba(255,255,255,0.35)',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '2px 7px', borderRadius: '6px',
                                    }}>
                                        ×{item.quantity}
                                    </span>
                                    <span style={{
                                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                                        fontSize: '14px', fontWeight: 800, color: '#00e5a0',
                                    }}>
                                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '16px', padding: '14px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Subtotal</span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                                ${subtotal.toLocaleString('es-CO')}
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Truck size={13} style={{ color: '#00e5a0' }} /> Envío
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#00e5a0' }}>Gratis</span>
                        </div>

                        {/* Divider */}
                        <div style={{
                            height: '1px', background: 'rgba(255,255,255,0.07)',
                            margin: '10px 0',
                        }} />

                        {/* Total final */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                            <span style={{
                                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                                fontSize: '15px', fontWeight: 700, color: '#fff',
                            }}>
                                Total
                            </span>
                            <span style={{
                                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                                fontSize: '26px', fontWeight: 800, color: '#00e5a0',
                                letterSpacing: '-1px',
                            }}>
                                ${total.toLocaleString('es-CO')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Security badges */}
                <div style={{
                    padding: '0 16px 20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                }}>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
                        Compra protegida por:
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                            { icon: ShieldCheck, label: 'Garantía' },
                            { icon: CheckCircle2, label: 'Verificado' },
                            { icon: Lock, label: 'SSL' },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="os-badge-icon"
                                title={label}
                                style={{
                                    width: '38px', height: '38px', borderRadius: '10px',
                                    background: 'rgba(0,229,160,0.08)',
                                    border: '1px solid rgba(0,229,160,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#00e5a0', cursor: 'default',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <Icon size={17} />
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)', margin: 0 }}>
                        Encriptación SSL · Datos 100% seguros
                    </p>
                </div>
            </div>
        </>
    );
}
