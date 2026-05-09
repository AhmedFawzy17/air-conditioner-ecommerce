import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  email: string;
  address: string;
}

export const Addresses: React.FC = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Airselect', email: 'Airselect@gmail.com', address: 'Cairo, Egypt' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', email: '', address: '' });

  const handleAdd = () => {
    if (newAddress.name && newAddress.email && newAddress.address) {
      setAddresses([...addresses, { ...newAddress, id: Date.now().toString() }]);
      setNewAddress({ name: '', email: '', address: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">{t('profile.addressBook')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-gray-900">{t('profile.personalInfo')}</h4>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(addr.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{t('profile.name')}</p>
                <p className="font-medium">{addr.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{t('profile.email')}</p>
                <p className="font-medium">{addr.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{t('profile.addressInfo')}</p>
                <p className="font-medium">{addr.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder={t('profile.name')}
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder={t('profile.email')}
              value={newAddress.email}
              onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder={t('profile.addressInfo')}
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className="px-4 py-2 border rounded-md md:col-span-2"
            />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t('profile.save')}
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="px-6 py-2 border rounded-md hover:bg-gray-50"
            >
              {t('profile.cancel')}
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-gray-200 rounded-lg text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
        >
          <Plus size={20} />
          {t('profile.addAddress')}
        </button>
      )}
    </div>
  );
};
