import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import airConditioning from '../assets/air-conditioning.svg';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../api/AuthService';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const from = location.state?.from?.pathname || '/';
  const isRedirected = !!location.state?.from;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setErrors({});
      try {
        const response = await AuthService.login({ email, password });
        login(response);
        
        // Success redirect logic
        if (response.roles.includes('Admin')) {
          navigate('/dashboard');
        } else {
          navigate(from, { replace: true });
        }
      } catch (error) {
        setErrors({ general: error instanceof Error ? error.message : 'Invalid email or password.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] w-full grid grid-cols-2 gap-8 items-start mx-auto">
        
        {/* Login Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-50 flex flex-col items-center"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">{t('login.welcome')}</h1>
          
          {isRedirected && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-600 text-sm font-medium mb-6 text-center bg-blue-50 px-4 py-2 rounded-lg"
            >
              {t('login.loginRequired')}
            </motion.p>
          )}

          {errors.general && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-red-500 text-sm font-medium mb-6 text-center bg-red-50 px-4 py-2 rounded-lg border border-red-100"
            >
              {errors.general}
            </motion.p>
          )}
          
          <form onSubmit={handleSubmit} className="w-full space-y-5 mt-4">
            <div>
              <input
                type="text"
                placeholder={t('login.email')}
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm disabled:opacity-50`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder={t('login.password')}
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm disabled:opacity-50`}
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.password}</p>}
              <div className="text-end mt-2">
                <Link to="/forgot-password" title={t('login.forgotPassword')} className="text-xs text-blue-600 hover:underline font-semibold">
                  {t('login.forgotPassword')}
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-base hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('common.processing') || 'Processing...'}
                </>
              ) : (
                t('login.signIn')
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Section: Illustration and Create Account */}
        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-gray-50"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">{t('login.newCustomer')}</h2>
            <button 
              onClick={() => navigate('/signup')}
              className="w-full border-2 border-blue-600 text-blue-600 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all"
            >
              {t('login.createAccount')}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <img 
              src={airConditioning} 
              alt="Comfortable AC cooling" 
              className="rounded-2xl shadow-md w-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
            {/* Mimic the illustration's blue glow/stars if possible with CSS */}
            <div className="absolute inset-0 bg-blue-600/5 rounded-2xl pointer-events-none"></div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
