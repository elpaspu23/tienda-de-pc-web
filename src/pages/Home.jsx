import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, CreditCard, Star, Gamepad2, Laptop, Smartphone, Headphones, Monitor, Keyboard, Tablet, Watch, Cpu, Quote } from 'lucide-react';
import { products as localProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { getProducts } from '../api/service';

import SeedButton from '../scripts/seedFirebase';

export default function Home() {
  const [products, setProducts] = useState(localProducts);
  const [loading, setLoading] = useState(true);

  // ... (useEffect remains same)

  return (
    <div className="home">
      <SeedButton /> {/* Temporary button for deployment */}
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🚚 Envío gratis en todo el país
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
          {/* Abstract tech shape */}
          <motion.div
            className="hero-abstract"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="hero-abstract-ring hero-abstract-ring--1" />
            <div className="hero-abstract-ring hero-abstract-ring--2" />
            <div className="hero-abstract-ring hero-abstract-ring--3" />
            <div className="hero-abstract-core">
              <Zap size={48} strokeWidth={1.5} />
            </div>
          </motion.div>
          {/* Info pills */}
          <motion.div
            className="hero-pill hero-pill--top"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield size={16} />
            <span>Garantía Oficial</span>
          </motion.div>
          <motion.div
            className="hero-pill hero-pill--bottom"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Truck size={16} />
            <span>Envío Gratis</span>
          </motion.div>
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
          <div>
            <h2>🔥 Productos Destacados</h2>
            <p className="section-subtitle">Los favoritos de nuestros clientes</p>
          </div>
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
          <span className="categories-badge">📂 Categorías</span>
          <h2>Explorá por <span className="gradient-text">categoría</span></h2>
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

      {/* Promo Banner */}
      <section className="promo-banner">
        <motion.div
          className="promo-banner-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="promo-banner-text">
            <span className="promo-badge">🎯 Oferta Especial</span>
            <h2>Encontrá todo lo que necesitás en un solo lugar</h2>
            <p>Tecnología de última generación con envío gratis, garantía oficial y los mejores precios del mercado.</p>
            <Link to="/products" className="btn-primary">
              Explorar Catálogo <ArrowRight size={20} />
            </Link>
          </div>
          <div className="promo-banner-stats">
            <div className="promo-stat">
              <span className="promo-stat-number">500+</span>
              <span className="promo-stat-label">Productos</span>
            </div>
            <div className="promo-stat">
              <span className="promo-stat-number">24hs</span>
              <span className="promo-stat-label">Envío Express</span>
            </div>
            <div className="promo-stat">
              <span className="promo-stat-number">100%</span>
              <span className="promo-stat-label">Garantía</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Strip */}
      <section className="benefits-strip">
        <motion.div
          className="benefits-strip-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="benefit-item">
            <div className="benefit-icon"><Truck size={28} /></div>
            <div>
              <h4>Envío Gratis</h4>
              <p>A todo el país sin mínimo</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><Shield size={28} /></div>
            <div>
              <h4>Garantía Oficial</h4>
              <p>En todos los productos</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><CreditCard size={28} /></div>
            <div>
              <h4>Pago Seguro</h4>
              <p>MercadoPago y más opciones</p>
            </div>
          </div>
        </motion.div>
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
