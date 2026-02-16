import { Zap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <Zap size={28} />
            <span>TECH<span>STORE</span></span>
          </div>
          <p>Tu destino número uno para tecnología de vanguardia. Qualidade, innovación y los mejores precios.</p>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Youtube size={20} /></a>
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
          <a href="#">Laptops</a>
          <a href="#">Smartphones</a>
          <a href="#">Gaming</a>
          <a href="#">Audio</a>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p><MapPin size={16} /> Buenos Aires, Argentina</p>
          <p><Phone size={16} /> +54 11 1234-5678</p>
          <p><Mail size={16} /> info@techstore.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 TechStore. Todos los derechos reservados.</p>
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
