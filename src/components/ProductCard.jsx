import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();
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
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
        
        {product.featured && <span className="featured-badge">⭐ Destacado</span>}
        
        <motion.div
          className="product-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <button className="action-btn" onClick={() => setShowQuickView(true)}>
            <Eye size={20} />
          </button>
          <button className="action-btn primary" onClick={() => addToCart(product)}>
            <ShoppingCart size={20} />
          </button>
        </motion.div>

        <span className="category-badge">{product.category}</span>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <Star size={14} fill="#ffd700" color="#ffd700" />
          <span>{product.rating}</span>
          <span className="reviews">({product.reviews})</span>
        </div>
        
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className={`stock ${product.stock < 10 ? 'low' : ''}`}>
            {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
          </span>
        </div>

        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <ShoppingCart size={18} />
          Agregar al Carrito
        </button>
      </div>

      {showQuickView && (
        <div className="quick-view-overlay" onClick={() => setShowQuickView(false)}>
          <motion.div
            className="quick-view-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-quick" onClick={() => setShowQuickView(false)}>×</button>
            <img src={product.image} alt={product.name} />
            <div className="quick-details">
              <h2>{product.name}</h2>
              <div className="rating">
                <Star size={16} fill="#ffd700" color="#ffd700" />
                <span>{product.rating} ({product.reviews} reseñas)</span>
              </div>
              <p className="description">{product.description}</p>
              <p className="category">Categoría: {product.category}</p>
              <p className="price">{formatPrice(product.price)}</p>
              <button className="btn-primary" onClick={() => { addToCart(product); setShowQuickView(false); }}>
                Agregar al Carrito
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
