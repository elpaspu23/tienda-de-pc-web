import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, CreditCard, Star, Gamepad2, Laptop, Smartphone, Headphones, Monitor, Keyboard, Tablet, Watch, Cpu, Quote } from 'lucide-react';
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

  const categoriesWithCount = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
    });
    const iconMap = {
      Gaming: Gamepad2,
      Laptops: Laptop,
      Phones: Smartphone,
      Audio: Headphones,
      Monitors: Monitor,
      Peripherals: Keyboard,
      Tablets: Tablet,
      Wearables: Watch,
      Components: Cpu
    };
    const labelMap = {
      Gaming: 'Gaming',
      Laptops: 'Laptops',
      Phones: 'Celulares',
      Audio: 'Audio',
      Monitors: 'Monitores',
      Peripherals: 'Periféricos',
      Tablets: 'Tablets',
      Wearables: 'Relojes',
      Components: 'Componentes'
    };
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        label: labelMap[name] || name,
        count,
        Icon: iconMap[name] || Zap,
        gradient: name === 'Gaming' ? 'gaming' : name === 'Laptops' ? 'laptops' : 'default'
      }));
  }, [products]);

  // ← Editá este mensaje y la calificación de TechStore (1-5 estrellas)
  const ourMessage = {
    rating: 5,
    message: 'En TechStore nos comprometemos a ofrecerte la mejor tecnología al mejor precio. Tu satisfacción es nuestra prioridad, y trabajamos cada día para superar tus expectativas.',
    author: 'Equipo TechStore'
  };

  const customerTestimonials = [
    { name: 'Marcos R.', rating: 5, text: 'Excelente atención y entrega rapidísima. Recomendado!', avatar: 'M' },
    { name: 'Sofia L.', rating: 5, text: 'Los mejores precios en tecnología. Ya compré varias veces.', avatar: 'S' },
    { name: 'Carlos M.', rating: 5, text: 'Producto llegó en perfecto estado. Muy satisfecho.', avatar: 'C' }
  ];

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
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🚚 Envío gratis en compras +$50.000
          </motion.span>
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
        <div className="categories-header">
          <h2>Explorá por categoría</h2>
          <p>Encontrá lo que necesitás en segundos</p>
          <Link to="/products" className="categories-cta">
            Ver todo <ArrowRight size={18} />
          </Link>
        </div>
        <div className="categories-showcase">
          {categoriesWithCount.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/products?category=${cat.name}`}
                className={`category-card category-card--${cat.gradient}`}
              >
                <div className="category-card-bg" />
                <div className="category-card-content">
                  <div className="category-card-icon">
                    <cat.Icon size={28} strokeWidth={2} />
                  </div>
                  <div className="category-card-text">
                    <span className="category-card-label">{cat.label}</span>
                    <span className="category-card-count">{cat.count} productos</span>
                  </div>
                  <ArrowRight size={18} className="category-card-arrow" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonials-header">
          <h2>Lo que dicen de nosotros</h2>
          <p>Opiniones reales de clientes y nuestro compromiso con vos</p>
        </div>

        {/* Nuestro mensaje - editable arriba en ourMessage */}
        <motion.div
          className="testimonial-our-message"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Quote size={40} className="testimonial-quote-icon" />
          <div className="testimonial-our-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} fill={i < ourMessage.rating ? '#ffd700' : 'none'} color="#ffd700" strokeWidth={1.5} />
            ))}
          </div>
          <p className="testimonial-our-text">{ourMessage.message}</p>
          <span className="testimonial-our-author">— {ourMessage.author}</span>
        </motion.div>

        <div className="testimonials-grid">
          {customerTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="testimonial-card-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < testimonial.rating ? '#ffd700' : 'none'} color="#ffd700" strokeWidth={1.5} />
                ))}
              </div>
              <p className="testimonial-card-text">"{testimonial.text}"</p>
              <div className="testimonial-card-author">
                <div className="testimonial-card-avatar">{testimonial.avatar}</div>
                <div>
                  <span className="testimonial-card-name">{testimonial.name}</span>
                  <small>Cliente verificado ✓</small>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
