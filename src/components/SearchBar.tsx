import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const newHistory = [
      searchTerm,
      ...history.filter((item) => item !== searchTerm)
    ].slice(0, 4);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    saveToHistory(searchTerm);
    setIsOpen(false);
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const removeHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const newHistory = history.filter((h) => h !== item);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="flex-1 max-w-xl relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={t('common.searchPlaceholder')}
          className="w-full ps-6 pe-12 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm placeholder:text-gray-400"
        />
        <button type="submit" className={`absolute ${i18n.language === 'ar' ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors`}>
          <Search size={18} />
        </button>
      </form>

      <AnimatePresence>
        {isOpen && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100]"
          >
            <div className="p-2">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {t('common.recentSearches')}
              </div>
              {history.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setQuery(item);
                    handleSearch(item);
                  }}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group rounded-xl"
                >
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm font-medium group-hover:text-blue-600">{item}</span>
                  </div>
                  <button
                    onClick={(e) => removeHistoryItem(e, item)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
