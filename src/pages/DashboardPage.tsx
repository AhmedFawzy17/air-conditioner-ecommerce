import React, { useEffect, useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Product } from '../types/products';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../api/ProductService';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <Link to="/products" className="text-blue-600 font-semibold hover:underline text-sm">See All</Link>
    </div>
    <div className="relative group">
      <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg border border-gray-100 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        <ChevronLeft size={24} />
      </button>
      <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg border border-gray-100 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        <ChevronRight size={24} />
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  </section>
);

export const DashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getProducts();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching dashboard products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Section title="Shop now">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </Section>

        <Section title="Recently available">
          {products.map(p => <ProductCard key={`recent-${p.id}`} product={p} />)}
        </Section>
      </div>
    </div>
  );
};
