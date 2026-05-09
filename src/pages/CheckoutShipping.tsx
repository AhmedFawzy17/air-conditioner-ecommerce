import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCheckout } from '../context/CheckoutContext';
import { StepIndicator } from '../components/StepIndicator';
import { CheckoutSummary } from '../components/CheckoutSummary';

export const CheckoutShipping: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { shippingDetails, setShippingDetails } = useCheckout();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState(shippingDetails);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('checkout.errors.required');
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('checkout.errors.required');
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = t('checkout.errors.invalidPhone');
    }
    if (formData.altPhoneNumber.trim() && !/^\d{10,15}$/.test(formData.altPhoneNumber.trim())) {
      newErrors.altPhoneNumber = t('checkout.errors.invalidPhone');
    }
    if (!formData.address.trim()) newErrors.address = t('checkout.errors.required');
    if (!formData.buildingNumber.trim()) newErrors.buildingNumber = t('checkout.errors.required');
    if (!formData.floorNumber.trim()) newErrors.floorNumber = t('checkout.errors.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShippingDetails(formData);
      navigate('/checkout/payment');
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <StepIndicator currentStep={1} />
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('checkout.name')}*</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t('checkout.namePlaceholder')}
                    className={`w-full px-4 py-4 bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('checkout.phone')}*</label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder={t('checkout.phonePlaceholder')}
                      className={`w-full px-4 py-4 bg-white border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('checkout.altPhone')}</label>
                    <input
                      type="tel"
                      value={formData.altPhoneNumber}
                      onChange={(e) => setFormData({ ...formData, altPhoneNumber: e.target.value })}
                      placeholder={t('checkout.phonePlaceholder')}
                      className={`w-full px-4 py-4 bg-white border ${errors.altPhoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    />
                    {errors.altPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.altPhoneNumber}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{t('checkout.address')}*</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={t('checkout.addressPlaceholder')}
                    className={`w-full px-4 py-4 bg-white border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('checkout.building')}*</label>
                    <input
                      type="text"
                      value={formData.buildingNumber}
                      onChange={(e) => setFormData({ ...formData, buildingNumber: e.target.value })}
                      className={`w-full px-4 py-4 bg-white border ${errors.buildingNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    />
                    {errors.buildingNumber && <p className="text-red-500 text-xs mt-1">{errors.buildingNumber}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t('checkout.floor')}*</label>
                    <input
                      type="text"
                      value={formData.floorNumber}
                      onChange={(e) => setFormData({ ...formData, floorNumber: e.target.value })}
                      className={`w-full px-4 py-4 bg-white border ${errors.floorNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                    />
                    {errors.floorNumber && <p className="text-red-500 text-xs mt-1">{errors.floorNumber}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
              >
                {t('checkout.saveLocation')}
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
