import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import airConditioning from '../assets/air-conditioning.svg';
import { AuthService } from '../api/AuthService';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const validate = () => {
    const newErrors: typeof errors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = t('signup.errors.invalidEmail') || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('signup.errors.invalidEmail') || 'Email format is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = t('signup.errors.passwordTooShort') || 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = t('signup.errors.passwordTooShort') || 'Minimum 6 characters';
    }

    // Confirm Password validation
    if (confirmPassword !== password) {
      newErrors.confirmPassword = t('signup.errors.passwordsDontMatch') || 'Passwords do not match';
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
        const response = await AuthService.register({ email, password, confirmPassword });
        login(response);
        
        // Success redirect logic
        if (response.roles.includes('Admin')) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        setErrors({ general: error instanceof Error ? error.message : 'Registration failed.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start mx-auto">
        
        {/* Signup Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-50 flex flex-col items-start"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-10">{t('signup.title')}</h1>

          {errors.general && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-red-500 text-sm font-medium mb-6 text-center bg-red-50 px-4 py-2 rounded-lg border border-red-100"
            >
              {errors.general}
            </motion.p>
          )}
          
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <input
                type="text"
                placeholder={t('signup.email')}
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm disabled:opacity-50`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder={t('signup.password')}
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm disabled:opacity-50`}
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder={t('signup.confirmPassword')}
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm disabled:opacity-50`}
              />
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('common.processing') || 'Processing...'}
                </>
              ) : (
                t('signup.signUp')
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Section: Login Prompt and Illustration */}
        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-gray-50"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{t('signup.alreadyHaveAccount')}</h2>
            <button 
              onClick={() => navigate('/login')}
              className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all"
            >
              {t('signup.login')}
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
              className="w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};
