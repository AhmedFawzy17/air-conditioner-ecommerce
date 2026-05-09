import React from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutSummary: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cartItems, totalPrice } = useCart();
  const isAr = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">{t('checkout.orderSummary')}</h2>
        
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('checkout.orderSummary')}</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0 p-2">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">{item.title}</h3>
                <p className="text-xs text-gray-400">{t('checkout.amount')} ({item.quantity})</p>
                <p className="text-blue-600 font-bold mt-1">EGP {(item.priceValue * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
