import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types/products';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../api/ProductService';
import homePhoto from '../assets/home-photo.png';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link to="/products" className="text-blue-600 text-sm font-semibold hover:underline">{t('home.seeAll')}</Link>
      </div>
      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
        >
          {React.Children.map(children, (child) => (
            <div className="snap-start">
              {child}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all z-10 border border-gray-100 hover:bg-blue-600 hover:text-white"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all z-10 border border-gray-100 hover:bg-blue-600 hover:text-white"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBrand = searchParams.get('brand');

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching home products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedBrand) return products;
    return products.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
  }, [products, selectedBrand]);

  const brandLogos: Record<string, string> = {
    carrier: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Carrier_logo.svg/2560px-Carrier_logo.svg.png',
    sharp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sharp_Logo.svg/2560px-Sharp_Logo.svg.png',
    lg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png',
    fresh: 'https://fresh.com.eg/images/logo.png',
    tornado: 'https://www.elarabygroup.com/media/wysiwyg/Tornado-Logo.png',
  };

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <AnimatePresence mode="wait">
        {!selectedBrand ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative h-[650px] overflow-hidden">
              <img 
                src={homePhoto} 
                alt="Comfortable Home" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
              <div className="relative max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col justify-center items-start">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-2xl space-y-8"
                >
                  <h1 className="text-6xl md:text-8xl font-serif text-gray-900 leading-tight">
                    {t('home.heroTitle')}
                  </h1>
                  <div className="flex gap-4">
                    <Link 
                      to="/"
                      className="inline-block bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95"
                    >
                      {t('home.shopNow')}
                    </Link>
                    <Link 
                      to="/signup"
                      className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all border border-blue-100 active:scale-95"
                    >
                      {t('signup.signUp')}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="brand-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b border-gray-100 py-12"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="h-16 w-40 flex items-center justify-center bg-gray-50 rounded-xl p-4">
                  <img 
                    src={brandLogos[selectedBrand] || `https://ui-avatars.com/api/?name=${selectedBrand}&background=f3f4f6&color=3b82f6&bold=true`}
                    alt={selectedBrand}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">{selectedBrand}</h1>
                  <p className="text-gray-500">Showing {filteredProducts.length} products</p>
                </div>
              </div>
              <button 
                onClick={() => setSearchParams({})}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
              >
                <X size={20} />
                Clear Filter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 font-medium">Loading comfort...</p>
        </div>
      ) : (
        <>
          {/* Shop Now Section */}
          <Section title={selectedBrand ? `${selectedBrand} Products` : t('home.shopNowSection')}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Section>

          {!selectedBrand && (
            <>
              {/* Recently Available Section */}
              <Section title={t('home.recentlyAvailable')}>
                {[...products].reverse().map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </Section>

              {/* Features Section */}
              <section className="bg-white py-20 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                      <Star size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Premium Quality</h3>
                    <p className="text-gray-500">Only the best brands and models for your ultimate comfort.</p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto">
                      <Heart size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Customer Favorite</h3>
                    <p className="text-gray-500">Highly rated by thousands of satisfied customers across the region.</p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                      <ShoppingCart size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Fast Delivery</h3>
                    <p className="text-gray-500">Quick and professional installation within 48 hours.</p>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
};
