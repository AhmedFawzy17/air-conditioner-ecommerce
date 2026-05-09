import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

export const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="bg-white p-12 rounded-lg shadow-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Heart size={48} className="text-gray-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">{t('profile.myFavorites')}</h3>
        <p className="text-gray-500 mb-8">{t('profile.noOrders')}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('profile.shopNow')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">{t('profile.myFavorites')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <img 
                src={item.image || "https://picsum.photos/seed/ac-unit/400/300"} 
                alt={item.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => toggleFavorite(item)}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1 truncate">{item.title}</h4>
              <p className="text-blue-600 font-bold mb-4">{item.price}</p>
              <button 
                onClick={() => addToCart({ id: item.id, title: item.title, price: item.price, image: item.image })}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <ShoppingCart size={16} />
                {t('common.cart')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
