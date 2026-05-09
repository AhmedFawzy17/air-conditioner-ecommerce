import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, ChevronRight, ChevronLeft, Check, Info, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/products';
import { ProductService } from '../api/ProductService';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isAr = i18n.language === 'ar';

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
        setSelectedImage(data.image);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 font-bold hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      image: product.image 
    });
    navigate('/checkout/shipping');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
            {t('common.home')}
          </button>
          <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Images */}
          <div className="space-y-6">
            <motion.div 
              layoutId={`product-image-${product.id}`}
              className="aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative group"
            >
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg">
                  {t('product.inStock')}
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                <ChevronRight size={24} className={isAr ? 'rotate-180' : ''} />
              </button>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`w-24 h-24 rounded-2xl border-2 transition-all flex-shrink-0 overflow-hidden bg-gray-50 ${
                    selectedImage === thumb ? 'border-blue-600 shadow-lg shadow-blue-50' : 'border-gray-100 hover:border-blue-200'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                  <Star size={16} className="text-yellow-400" fill="currentColor" />
                  <span className="text-sm font-bold text-yellow-700">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-400 font-medium underline cursor-pointer hover:text-blue-600">
                  {product.reviewCount} {t('product.reviews')}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-blue-600">
                  {product.price}
                </span>
                {product.discount && (
                  <span className="text-lg text-gray-400 line-through">
                    EGP {(product.priceValue / (1 - parseInt(product.discount) / 100)).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
                >
                  {t('product.buyNow')}
                </button>
                <button
                  onClick={() => addToCart({ 
                    id: product.id, 
                    title: product.title, 
                    price: product.price, 
                    image: product.image 
                  })}
                  className="flex-1 bg-white text-blue-600 border-2 border-blue-600 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={22} />
                  {t('product.addToCart')}
                </button>
              </div>

            {/* Tabs for Specs & Features */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex gap-8 mb-6 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-4 text-sm font-bold transition-all relative ${
                    activeTab === 'specs' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {t('product.specs')}
                  {activeTab === 'specs' && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`pb-4 text-sm font-bold transition-all relative ${
                    activeTab === 'features' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {t('product.features')}
                  {activeTab === 'features' && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'specs' ? (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-gray-500 font-medium">{spec.label}</span>
                        <span className="text-gray-900 font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-700">
                        <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Accessories Section */}
        <section className="mt-24 pt-16 border-t border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t('product.accessories')}</h2>
              <p className="text-gray-500 mt-2">{t('product.accessoriesSub')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.accessories.map((acc) => (
              <motion.div
                key={acc.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex gap-6 items-center"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-100">
                  <img src={acc.image} alt={acc.name} className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900">{acc.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{acc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
