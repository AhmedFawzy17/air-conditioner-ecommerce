import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2 } from 'lucide-react';

interface ProfileInfoProps {
  user: {
    name: string;
    email: string;
    address: string;
  };
  onUpdate: (data: { name: string; address: string }) => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onUpdate }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.name.split(' ')[0] || '',
    lastName: user.name.split(' ')[1] || '',
    address: user.address
  });

  const handleSave = () => {
    onUpdate({
      name: `${formData.firstName} ${formData.lastName}`,
      address: formData.address
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">{t('profile.editProfile')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('profile.firstName')}
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('profile.lastName')}
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.addressInfo')}
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('profile.updateInfo')}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t('profile.cancel')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-900">{t('profile.personalInfo')}</h3>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 flex items-center gap-1 text-sm font-medium hover:underline"
            >
              {t('profile.edit')}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">{t('profile.name')}</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.email')}</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-900">{t('profile.addressInfo')}</h3>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-600 flex items-center gap-1 text-sm font-medium hover:underline"
            >
              {t('profile.edit')}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">{t('profile.name')}</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.email')}</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold mb-4 text-left">{t('profile.latestOrder')}</h3>
        <div className="py-12">
          <p className="text-gray-500 mb-6">{t('profile.noOrders')}</p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            {t('profile.shopNow')}
          </button>
        </div>
      </div>
    </div>
  );
};
