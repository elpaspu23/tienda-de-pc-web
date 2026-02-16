import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as localProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Breadcrumbs from '../components/Breadcrumbs';
import { Search, Filter, X, SlidersHorizontal, Loader2, ChevronDown, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts, getCategories } from '../api/service';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(localProducts);
  const [categoriesList, setCategoriesList] = useState(categories);
  const [loading, setLoading] = useState(true);
  const [useAPI, setUseAPI] = useState(false);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    priceRange: [0, 2000000],
    minRating: 0,
    sortBy: 'featured'
  });

  // Sync filters with URL params when they change
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    setFilters(prev => ({ ...prev, search, category }));
  }, [searchParams]);

  // Load products from JSON Server
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        if (productsData && productsData.length > 0) {
          setProducts(productsData);
          setCategoriesList(categoriesData || categories);
          setUseAPI(true);
        }
      } catch (error) {
        console.log('Using local products - JSON Server not running');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search) ||
        p.category?.toLowerCase().includes(search)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Price
    result = result.filter(p => 
      (p.price || 0) >= filters.priceRange[0] && 
      (p.price || 0) <= filters.priceRange[1]
    );

    // Rating
    if (filters.minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= filters.minRating);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, products]);

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priceRange: [0, 2000000],
      minRating: 0,
      sortBy: 'featured'
    });
    setSearchParams({});
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="products-page">
      <Breadcrumbs items={[{ label: 'Inicio', path: '/' }, { label: 'Productos' }]} />
      <div className="products-header">
        <h1>🛒 Todos los Productos</h1>
        <p>
          {filteredProducts.length} productos encontrados
          {useAPI && <span className="api-badge">🔗 API</span>}
        </p>
      </div>

      <div className="products-layout">
        {/* Filtros compactos - barra horizontal */}
        <div className="products-filters-bar">
          <div className="filters-bar-row">
            <div className="filter-search-mini">
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div className="filter-select-wrap">
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="filter-select"
              >
                <option value="">Categoría</option>
                {categoriesList.map(cat => (
                  <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="filter-select-arrow" />
            </div>
            <div className="filter-select-wrap">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="filter-select"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio ↑</option>
                <option value="price-desc">Precio ↓</option>
                <option value="rating">Rating</option>
                <option value="name">Nombre</option>
              </select>
              <ChevronDown size={14} className="filter-select-arrow" />
            </div>
            <button
              type="button"
              className={`filter-more-btn ${showFilters ? 'open' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={16} />
              Más
            </button>
            {(filters.category || filters.search || filters.minRating > 0) && (
              <button type="button" className="filter-clear-btn" onClick={clearFilters}>
                <RotateCcw size={14} />
                Limpiar
              </button>
            )}
          </div>

          {/* Panel desplegable para filtros adicionales */}
          <motion.div
            className={`filters-expanded ${showFilters ? 'visible' : ''}`}
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="filters-expanded-inner">
              <div className="filter-exp-group">
                <span className="filter-exp-label">Precio hasta</span>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                />
                <span className="filter-exp-value">{formatPrice(filters.priceRange[1])}</span>
              </div>
              <div className="filter-exp-group">
                <span className="filter-exp-label">Rating</span>
                <div className="filter-rating-pills">
                  {[0, 3, 4, 4.5].map(r => (
                    <button
                      key={r}
                      type="button"
                      className={`filter-pill ${filters.minRating === r ? 'active' : ''}`}
                      onClick={() => setFilters({...filters, minRating: r})}
                    >
                      {r === 0 ? 'Todos' : `${r}+ ★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tags de filtros activos */}
          {(filters.category || filters.search) && (
            <div className="filter-tags">
              {filters.category && (
                <span className="filter-tag">
                  {filters.category}
                  <button type="button" onClick={() => setFilters({...filters, category: ''})} aria-label="Quitar"><X size={12} /></button>
                </span>
              )}
              {filters.search && (
                <span className="filter-tag">
                  "{filters.search}"
                  <button type="button" onClick={() => setFilters({...filters, search: ''})} aria-label="Quitar"><X size={12} /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <main className="products-main">

          {loading ? (
            <div className="products-grid">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No se encontraron productos con esos filtros</p>
              <button onClick={clearFilters}>Limpiar filtros</button>
            </div>
          ) : (
            <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
