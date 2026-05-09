import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../../api/OrderService';
import { OrderResponse } from '../../types/products';

export const Orders: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await OrderService.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white p-12 rounded-lg shadow-sm text-center flex justify-center">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white p-12 rounded-lg shadow-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Package size={48} className="text-gray-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">{t('profile.myOrders')}</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{t('profile.noOrders')}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t('profile.shopNow')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold">{t('profile.myOrders')}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">{t('profile.orderId')}</th>
              <th className="px-6 py-4 font-medium">{t('cart.product')}</th>
              <th className="px-6 py-4 font-medium">{t('profile.price')}</th>
              <th className="px-6 py-4 font-medium">{t('profile.status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-blue-600">#{order.id.substring(0, 8)}</td>
                <td className="px-6 py-4">
                  {order.items.map(item => item.productName || 'AC Unit').join(', ')}
                </td>
                <td className="px-6 py-4">EGP {order.totalPrice.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' || order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
