import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../constants/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { i18n, t } = useTranslation();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const favorite = isFavorite(product.id);
  const { id, title, price, rating, discount, thumbnails, brand } = product;

  // Use the second image (remote) if hovered, otherwise the first (AC)
  const displayImage = isHovered && thumbnails.length > 1 ? thumbnails[1] : thumbnails[0];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/product/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 min-w-[280px] group relative transition-all duration-300 hover:shadow-xl cursor-pointer h-full"
    >
      {discount && (
        <div className={`absolute top-4 ${i18n.language === 'ar' ? 'right-4' : 'left-4'} bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10`}>
          {discount}
        </div>
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite({ id, title, price, rating, discount, image: thumbnails[0], brand });
        }}
        className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'} transition-colors z-10 ${favorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
      >
        <Heart size={20} fill={favorite ? "currentColor" : "none"} />
      </button>
      
      <div className="aspect-[4/3] bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img 
            key={displayImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={displayImage} 
            alt={title} 
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Visual indicator for image count */}
        {thumbnails.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {thumbnails.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  (isHovered ? idx === 1 : idx === 0) ? 'bg-blue-600 w-3' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 flex-grow">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 h-10 group-hover:text-blue-600 transition-colors">{title}</h3>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-xs font-bold text-gray-700">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-blue-600 font-bold text-lg">{price}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl">
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ id, title, price, image: thumbnails[0] });
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <ShoppingCart size={18} />
          {t('common.cart')}
        </motion.button>
      </div>
    </motion.div>
  );
};
