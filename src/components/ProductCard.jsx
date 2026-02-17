import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

// Strip non-Latin characters (Chinese, Japanese, Korean etc.) from API product descriptions
const sanitizeText = (text) => {
  if (!text) return '';
  return text
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\uff00-\uffef]+/g, '')  // Remove CJK chars
    .replace(/,\s*\d+\s*$/g, '')        // Remove trailing ",30" style fragments
    .replace(/,{2,}/g, ',')            // Collapse multiple commas
    .replace(/,\s*$/g, '')              // Remove trailing comma
    .replace(/\s{2,}/g, ' ')           // Collapse spaces
    .trim();
};

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <motion.div
        className="product-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-image-container" onClick={() => setShowQuickView(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setShowQuickView(true)}>
          <img src={product.image} alt={product.name} />

          {product.featured && <span className="featured-badge">⭐ Destacado</span>}

          <motion.div
            className="product-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button
              className="action-btn"
              onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={20} />
            </motion.button>
            <motion.button
              className="action-btn primary"
              onClick={(e) => { e.stopPropagation(); addToCart(product); addToast(`¡${product.name} agregado al carrito!`); }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} />
            </motion.button>
          </motion.div>

          <span className="category-badge">{product.category}</span>
        </div>

        <div className="product-info">
          <div className="product-rating">
            {product.rating > 0 && (
              <>
                <Star size={14} fill="#ffd700" color="#ffd700" />
                <span>{product.rating}</span>
              </>
            )}
            {product.reviews > 0 && (
              <span className="reviews">({product.reviews})</span>
            )}
          </div>

          <button type="button" className="product-name-link" onClick={() => setShowQuickView(true)}>
            <h3>{product.name}</h3>
          </button>
          <p className="product-description">{sanitizeText(product.description)}</p>

          <div className="product-footer">
            <span className="product-price">{formatPrice(product.price)}</span>
            <span className={`stock ${product.stock < 10 ? 'low' : ''}`}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </span>
          </div>

          <motion.button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              addToast(`¡${product.name} agregado al carrito!`);
            }}
            disabled={product.stock === 0}
            title={product.stock === 0 ? "Sin stock disponible" : "Agregar al carrito"}
            whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
          >
            <ShoppingCart size={18} />
            {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </motion.button>
        </div>
      </motion.div>

      {/* Render Modal via Portal to escape parent transforms */}
      {createPortal(
        <AnimatePresence>
          {showQuickView && (
            <div className="quick-view-overlay" onClick={() => setShowQuickView(false)} role="dialog" aria-modal="true">
              <motion.div
                className="quick-view-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button type="button" className="close-quick" onClick={() => setShowQuickView(false)} aria-label="Cerrar">×</button>
                <div className="quick-view-image">
                  <img src={product.image} alt={product.name} />
                  {product.featured && <span className="quick-view-badge">Destacado</span>}
                </div>
                <div className="quick-details">
                  <span className="quick-view-category">{product.category}</span>
                  <h2>{product.name}</h2>
                  <div className="quick-view-rating">
                    <div className="quick-view-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={i < Math.round(product.rating) ? '#ffd700' : 'none'} color="#ffd700" strokeWidth={1.5} />
                      ))}
                    </div>
                    <span className="quick-view-reviews">{product.rating} · {product.reviews} reseñas</span>
                  </div>
                  <p className="description">{product.description}</p>
                  <p className="price">{formatPrice(product.price)}</p>
                  <span className="quick-view-stock">{product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</span>
                  <div className="quick-view-actions">
                    <Link to={`/products/${product.id}`} className="btn-secondary" onClick={() => setShowQuickView(false)}>
                      Ver detalle completo
                    </Link>
                    <button type="button" className="btn-primary" onClick={() => { addToCart(product); addToast(`¡${product.name} agregado al carrito!`); setShowQuickView(false); }} disabled={product.stock === 0}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
