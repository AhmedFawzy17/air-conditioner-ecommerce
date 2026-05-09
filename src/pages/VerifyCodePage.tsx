import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import airConditioning from '../assets/air-conditioning.svg';

export const VerifyCodePage: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const email = sessionStorage.getItem('resetEmail') || 'Airselect@gmail.com';
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    const storedCode = sessionStorage.getItem('verificationCode');

    if (enteredCode === storedCode) {
      navigate('/reset-password');
    } else {
      setError(t('verifyCode.error'));
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('verificationCode', newCode);
    console.log('New Generated Code:', newCode);
    
    setResendSuccess(true);
    setTimer(30);
    setTimeout(() => setResendSuccess(false), 5000);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start mx-auto">
        
        {/* Verify Code Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-14 rounded-2xl shadow-md border border-gray-50 flex flex-col items-center justify-center min-h-[450px]"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('verifyCode.title')}</h1>
          <p className="text-gray-500 mb-8 text-center">
            {t('verifyCode.subtitle', { email })}
          </p>

          {error && <p className="mb-4 text-sm text-red-500 font-bold flex items-center gap-1">
            <span className="inline-block w-4 h-4 border border-red-500 rounded-full text-[10px] flex items-center justify-center">!</span>
            {error}
          </p>}
          
          <div className="flex gap-2 mb-10">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-12 h-16 text-center text-2xl font-bold border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all`}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 mb-6"
          >
            {t('verifyCode.button')}
          </button>

          {!resendSuccess ? (
            <p className="text-sm text-gray-600">
              {t('verifyCode.resendText')}{' '}
              <button 
                onClick={handleResend}
                className={`text-blue-600 font-bold hover:underline ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {t('verifyCode.resendLink')}
              </button>
            </p>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-bold flex items-center justify-center gap-2 mb-1">
                <span className="text-lg">✓</span> {t('verifyCode.successMessage')}
              </p>
              <p className="text-xs text-gray-500">{t('verifyCode.resendWait')}</p>
            </div>
          )}
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
