import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, ShoppingCart, ChevronDown, Filter, X, Search as SearchIcon, Loader2 } from 'lucide-react';
import { Product } from '../types/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { ProductService } from '../api/ProductService';

export const ProductsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const brandFilter = searchParams.get('brand') || '';
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('price-asc');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getProducts({ 
          brand: brandFilter || undefined, 
          search: searchQuery || undefined 
        });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, brandFilter]);

  const sortedProducts = useMemo(() => {
    let result = [...products];

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceValue - b.priceValue;
      if (sortBy === 'price-desc') return b.priceValue - a.priceValue;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [products, sortBy]);

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {searchQuery ? `${t('products.resultsFor')} "${searchQuery}"` : t('products.allProducts')}
              </h1>
              <p className="text-gray-500 mt-1">
                {t('products.itemsCount', { count: sortedProducts.length })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:border-blue-500 transition-all shadow-sm"
                >
                  <span>{t('products.sortBy')}: {t(`products.sort.${sortBy}`)}</span>
                  <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20"
                    >
                      <div className="p-1">
                        {[
                          { id: 'price-asc', label: t('products.sort.price-asc') },
                          { id: 'price-desc', label: t('products.sort.price-desc') },
                          { id: 'rating', label: t('products.sort.rating') }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                              sortBy === option.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {(searchQuery || brandFilter) && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm font-bold"
                >
                  <X size={16} />
                  {t('products.clearFilters')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-blue-600 animate-spin" />
            <p className="mt-4 text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <SearchIcon size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">{t('products.noResults')}</h2>
              <p className="text-gray-500">{t('products.noResultsSub')}</p>
            </div>
            <button 
              onClick={clearFilters}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              {t('products.viewAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
