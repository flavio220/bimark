'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import OrderStatusCard from './OrderStatusCard';
import QuickActionsPanel from './QuickActionsPanel';
import OrderHistoryTable from './OrderHistoryTable';
import WishlistPanel from './WishlistPanel';
import SpendingAnalytics from './SpendingAnalytics';
import QuotationRequests from './Quotationrequests';
import RecommendedProducts from './RecommendedProducts';
import FavoriteSuppliers from './FavoriteSuppliers';
import NotificationCenter from './NotificationCenter';

export default function BuyerDashboardInteractive({ initialData }) {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated || userRole !== 'buyer') {
      router?.push('/user-login');
    }
  }, [router]);

  const handleQuickAction = (actionId) => {
    const actions = {
      'search-products': '/product-search-results',
      'request-quote': '/buyer-dashboard',
      'track-orders': '/buyer-dashboard/orders',
      'messages': '/buyer-dashboard/messages',
      'new-order': '/product-search-results',
      'quotation': '/buyer-dashboard',
      'suppliers': '/buyer-dashboard/suppliers',
    };
    if (actions?.[actionId]) router?.push(actions?.[actionId]);
  };

  const content = {
    en: { welcome: 'Welcome to Bimark', subtitle: "Here's an overview of your account" },
    fr: { welcome: 'Bienvenue sur Bimark', subtitle: "Voici un aperçu de votre compte acheteur" }
  };
  const text = content?.[currentLanguage] || content.fr;

  const isEmpty = !initialData?.recentOrders || initialData.recentOrders.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 py-8 lg:pl-72 mt-0">
        <div className="pt-16 pb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{text?.welcome}</h1>
          <p className="text-muted-foreground">{text?.subtitle}</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActionsPanel onActionClick={handleQuickAction} actions={initialData?.quickActions} />
        </div>

        {isEmpty ? (
          /* Empty state for new users */
          <div className="space-y-6">
            {/* Stats cards - zeroed */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Total dépensé", value: "0 FCFA", icon: "CurrencyDollarIcon" },
                { label: "Commandes", value: "0", icon: "ShoppingCartIcon" },
                { label: "Valeur moyenne", value: "0 FCFA", icon: "ChartBarIcon" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-5 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={stat.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty orders */}
            <div className="bg-card border border-border rounded-lg p-10 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShoppingCartIcon" size={30} className="text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Aucune commande pour l'instant</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Explorez notre catalogue pour trouver les produits dont vous avez besoin et passez votre première commande.
              </p>
              <Link
                href="/product-search-results"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
              >
                <Icon name="MagnifyingGlassIcon" size={18} />
                <span>Explorer les produits</span>
              </Link>
            </div>

            {/* Recommended Products */}
            <RecommendedProducts products={[]} />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Commandes récentes</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {initialData?.recentOrders?.map((order) => (
                  <OrderStatusCard key={order?.orderNumber} order={order} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-6">
                <OrderHistoryTable orders={initialData?.orderHistory} />
                <SpendingAnalytics data={initialData?.analytics} />
              </div>
              <div className="space-y-6">
                <WishlistPanel items={initialData?.wishlist} />
                <QuotationRequests requests={initialData?.quotations} />
              </div>
            </div>

            <div className="mb-8">
              <RecommendedProducts products={initialData?.recommendedProducts} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 lg:mb-8">
              <FavoriteSuppliers suppliers={initialData?.favoriteSuppliers} />
              <NotificationCenter notifications={initialData?.notifications} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

BuyerDashboardInteractive.propTypes = {
  initialData: PropTypes.object.isRequired
};
