import React from 'react';
import { Search, User, ShoppingCart, Heart, ChevronDown, Globe } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Logo } from './Logo';
import { BackToTop } from './BackToTop';
import { SearchBar } from './SearchBar';
import { useTranslation } from 'react-i18next';
import { BrandsDropdown } from './BrandsDropdown';
import { useFavorites } from '../context/FavoritesContext';
import { AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [isBrandsOpen, setIsBrandsOpen] = React.useState(false);
  const brandsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isAdmin = user.roles.includes('Admin');

  const handleBrandsEnter = () => {
    if (brandsTimeoutRef.current) clearTimeout(brandsTimeoutRef.current);
    setIsBrandsOpen(true);
  };

  const handleBrandsLeave = () => {
    brandsTimeoutRef.current = setTimeout(() => {
      setIsBrandsOpen(false);
    }, 150);
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-800 text-white py-2 px-4 md:px-8 flex justify-between items-center text-xs font-medium">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ms-12"
        >
          <Globe size={14} />
          <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
        </button>
        <div className="flex items-center gap-8 me-12">
          <Link to="/contact" className="hover:underline">{t('common.contactUs')}</Link>
          <div className="w-[1px] h-3 bg-blue-400"></div>
          <Link to="/contact" className="hover:underline">{t('common.helpSupport')}</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size="sm" />
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Actions */}
        <div className="flex items-center gap-8 text-gray-500">
          {isLoggedIn ? (
            <Link to="/profile" className={`flex items-center gap-2 hover:text-blue-600 transition-colors group ${isActive('/profile') ? 'text-blue-600' : ''}`}>
              <User size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{t('profile.myAccount')}</span>
            </Link>
          ) : (
            <Link to="/login" className={`flex items-center gap-2 hover:text-blue-600 transition-colors group ${isActive('/login') ? 'text-blue-600' : ''}`}>
              <User size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{t('common.login')}</span>
            </Link>
          )}
          <Link to="/cart" className={`flex items-center gap-2 hover:text-blue-600 transition-colors group relative ${isActive('/cart') ? 'text-blue-600' : ''}`}>
            <div className="relative">
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">{t('common.cart')}</span>
          </Link>
          <Link to="/profile?tab=favorites" className={`flex items-center gap-2 hover:text-blue-600 transition-colors group relative ${location.search.includes('tab=favorites') ? 'text-blue-600' : ''}`}>
            <div className="relative">
              <Heart size={18} className="group-hover:scale-110 transition-transform" />
              {totalFavorites > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalFavorites}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">{t('common.favourite')}</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-center md:justify-start gap-0 py-0">
          <Link 
            to="/" 
            className={`px-12 py-2.5 font-semibold transition-all ${isActive('/') ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          >
            {t('common.home')}
          </Link>
          
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={handleBrandsEnter}
            onMouseLeave={handleBrandsLeave}
          >
            <div 
              onClick={() => setIsBrandsOpen(!isBrandsOpen)}
              className={`px-12 py-2.5 flex items-center gap-1 font-medium cursor-pointer transition-colors ${isBrandsOpen ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <span>{t('common.brands')}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isBrandsOpen ? 'rotate-180' : ''}`} />
            </div>

            <AnimatePresence>
              {isBrandsOpen && (
                <BrandsDropdown onClose={() => setIsBrandsOpen(false)} />
              )}
            </AnimatePresence>
          </div>

          {isAdmin && (
            <Link 
              to="/admin/products" 
              className={`px-12 py-2.5 font-semibold transition-all ${isActive('/admin/products') ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' : 'text-red-600 hover:text-red-700'}`}
            >
              Admin Products
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className="bg-blue-800 text-white pt-12 pb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* About Us */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t('common.aboutUs')}</h3>
          <p className="text-blue-100/80 leading-relaxed text-sm">
            {t('common.aboutText')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t('common.quickLinks')}</h3>
          <ul className="space-y-2 text-blue-100/80 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">{t('common.home')}</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">{t('common.brands')}</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">{t('common.shopNow')}</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">{t('common.contactUs')}</h3>
          <ul className="space-y-2 text-blue-100/80 text-sm">
            <li className="flex items-center gap-3">
              <span>{t('common.location')}</span>
            </li>
            <li className="flex items-center gap-3">
              <span>support@email.com</span>
            </li>
            <li className="flex items-center gap-3 tracking-wider">
              <span>+20 100 000 000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-blue-500/50 flex justify-center items-center text-xs font-medium text-blue-100/70">
        <p>{t('common.copyright')}</p>
        
      </div>
    </footer>
    
    {/* Floating Buttons */}
    <div className="fixed bottom-24 right-8 z-50 flex flex-col gap-4">
      <BackToTop />
    </div>
  </>
);
};
