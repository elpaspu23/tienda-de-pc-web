import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <h2><ShoppingBag size={20} /> Tu Carrito ({cart.length})</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={48} strokeWidth={1} />
                <p>Tu carrito está vacío</p>
                <Link
                  to="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary"
                  style={{ width: 'fit-content' }}
                >
                  Explorar Productos
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  <AnimatePresence>
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      >
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          <div className="item-price">{formatPrice(item.price)}</div>
                        </div>

                        <div className="item-actions">
                          <button
                            className="action-icon"
                            onClick={() => removeFromCart(item.id)}
                            title="Eliminar producto"
                          >
                            <Trash2 size={16} />
                          </button>

                          <div className="quantity-capsule">
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total estimado</span>
                    <motion.span
                      key={cartTotal}
                      initial={{ scale: 1.2, color: '#00ff88' }}
                      animate={{ scale: 1, color: '#00ccff' }}
                      className="total-price"
                    >
                      {formatPrice(cartTotal)}
                    </motion.span>
                  </div>

                  <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="btn-checkout">
                    Proceder al Pago <ArrowRight size={20} />
                  </Link>

                  <button className="clear-cart" onClick={clearCart}>
                    Vaciar Carrito
                  </button>

                  <div className="trust-badge">
                    <ShieldCheck size={16} /> Compra 100% Segura y Garantizada
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
