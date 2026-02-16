import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as localProducts, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X, SlidersHorizontal, Loader2 } from 'lucide-react';
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
      <div className="products-header">
        <h1>🛒 Todos los Productos</h1>
        <p>
          {filteredProducts.length} productos encontrados
          {useAPI && <span className="api-badge">🔗 API</span>}
        </p>
      </div>

      <div className="products-layout">
        {/* Filters Sidebar */}
        <motion.aside
          className={`filters-sidebar ${showFilters ? 'show' : ''}`}
          initial={{ x: -300 }}
          animate={{ x: showFilters ? 0 : -300 }}
        >
          <div className="filters-header">
            <h3><SlidersHorizontal size={20} /> Filtros</h3>
            <button onClick={() => setShowFilters(false)} className="close-filters">
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="filter-group">
            <label>Buscar</label>
            <div className="search-input">
              <Search size={18} />
              <input
                type="text"
                placeholder="Producto..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
          </div>

          {/* Category */}
          <div className="filter-group">
            <label>Categoría</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">Todas las categorías</option>
              {categoriesList.map(cat => (
                <option key={cat.id || cat.name} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label>Precio: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}</label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value)]
              })}
            />
          </div>

          {/* Rating */}
          <div className="filter-group">
            <label>Rating mínimo</label>
            <div className="rating-options">
              {[0, 3, 4, 4.5].map(r => (
                <button
                  key={r}
                  className={filters.minRating === r ? 'active' : ''}
                  onClick={() => setFilters({...filters, minRating: r})}
                >
                  {r === 0 ? 'Todos' : `⭐ ${r}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label>Ordenar por</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Rating</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Limpiar Filtros
          </button>
        </motion.aside>

        {/* Products Grid */}
        <main className="products-main">
          <div className="products-toolbar">
            <button className="filter-toggle" onClick={() => setShowFilters(true)}>
              <Filter size={18} /> Filtros
            </button>
            
            <div className="active-filters">
              {filters.category && (
                <span className="filter-tag">
                  {filters.category}
                  <X size={14} onClick={() => setFilters({...filters, category: ''})} />
                </span>
              )}
              {filters.search && (
                <span className="filter-tag">
                  "{filters.search}"
                  <X size={14} onClick={() => setFilters({...filters, search: ''})} />
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading-products">
              <Loader2 className="spin" size={40} />
              <p>Cargando productos...</p>
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
