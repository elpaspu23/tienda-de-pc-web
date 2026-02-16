import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, CreditCard, Star } from 'lucide-react';
import { products as localProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { getProducts } from '../api/service';

export default function Home() {
  const [products, setProducts] = useState(localProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.log('Using local products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const features = [
    { icon: <Zap size={24} />, title: 'Envío Rápido', desc: 'Entrega en 24-48hs' },
    { icon: <Shield size={24} />, title: 'Garantía Oficial', desc: 'Todos los productos' },
    { icon: <Truck size={24} />, title: 'Envío Gratis', desc: 'En pedidos +$50.000' },
    { icon: <CreditCard size={24} />, title: 'Pago Seguro', desc: 'MercadoPago' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tecnología de <span className="gradient-text">Última Generación</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Descubrí los productos más innovadores del mercado. 
            Envíos gratis, garantía oficial y los mejores precios.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products" className="btn-primary">
              Ver Productos <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="btn-secondary">
              Conocenos
            </Link>
          </motion.div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2>🔥 Productos Destacados</h2>
          <Link to="/products" className="view-all">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="section-header">
          <h2>📦 Categorías</h2>
        </div>
        <div className="categories-grid">
          {[
            { name: 'Consolas', icon: '🎮', count: 3 },
            { name: 'Componentes', icon: '💻', count: 2 },
            { name: 'Periféricos', icon: '🖱️', count: 2 },
            { name: 'Audio', icon: '🎧', count: 1 },
            { name: 'Laptops', icon: '🖥️', count: 1 },
            { name: 'Monitores', icon: '🖥️', count: 1 },
            { name: 'VR', icon: '🥽', count: 1 },
            { name: 'Almacenamiento', icon: '💾', count: 1 }
          ].map((cat, index) => (
            <Link to={`/products?category=${cat.name}`} key={index} className="category-card">
              <div className="category-card-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <span>{cat.count} productos</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2>💬 Qué dicen nuestros clientes</h2>
        </div>
        <div className="testimonials-grid">
          {[
            { name: 'Marcos R.', rating: 5, text: 'Excelente atención y entrega rapidísima. Recomendado!', avatar: 'M' },
            { name: 'Sofia L.', rating: 5, text: 'Los mejores precios en tecnología. Ya compré varias veces.', avatar: 'S' },
            { name: 'Carlos M.', rating: 5, text: 'Producto llegó en perfecto estado. Muy satisfecho.', avatar: 'C' }
          ].map((testimonial, index) => (
            <div key={index} className="testimonial">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#ffd700" color="#ffd700" />
                ))}
              </div>
              <p>"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <span>{testimonial.name}</span>
                  <small>Cliente verificado</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
