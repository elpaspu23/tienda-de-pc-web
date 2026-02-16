import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Zap className="logo-icon" />
          <span>TECH<span className="logo-accent">STORE</span></span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/products" className="nav-link">Productos</Link>
          <Link to="/about" className="nav-link">Nosotros</Link>
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Productos</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
