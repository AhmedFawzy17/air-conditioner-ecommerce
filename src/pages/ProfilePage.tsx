import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Package, MapPin, Heart, Settings, LogOut, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { Orders } from '../components/profile/Orders';
import { Addresses } from '../components/profile/Addresses';
import { Favorites } from '../components/profile/Favorites';
import { AccountSettings } from '../components/profile/AccountSettings';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { UserService, UserProfile } from '../api/UserService';

type Tab = 'profile' | 'orders' | 'addresses' | 'favorites' | 'settings';

export const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout, user: authUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [user, setUser] = useState<UserProfile>({
    id: authUser.userId || '',
    fullName: authUser.fullName || 'User',
    email: authUser.email || '',
    address: localStorage.getItem('address') || 'Cairo, Egypt'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await UserService.getProfile();
        setUser(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();

    const tab = searchParams.get('tab');
    if (tab && ['profile', 'orders', 'addresses', 'favorites', 'settings'].includes(tab)) {
      setActiveTab(tab as Tab);
    }
  }, [searchParams]);

  const isRTL = i18n.language === 'ar';

  const handleUpdateUser = async (data: { name: string; address: string }) => {
    try {
      const updated = await UserService.updateProfile({ fullName: data.name, address: data.address });
      setUser(updated);
      localStorage.setItem('fullName', updated.fullName);
      localStorage.setItem('address', updated.address || '');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const menuItems = [
    { id: 'profile', label: t('profile.myAccount'), icon: User },
    { id: 'orders', label: t('profile.myOrders'), icon: Package },
    { id: 'addresses', label: t('profile.addressBook'), icon: MapPin },
    { id: 'favorites', label: t('profile.myFavorites'), icon: Heart },
    { id: 'settings', label: t('profile.accountSetting'), icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
      </div>
    );
  }

  const profileUser = {
    name: user.fullName,
    email: user.email,
    address: user.address || ''
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('profile.hello', { name: profileUser.name })}
                </h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id as Tab)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className="text-lg">{item.label}</span>
                      </button>
                    </li>
                  ))}
                  <li className="pt-4 mt-4 border-t border-gray-100">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut size={22} />
                      <span className="text-lg">{t('common.logout')}</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'profile' && <ProfileInfo user={profileUser} onUpdate={handleUpdateUser} />}
                {activeTab === 'orders' && <Orders />}
                {activeTab === 'addresses' && <Addresses />}
                {activeTab === 'favorites' && <Favorites />}
                {activeTab === 'settings' && <AccountSettings />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};
