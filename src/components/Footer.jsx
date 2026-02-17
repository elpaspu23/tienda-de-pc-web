import { Zap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <h3>📬 Suscribite a nuestro newsletter</h3>
          <p>Recibí ofertas exclusivas y novedades de tecnología</p>
          {subscribed ? (
            <p className="newsletter-success">¡Gracias por suscribirte!</p>
          ) : (
            <form onSubmit={handleNewsletter} className="newsletter-form">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">
                <Send size={18} />
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Zap size={28} />
            <span>TECH<span>STORE</span></span>
          </div>
          <p>Tu destino número uno para tecnología de vanguardia. Calidad, innovación y los mejores precios.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="https://www.instagram.com/miguebot8888/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@miguerocha2882" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <Link to="/">Inicio</Link>
          <Link to="/products">Productos</Link>
          <Link to="/about">Nosotros</Link>
          <Link to="/contact">Contacto</Link>
        </div>

        <div className="footer-section">
          <h3>Categorías</h3>
          <Link to="/products?category=Laptops">Laptops</Link>
          <Link to="/products?category=Phones">Smartphones</Link>
          <Link to="/products?category=Gaming">Gaming</Link>
          <Link to="/products?category=Audio">Audio</Link>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p><MapPin size={16} /> Bogotá, Colombia</p>
          <p><Phone size={16} /> +57 312 527 4640</p>
          <p><Mail size={16} /> info@techstore.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 TechStore. Todos los derechos reservados.</p>
        <div className="payment-methods">
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>💳 MercadoPago</span>
          <span>💳 PayPal</span>
        </div>
      </div>
    </footer>
  );
}
