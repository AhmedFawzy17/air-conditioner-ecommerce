import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccess: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center space-y-8"
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle size={64} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{t('checkout.successTitle')}</h1>
          <p className="text-gray-500">{t('checkout.successSubtitle')}</p>
        </div>

        <div className="pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
          >
            {t('profile.shopNow')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
