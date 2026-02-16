import { MapPin, Users, Award, Truck, Headphones, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Conocenos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Somos tu destino número uno para tecnología de última generación
        </motion.p>
      </section>

      <section className="about-story">
        <div className="story-content">
          <h2>Nuestra Historia</h2>
          <p>
            Fundada en 2020, TechStore nació con una misión clara: 
            hacer la tecnología más accesible para todos los argentinos.
          </p>
          <p>
            Started desde un pequeño garage, hoy somos referentes en el mercado 
            de tecnología, ofreciendo productos de las mejores marcas 
            con un servicio al cliente excepcional.
          </p>
          <p>
            Creemos que la tecnología tiene el poder de transformar vidas, 
            y estamos comprometidos a trazer los mejores productos 
            al mejor precio posible.
          </p>
        </div>
        <div className="story-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Clientes satisfechos</span>
          </div>
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Productos</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">好评 Client satisfaction</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Soporte</span>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2>¿Por qué elegirnos?</h2>
        <div className="values-grid">
          <motion.div
            className="value-card"
            whileHover={{ scale: 1.05 }}
          >
            <Shield size={40} />
            <h3>Garantía Oficial</h3>
            <p>Todos nuestros productos cuentan con garantía oficial del fabricante</p>
          </motion.div>
          <motion.div
            className="value-card"
            whileHover={{ scale: 1.05 }}
          >
            <Truck size={40} />
            <h3>Envío Rápido</h3>
            <p>Entregamos en 24-48 horas en todo el país</p>
          </motion.div>
          <motion.div
            className="value-card"
            whileHover={{ scale: 1.05 }}
          >
            <Headphones size={40} />
            <h3>Soporte 24/7</h3>
            <p>Nuestro equipo está disponible para ayudarte en cualquier momento</p>
          </motion.div>
          <motion.div
            className="value-card"
            whileHover={{ scale: 1.05 }}
          >
            <Award size={40} />
            <h3>Mejores Marcas</h3>
            <p>Trabajamos solo con las marcas más reconocidas del mercado</p>
          </motion.div>
        </div>
      </section>

      <section className="about-team">
        <h2>Nuestro Equipo</h2>
        <p>Un grupo de apasionados por la tecnología</p>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <h3>Carlos Rodríguez</h3>
            <p>CEO & Fundador</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">👩‍💼</div>
            <h3>María González</h3>
            <p>Directora Comercial</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">👨‍🔧</div>
            <h3>Juan Pérez</h3>
            <p>Jefe de Tecnología</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">👩‍🎨</div>
            <h3>Ana López</h3>
            <p>Diseño UX/UI</p>
          </div>
        </div>
      </section>

      <section className="about-location">
        <h2>📍 Nuestra Ubicación</h2>
        <div className="location-info">
          <MapPin size={24} />
          <div>
            <p><strong>TechStore</strong></p>
            <p>Buenos Aires, Argentina</p>
            <p>Horarios: Lun-Vie 9:00-18:00 | Sáb 10:00-14:00</p>
          </div>
        </div>
      </section>
    </div>
  );
}
