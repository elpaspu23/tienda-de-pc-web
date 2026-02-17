import React from 'react';
import { Package, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';


export default function OrderSummary({ cart, total }) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0;

    return (
        <div className="order-summary-card">
            <div className="summary-header">
                <div className="icon-circle">
                    <Package size={20} />
                </div>
                <h2>Resumen del Pedido</h2>
            </div>

            <div className="summary-items">
                {cart.map(item => (
                    <div key={item.id} className="summary-item-card">
                        <div className="item-emoji">
                            {/* Usar imagen si existe, sino emoji por defecto */}
                            {item.image && (item.image.includes('http') || item.image.startsWith('/')) ?
                                <img src={item.image} alt={item.name} /> :
                                <span style={{ fontSize: '2rem' }}>📦</span>
                            }
                        </div>
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <div className="item-meta">
                                <span>Cant: {item.quantity}</span>
                                <span className="item-price">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="summary-totals">
                <div className="total-row">
                    <span>Subtotal</span>
                    <span className="amount">${subtotal.toLocaleString('es-CO')}</span>
                </div>
                <div className="total-row">
                    <span>Envío</span>
                    <span className="amount free">Gratis</span>
                </div>

                <div className="total-divider"></div>

                <div className="total-row final">
                    <span>Total</span>
                    <span className="amount-final">${total.toLocaleString('es-CO')}</span>
                </div>
            </div>

            <div className="security-badges">
                <p>Compra protegida por:</p>
                <div className="badges-row">
                    <div className="badge-item" title="Garantía de seguridad">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="badge-item" title="Verificado">
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="badge-item" title="Encriptación SSL">
                        <Lock size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}
