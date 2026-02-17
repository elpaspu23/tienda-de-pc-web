import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const S = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(5, 10, 20, 0.75)',
    backdropFilter: 'blur(6px)',
    display: 'flex', justifyContent: 'flex-end',
  },
  sidebar: {
    width: '100%', maxWidth: '420px', height: '100%',
    background: 'linear-gradient(180deg, #0d1117 0%, #0a0f1a 100%)',
    display: 'flex', flexDirection: 'column',
    borderLeft: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '24px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  headerTitle: {
    display: 'flex', alignItems: 'center', gap: '10px',
    fontFamily: "'Syne', system-ui, sans-serif",
    fontSize: '18px', fontWeight: 700,
    color: '#fff', margin: 0,
  },
  headerBag: {
    background: 'rgba(0,229,160,0.12)',
    borderRadius: '10px', padding: '7px',
    display: 'flex', color: '#00e5a0',
  },
  headerCount: {
    background: '#00e5a0', color: '#0a0f1a',
    borderRadius: '20px', padding: '2px 8px',
    fontSize: '12px', fontWeight: 700,
  },
  closeBtn: {
    width: '36px', height: '36px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.2s',
  },
  emptyState: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '16px', padding: '40px 24px',
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center',
  },
  emptyIcon: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '50%', padding: '24px',
    color: 'rgba(255,255,255,0.15)',
  },
  emptyText: { fontSize: '15px', color: 'rgba(255,255,255,0.3)', margin: 0 },
  itemsList: {
    flex: 1, overflowY: 'auto', padding: '16px',
    display: 'flex', flexDirection: 'column', gap: '12px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.1) transparent',
  },
  item: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '14px',
    display: 'flex', gap: '14px', alignItems: 'center',
    transition: 'border-color 0.2s',
  },
  itemImg: {
    width: '64px', height: '64px', borderRadius: '12px',
    objectFit: 'cover', flexShrink: 0,
    background: 'rgba(255,255,255,0.06)',
  },
  itemDetails: { flex: 1, minWidth: 0 },
  itemName: {
    fontSize: '13px', fontWeight: 600, color: '#fff',
    margin: '0 0 4px', whiteSpace: 'nowrap',
    overflow: 'hidden', textOverflow: 'ellipsis',
  },
  itemPrice: {
    fontSize: '15px', fontWeight: 700, color: '#00e5a0',
    fontFamily: "'Syne', system-ui, sans-serif",
  },
  itemActions: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'flex-end', gap: '10px', flexShrink: 0,
  },
  trashBtn: {
    width: '30px', height: '30px', borderRadius: '8px',
    background: 'rgba(255,80,80,0.08)',
    border: '1px solid rgba(255,80,80,0.15)',
    color: 'rgba(255,100,100,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.2s',
  },
  qtyCapsule: {
    display: 'flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', overflow: 'hidden',
  },
  qtyBtn: {
    width: '28px', height: '28px',
    background: 'none', border: 'none',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer', fontSize: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s',
  },
  qtyVal: {
    width: '28px', textAlign: 'center',
    fontSize: '13px', fontWeight: 600, color: '#fff',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
    borderRight: '1px solid rgba(255,255,255,0.08)',
    lineHeight: '28px',
  },
  footer: {
    padding: '20px 24px 28px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column', gap: '14px',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px',
    background: 'rgba(0,229,160,0.06)',
    border: '1px solid rgba(0,229,160,0.12)',
    borderRadius: '14px',
  },
  totalLabel: { fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 },
  totalPrice: {
    fontFamily: "'Syne', system-ui, sans-serif",
    fontSize: '22px', fontWeight: 800, color: '#00e5a0',
    letterSpacing: '-0.5px',
  },
  checkoutBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    padding: '15px', borderRadius: '14px',
    background: 'linear-gradient(135deg, #00e5a0, #00c070)',
    color: '#0a0f1a', fontWeight: 700, fontSize: '15px',
    fontFamily: "'Syne', system-ui, sans-serif",
    textDecoration: 'none', cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,229,160,0.25)',
    transition: 'all 0.2s', border: 'none',
    letterSpacing: '0.3px',
  },
  clearBtn: {
    background: 'none', border: 'none',
    color: 'rgba(255,255,255,0.25)',
    fontSize: '12px', cursor: 'pointer',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    textAlign: 'center', padding: '4px',
    transition: 'color 0.2s',
  },
  trustBadge: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '6px', fontSize: '11px',
    color: 'rgba(255,255,255,0.25)',
    padding: '8px',
  },
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .cart-trash:hover { background: rgba(255,80,80,0.2) !important; border-color: rgba(255,80,80,0.4) !important; color: #ff6b6b !important; transform: scale(1.08); }
        .cart-qty-btn:hover { background: rgba(0,229,160,0.15) !important; color: #00e5a0 !important; }
        .cart-checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,229,160,0.35) !important; }
        .cart-clear:hover { color: rgba(255,100,100,0.5) !important; }
        .cart-item-row:hover { border-color: rgba(0,229,160,0.18) !important; }
        .cart-close:hover { background: rgba(255,255,255,0.1) !important; color: #fff !important; }
      `}</style>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            style={S.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              style={S.sidebar}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
            >
              {/* HEADER */}
              <div style={S.header}>
                <h2 style={S.headerTitle}>
                  <span style={S.headerBag}><ShoppingBag size={18} /></span>
                  Tu Carrito
                  <span style={S.headerCount}>{cart.length}</span>
                </h2>
                <button className="cart-close" style={S.closeBtn} onClick={() => setIsCartOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {cart.length === 0 ? (
                /* EMPTY */
                <div style={S.emptyState}>
                  <div style={S.emptyIcon}><ShoppingBag size={40} strokeWidth={1} /></div>
                  <p style={S.emptyText}>Tu carrito está vacío</p>
                  <Link
                    to="/products"
                    onClick={() => setIsCartOpen(false)}
                    style={{
                      padding: '10px 24px', borderRadius: '12px',
                      background: 'rgba(0,229,160,0.12)',
                      border: '1px solid rgba(0,229,160,0.25)',
                      color: '#00e5a0', fontWeight: 600, fontSize: '13px',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                  >
                    Explorar Productos
                  </Link>
                </div>
              ) : (
                <>
                  {/* ITEMS */}
                  <div style={S.itemsList}>
                    <AnimatePresence>
                      {cart.map(item => (
                        <motion.div
                          key={item.id}
                          className="cart-item-row"
                          style={S.item}
                          layout
                          initial={{ opacity: 0, y: 16, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 40, scale: 0.94, transition: { duration: 0.22 } }}
                        >
                          <img src={item.image} alt={item.name} style={S.itemImg} />

                          <div style={S.itemDetails}>
                            <p style={S.itemName}>{item.name}</p>
                            <p style={S.itemPrice}>{formatPrice(item.price)}</p>
                          </div>

                          <div style={S.itemActions}>
                            <button
                              className="cart-trash"
                              style={S.trashBtn}
                              onClick={() => removeFromCart(item.id)}
                              title="Eliminar"
                            >
                              <Trash2 size={13} />
                            </button>

                            <div style={S.qtyCapsule}>
                              <button
                                className="cart-qty-btn"
                                style={S.qtyBtn}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span style={S.qtyVal}>{item.quantity}</span>
                              <button
                                className="cart-qty-btn"
                                style={S.qtyBtn}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* FOOTER */}
                  <div style={S.footer}>
                    <div style={S.totalRow}>
                      <span style={S.totalLabel}>Total estimado</span>
                      <motion.span
                        key={cartTotal}
                        style={S.totalPrice}
                        initial={{ scale: 1.15, color: '#fff' }}
                        animate={{ scale: 1, color: '#00e5a0' }}
                        transition={{ duration: 0.3 }}
                      >
                        {formatPrice(cartTotal)}
                      </motion.span>
                    </div>

                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="cart-checkout-btn"
                      style={S.checkoutBtn}
                    >
                      Proceder al Pago <ArrowRight size={18} />
                    </Link>

                    <button className="cart-clear" style={S.clearBtn} onClick={clearCart}>
                      Vaciar carrito
                    </button>

                    <div style={S.trustBadge}>
                      <ShieldCheck size={13} />
                      Compra 100% Segura y Garantizada
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
