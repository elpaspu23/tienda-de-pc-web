import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import About from './pages/About';
import './index.css';
import './polish.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Cart />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
