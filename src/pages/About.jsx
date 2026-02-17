import { MapPin, Award, Truck, Headphones, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';

// Pegá acá la URL del iframe cuando tengas la dirección exacta
// (Google Maps → buscar tu dirección → Compartir → Insertar mapa)
const MAP_EMBED_URL = 'https://maps.google.com/maps?q=Bogota,Colombia&t=&z=13&ie=UTF8&iwloc=&output=embed';

export default function About() {
  return (
    <div className="about-page">
      <Breadcrumbs items={[{ label: 'Inicio', path: '/' }, { label: 'Nosotros' }]} />

      <section className="about-hero">
        <motion.span
          className="about-hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nosotros
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tecnología con <span className="gradient-text">pasión</span>
        </motion.h1>
        <motion.p
          className="about-hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Somos tu destino número uno para tecnología de última generación en Colombia
        </motion.p>
      </section>

      <section className="about-story">
        <motion.div
          className="story-content"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Nuestra Historia</h2>
          <p>
            Fundada en 2020, TechStore nació con una misión clara: hacer la tecnología
            más accesible para todos los colombianos.
          </p>
          <p>
            Empezamos desde un pequeño espacio, hoy somos referentes en el mercado
            de tecnología, ofreciendo productos de las mejores marcas
            con un servicio al cliente excepcional.
          </p>
          <p>
            Creemos que la tecnología tiene el poder de transformar vidas,
            y estamos comprometidos a traer los mejores productos al mejor precio posible.
          </p>
        </motion.div>
        <motion.div
          className="story-stats"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { number: '50K+', label: 'Clientes satisfechos' },
            { number: '500+', label: 'Productos' },
            { number: '98%', label: 'Satisfacción' },
            { number: '24/7', label: 'Soporte' }
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="about-values">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ¿Por qué elegirnos?
        </motion.h2>
        <div className="values-grid">
          {[
            { icon: Shield, title: 'Garantía Oficial', desc: 'Todos nuestros productos cuentan con garantía oficial del fabricante' },
            { icon: Truck, title: 'Envío Rápido', desc: 'Entregamos en 24-48 horas en todo el país' },
            { icon: Headphones, title: 'Soporte 24/7', desc: 'Nuestro equipo está disponible para ayudarte en cualquier momento' },
            { icon: Award, title: 'Mejores Marcas', desc: 'Trabajamos solo con las marcas más reconocidas del mercado' }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="value-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="value-card-icon">
                <item.icon size={28} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-team">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nuestro Equipo
        </motion.h2>
        <motion.p
          className="about-team-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Un grupo de apasionados por la tecnología
        </motion.p>
        <div className="team-grid">
          {[
            { name: 'Miguel Angel Rocha Coca', role: 'CEO & Fundador', initial: 'M', color: 'primary' },
            { name: 'Esther Judith', role: 'Directora Comercial', initial: 'E', color: 'secondary' },
            { name: 'Sebastian Rocha', role: 'Jefe de Tecnología', initial: 'S', color: 'primary' },
            { name: 'Ider Rocha', role: 'Diseño UX/UI', initial: 'I', color: 'secondary' }
          ].map((member, i) => (
            <motion.div
              key={i}
              className="team-member"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`member-avatar member-avatar--${member.color}`}>{member.initial}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-location">
        <motion.div
          className="location-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="location-icon-wrap">
            <MapPin size={28} />
          </div>
          <div>
            <h2>Nuestra Ubicación</h2>
            <p className="location-city">Bogotá, Colombia</p>
            <p className="location-hours">Lun-Vie 9:00-18:00 · Sáb 10:00-14:00</p>
          </div>
        </motion.div>
        <motion.div
          className="location-map-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TechStore - Bogotá, Colombia"
          />
          <a
            href="https://www.google.com/maps/place/Bogot%C3%A1,+Colombia"
            target="_blank"
            rel="noopener noreferrer"
            className="location-map-link"
          >
            Ver en Google Maps
          </a>
        </motion.div>
      </section>
    </div>
  );
}
