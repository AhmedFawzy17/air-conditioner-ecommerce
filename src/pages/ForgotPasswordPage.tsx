import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import airConditioning from '../assets/air-conditioning.svg';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = () => {
    if (!email) {
      setError(t('forgotPassword.errors.invalidEmail'));
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('forgotPassword.errors.invalidEmail'));
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate sending code
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('resetEmail', email);
      sessionStorage.setItem('verificationCode', generatedCode);
      console.log('Generated Code:', generatedCode); // For testing purposes
      navigate('/verify-code');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start mx-auto">
        
        {/* Forgot Password Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-50 flex flex-col items-center justify-center min-h-[400px]"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('forgotPassword.title')}</h1>
          <p className="text-gray-500 mb-10 text-center">{t('forgotPassword.subtitle')}</p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <input
                type="text"
                placeholder={t('forgotPassword.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm`}
              />
              {error && <p className="mt-1.5 text-xs text-red-500 ms-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100"
            >
              {t('forgotPassword.button')}
            </button>
          </form>
        </motion.div>

        {/* Right Section: Illustration */}
        <div className="flex flex-col gap-8 justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <img 
              src={airConditioning} 
              alt="Comfortable AC cooling" 
              className="w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};
