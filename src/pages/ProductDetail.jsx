import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, ArrowLeft, Check, Share2, Heart, Smartphone, Cpu, Box, Globe, Calendar, Zap, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { products as localProducts } from '../data/products';
import { getProducts } from '../api/service';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0); // Ensure top of page on load
      try {
        const data = await getProducts();
        const allProducts = data?.length ? data : localProducts;

        // Try finding by string ID first (Firebase), then by number (local)
        let found = allProducts.find(p => p.id === id || p.id == id);

        if (found) {
          setProduct(found);
          // Find related products (same category, excluding current)
          const related = allProducts
            .filter(p => p.category === found.category && p.id !== found.id)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        // Fallback to local
        const found = localProducts.find(p => p.id == id);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    addToast(`¡${product.name} agregado al carrito!`);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container-custom" style={{ paddingTop: '120px' }}>
          <div className="loading-spinner-container">
            <RefreshCw className="spinner-icon" size={40} />
            <p>Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page product-not-found">
        <div className="container-custom" style={{ paddingTop: '120px', textAlign: 'center' }}>
          <h1>Producto no encontrado</h1>
          <p>Lo sentimos, no pudimos encontrar el producto que buscas.</p>
          <Link to="/products" className="btn-primary" style={{ marginTop: '20px', display: 'inline-flex' }}>
            <ArrowLeft size={20} />
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  // Mock specs for display purposes (since we don't have real specs in DB yet)
  const productSpecs = [
    { label: 'Condición', value: 'Nuevo' },
    { label: 'Garantía', value: '12 Meses Oficial' },
    { label: 'Envío', value: 'Gratis a todo el país' },
    { label: 'Stock', value: `${product.stock} unidades` },
    { label: 'Marca', value: product?.name ? product.name.split(' ')[0] : 'Genérico' }, // Guees brand from name
    { label: 'SKU', value: `TECH-${String(product?.id || '').substring(0, 6).toUpperCase()}` }
  ];

  return (
    <div className="product-detail-page">
      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: 'Inicio', path: '/' },
            { label: 'Productos', path: '/products' },
            { label: product.category, path: `/products?category=${product.category}` },
            { label: product.name }
          ]}
        />

        <div className="product-detail-grid">
          {/* Left Column: Images */}
          <div className="product-gallery">
            <motion.div
              className="main-image-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.image} alt={product.name} className="main-image" />
              {product.featured && <span className="pd-featured-badge">⭐ Destacado</span>}
              <button className="pd-favorite-btn" aria-label="Agregar a favoritos">
                <Heart size={20} />
              </button>
            </motion.div>
            {/* Mock thumbnails (using same image for now as we have 1 per product) */}
            <div className="product-thumbnails">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className={`thumbnail-btn ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={product.image} alt={`Vista ${i + 1}`} />
                </button>
              ))}
            </div>


            {/* Description Section Moved Here */}
            <div className="pd-description-container" style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff' }}>Sobre este producto</h3>
              <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '24px' }}>
                {product.description}
              </p>

              <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                <div className="feature-item" style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Zap size={24} className="feature-icon" style={{ color: '#00ff88', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '14px', marginBottom: '4px', color: '#fff' }}>Rendimiento</h4>
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Alta eficiencia</p>
                </div>
                <div className="feature-item" style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Globe size={24} className="feature-icon" style={{ color: '#00ff88', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '14px', marginBottom: '4px', color: '#fff' }}>Conectividad</h4>
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Global 5G ready</p>
                </div>
                <div className="feature-item" style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Calendar size={24} className="feature-icon" style={{ color: '#00ff88', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '14px', marginBottom: '4px', color: '#fff' }}>Lanzamiento</h4>
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Modelo 2024</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Info */}
          <div className="product-info-panel">
            <div className="pd-header">
              <span className="pd-category">{product.category}</span>
              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-meta">
                <div className="pd-rating">
                  <Star size={18} fill="#ffd700" color="#ffd700" />
                  <span className="rating-value">{product.rating}</span>
                  <span className="review-count">({product.reviews} reseñas)</span>
                </div>
                <div className="pd-id">ID: {product.id}</div>
              </div>
            </div>

            <div className="pd-price-section">
              <div className="pd-price">{formatPrice(product.price)}</div>
              <div className="pd-payment-info">
                <span className="payment-tag">Hasta 12 cuotas fijas</span>
                <span className="payment-tag bank">5% OFF Transferencia</span>
              </div>
            </div>

            <div className="pd-stock-status">
              {product.stock > 0 ? (
                <div className="stock-indicator in-stock">
                  <Check size={16} />
                  <span>Stock disponible ({product.stock})</span>
                </div>
              ) : (
                <div className="stock-indicator no-stock">
                  <Box size={16} />
                  <span>Sin stock momentáneamente</span>
                </div>
              )}
            </div>

            <div className="pd-actions" style={{ position: 'relative' }}>
              <button
                className="btn-add-cart-large"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                Agregar al Carrito
              </button>
              <button className="btn-chat-large" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                addToast('Enlace copiado al portapapeles');
              }}>
                <Share2 size={20} />
                Compartir
              </button>
            </div>

            <div className="pd-benefits-list">
              <div className="pd-benefit-item">
                <div className="icon-box"><Truck size={20} /></div>
                <div className="text">
                  <strong>Envío Gratis</strong>
                  <span>En compras superiores a $50.000</span>
                </div>
              </div>
              <div className="pd-benefit-item">
                <div className="icon-box"><Shield size={20} /></div>
                <div className="text">
                  <strong>Garantía Oficial</strong>
                  <span>12 meses de cobertura directa</span>
                </div>
              </div>
              <div className="pd-benefit-item">
                <div className="icon-box"><RefreshCw size={20} /></div>
                <div className="text">
                  <strong>Devolución Gratis</strong>
                  <span>Tenés 30 días para cambiarlo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">Productos Relacionados</h2>
            <div className="products-grid">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Especificaciones
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reseñas ({product.reviews})
            </button>
          </div>

          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="tab-pane specs-pane"
                >
                  <h3>Especificaciones Técnicas</h3>
                  <div className="specs-table">
                    {productSpecs.map((spec, i) => (
                      <div key={i} className="spec-row">
                        <span className="spec-label">{spec.label}</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="tab-pane reviews-pane"
                >
                  <div className="reviews-summary">
                    <div className="rating-big">
                      <span className="number">{product.rating}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill={i < Math.round(product.rating) ? '#ffd700' : '#333'} color={i < Math.round(product.rating) ? '#ffd700' : '#333'} />
                        ))}
                      </div>
                      <span className="count">Basado en {product.reviews} reseñas</span>
                    </div>
                    <div className="write-review">
                      <p>¿Tenes este producto?</p>
                      <button className="btn-secondary">Escribir una reseña</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
