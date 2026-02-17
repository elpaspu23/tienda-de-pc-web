import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Cart />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <Analytics />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
