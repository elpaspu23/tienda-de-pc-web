import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import { products as localProducts } from '../data/products';
import { getProducts } from '../api/service';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        const allProducts = data?.length ? data : localProducts;
        const found = allProducts.find(p => p.id === parseInt(id));
        setProduct(found || null);
      } catch {
        const found = localProducts.find(p => p.id === parseInt(id));
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
        <div className="product-detail-skeleton">
          <div className="skeleton skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-price" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page product-not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/products" className="btn-primary">
          <ArrowLeft size={20} />
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Breadcrumbs
        items={[
          { label: 'Inicio', path: '/' },
          { label: 'Productos', path: '/products' },
          { label: product.name }
        ]}
      />

      <motion.div
        className="product-detail"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          {product.featured && <span className="featured-badge">⭐ Destacado</span>}
        </div>

        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="product-rating-detail">
            <Star size={20} fill="#ffd700" color="#ffd700" />
            <span>{product.rating}</span>
            <span className="reviews">({product.reviews} reseñas)</span>
          </div>
          <p className="product-description-full">{product.description}</p>
          <div className="product-price-detail">{formatPrice(product.price)}</div>
          <span className={`stock-badge ${product.stock < 10 ? 'low' : ''}`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
          </span>

          <button
            className="btn-primary add-to-cart-detail"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={22} />
            Agregar al Carrito
          </button>

          <div className="product-benefits">
            <div className="benefit">
              <Truck size={24} />
              <span>Envío gratis en compras +$50.000</span>
            </div>
            <div className="benefit">
              <Shield size={24} />
              <span>Garantía oficial del fabricante</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
