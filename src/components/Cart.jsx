import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
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

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
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
          transition={{ type: 'tween', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cart-header">
            <h2><ShoppingBag size={24} /> Tu Carrito</h2>
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={64} />
              <p>Tu carrito está vacío</p>
              <Link to="/products" onClick={() => setIsCartOpen(false)} className="btn-primary">
                Ver Productos
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">{formatPrice(item.price)}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-price">{formatPrice(cartTotal)}</span>
                </div>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="btn-checkout">
                  Proceder al Pago
                </Link>
                <button className="clear-cart" onClick={clearCart}>
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
