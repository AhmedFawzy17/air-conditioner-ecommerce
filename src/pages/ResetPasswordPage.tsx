import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import airConditioning from '../assets/air-conditioning.svg';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!password) {
      newErrors.password = t('signup.errors.passwordTooShort');
    } else {
      if (password.length < 8) {
        newErrors.password = t('signup.errors.passwordTooShort');
      } else if (!/\d/.test(password)) {
        newErrors.password = t('signup.errors.passwordNoNumber');
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = t('signup.errors.passwordNoSpecial');
      }
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = t('signup.errors.passwordsDontMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate successful password reset
      console.log('Password reset successfully');
      sessionStorage.removeItem('verificationCode');
      sessionStorage.removeItem('resetEmail');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start mx-auto">
        
        {/* Reset Password Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-50 flex flex-col items-center justify-center min-h-[450px]"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('resetPassword.title')}</h1>
          
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <input
                type="password"
                placeholder={t('resetPassword.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm`}
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-sm`}
              />
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500 ms-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100"
            >
              {t('resetPassword.button')}
            </button>
          </form>

          <Link 
            to="/login" 
            className="mt-8 text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors"
          >
            <span className="text-lg">←</span> {t('resetPassword.backToLogin')}
          </Link>
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
