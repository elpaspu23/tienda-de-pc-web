import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import '../index.css';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page-empty">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="empty-state-content"
                >
                    <div className="empty-icon-container">
                        <ShoppingCart size={64} strokeWidth={1.5} />
                    </div>
                    <h2>Tu carrito de compras está vacío</h2>
                    <p>¿No sabes qué comprar? ¡Tenemos miles de productos para ti!</p>
                    <Link to="/products" className="btn-primary">
                        Explorar Productos
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="cart-page-amazon">
            <div className="cart-header-amazon">
                <h1>Carrito de compras</h1>
                <button className="deselect-all" onClick={clearCart}>
                    Vaciar carrito
                </button>
            </div>

            <div className="cart-layout-amazon">
                <div className="cart-items-amazon">
                    {cart.map(item => (
                        <motion.div
                            key={item.id}
                            className="cart-item-amazon"
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                        >
                            <button
                                className="item-delete-btn"
                                onClick={() => removeFromCart(item.id)}
                                title="Eliminar producto"
                            >
                                <Trash2 size={20} />
                            </button>

                            <div className="item-image-amazon">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="item-details-amazon">
                                <h3 className="item-name-amazon">{item.name}</h3>

                                <div className="item-badges-amazon">
                                    <span className="badge-prime">prime</span>
                                    <span className="badge-shipping">Devoluciones internacionales gratis</span>
                                </div>

                                <p className="item-stock-amazon">En stock</p>
                                <p className="item-gift-amazon">Es un regalo <a href="#">Más información</a></p>

                                <div className="item-actions-amazon">
                                    <div className="quantity-selector-amazon">
                                        <button
                                            className="qty-btn-amazon"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="qty-display-amazon">{item.quantity}</span>
                                        <button
                                            className="qty-btn-amazon"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>


                                    <button className="action-link-amazon">
                                        Guardar para más tarde
                                    </button>
                                    <button className="action-link-amazon">
                                        Compartir
                                    </button>
                                </div>
                            </div>

                            <div className="item-price-amazon">
                                <span className="price-amount-amazon">{formatPrice(item.price)}</span>
                            </div>
                        </motion.div>
                    ))}

                    <div className="cart-subtotal-amazon">
                        Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} {cart.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'producto' : 'productos'}): <strong>{formatPrice(cartTotal)}</strong>
                    </div>
                </div>

                <div className="cart-sidebar-amazon">
                    <div className="sidebar-card-amazon">
                        <div className="sidebar-subtotal">
                            Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} {cart.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'producto' : 'productos'}): <strong>{formatPrice(cartTotal)}</strong>
                        </div>

                        <div className="sidebar-gift">
                            <input type="checkbox" id="gift-checkbox" />
                            <label htmlFor="gift-checkbox">Este pedido contiene un regalo</label>
                        </div>

                        <Link to="/checkout" className="btn-proceed-amazon">
                            Proceder al pago
                        </Link>
                    </div>

                    <div className="sidebar-benefits-amazon">
                        <div className="benefit-item-amazon">
                            <ShieldCheck size={16} />
                            <span>Compra 100% Segura</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
