import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Heart, Minus, Plus, ArrowRight, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cartItems, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  const isAr = i18n.language === 'ar';

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <Trash2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t('cart.empty')}</h2>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          {t('profile.shopNow')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('cart.title')} ({totalItems})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 hidden md:grid grid-cols-12 text-sm font-bold text-gray-500">
                <div className="col-span-6">{t('cart.product')}</div>
                <div className="col-span-3 text-center">{t('profile.price')}</div>
                <div className="col-span-3 text-end"></div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                      <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.title}</h3>
                        <div className="flex items-center gap-4 pt-2">
                          <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={20} />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 flex flex-col items-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-blue-600 rounded-md transition-all shadow-sm"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:text-blue-600 rounded-md transition-all shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 text-end">
                      <span className="text-blue-600 font-bold text-xl">
                        EGP {(item.priceValue * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-32 space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">{t('profile.latestOrder')}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-bold text-gray-900">EGP {totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t('cart.addCoupon')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  />
                  <button className={`absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-blue-600 hover:scale-110 transition-transform`}>
                    <Send size={18} />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xl font-bold text-gray-900">{t('cart.total')}</span>
                    <p className="text-xs text-gray-400">{t('cart.taxesIncluded')}</p>
                  </div>
                  <span className="text-3xl font-bold text-green-600">
                    EGP {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link 
                to="/checkout/shipping"
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-[0.98] block text-center"
              >
                {t('cart.checkout')}
              </Link>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500">{t('cart.weAccept')}</p>
                <div className="flex gap-4 items-center grayscale opacity-50">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
