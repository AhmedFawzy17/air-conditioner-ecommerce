import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCheckout } from '../context/CheckoutContext';
import { useCart } from '../context/CartContext';
import { StepIndicator } from '../components/StepIndicator';
import { CheckoutSummary } from '../components/CheckoutSummary';
import { motion } from 'motion/react';
import { OrderService } from '../api/OrderService';

export const CheckoutPayment: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { paymentDetails, shippingDetails, setPaymentDetails, resetCheckout } = useCheckout();
  const { cartItems, clearCart } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState(paymentDetails);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.cardholderName.trim()) newErrors.cardholderName = t('checkout.errors.required');
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = t('checkout.errors.required');
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = t('checkout.errors.invalidCard');
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = t('checkout.errors.required');
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = t('checkout.errors.invalidExpiry');
    }
    if (!formData.cvc.trim()) {
      newErrors.cvc = t('checkout.errors.required');
    } else if (!/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = t('checkout.errors.invalidCvc');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsProcessing(true);
      setPaymentDetails(formData);
      
      try {
        const orderItems = cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.priceValue
        }));

        await OrderService.createOrder({
          items: orderItems,
          shippingAddress: `${shippingDetails.address}, ${shippingDetails.building}, ${shippingDetails.floor}`,
          phone: shippingDetails.phone,
          paymentMethod: 'Credit Card'
        });

        setIsProcessing(false);
        clearCart();
        resetCheckout();
        navigate('/order-success');
      } catch (error) {
        console.error('Error creating order:', error);
        setErrors({ general: 'Failed to process order. Please try again.' });
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <StepIndicator currentStep={2} />
            
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium text-center">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('checkout.cardholderName')}*</label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                    className={`w-full px-4 py-4 bg-white border ${errors.cardholderName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('checkout.cardNumber')}*</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className={`w-full px-4 py-4 bg-white border ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('checkout.cvc')}*</label>
                  <input
                    type="text"
                    value={formData.cvc}
                    onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full px-4 py-4 bg-white border ${errors.cvc ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('checkout.expiryDate')}*</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-4 bg-white border ${errors.expiryDate ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="saveCard" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="saveCard" className="text-sm text-gray-500">{t('checkout.saveCard')}</label>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('checkout.processing')}
                  </>
                ) : (
                  t('checkout.payNow')
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};
