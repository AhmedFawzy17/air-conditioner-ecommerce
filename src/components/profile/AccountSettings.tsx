import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email] = useState('Airselect@gmail.com');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">{t('profile.accountSetting')}</h3>

      {message && (
        <div className={`p-4 rounded-md flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{t('profile.email')}</h4>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
          {/* Email change removed as per requirement */}
        </div>

        <hr className="my-8 border-gray-100" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{t('login.password')}</h4>
              <p className="text-sm text-gray-500">••••••••••••</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/forgot-password')}
            className="text-blue-600 font-medium hover:underline"
          >
            {t('profile.changePassword')}
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-lg font-bold mb-6">{t('profile.editProfile')}</h4>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.firstName')}*</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="Airselect" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.lastName')}*</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="" />
            </div>
          </div>
          <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            {t('profile.updateInfo')}
          </button>
        </form>
      </div>
    </div>
  );
};
