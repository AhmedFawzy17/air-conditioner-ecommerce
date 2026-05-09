import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export const ContactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            {t('contact.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  {t('contact.phone')}
                </label>
                <input
                  type="text"
                  placeholder={t('contact.phonePlaceholder')}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  required
                />
              </div>

              {/* Inquiry */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  {t('contact.inquiry')}
                </label>
                <input
                  type="text"
                  placeholder={t('contact.inquiryPlaceholder')}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                  required
                />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                {t('contact.department')}
              </label>
              <input
                type="text"
                placeholder={t('contact.departmentPlaceholder')}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                {t('contact.description')}
              </label>
              <textarea
                rows={6}
                placeholder={t('contact.descriptionPlaceholder')}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <button
                type="submit"
                className="bg-blue-600 text-white px-12 py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
              >
                {t('contact.submit')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
