'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import VerificationStatusBanner from './VerificationStatusBanner';
import QuickActionsPanel from './QuickActionsPanel';

export default function SellerDashboardInteractive({ initialData }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shopName, setShopName] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    if (!isAuthenticated || userRole !== 'seller') {
      router.push('/user-login');
      return;
    }
    // Load real data from localStorage
    const storedProducts = localStorage.getItem('bimark_seller_products');
    const storedOrders = localStorage.getItem('bimark_seller_orders');
    const storedShop = localStorage.getItem('bimark_shop_settings');

    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedShop) {
      const shop = JSON.parse(storedShop);
      setShopName(shop.name || '');
    } else {
      setShopName(localStorage.getItem('shopName') || '');
    }
  }, [router]);

  const handleQuickAction = (actionId) => {
    const map = {
      'add-product': '/seller-dashboard/products',
      'bulk-update': '/seller-dashboard/products',
      'promotions': '/seller-dashboard/products',
      'analytics': '/seller-dashboard/analytics',
    };
    if (map[actionId]) router.push(map[actionId]);
  };

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'En attente').length;
  const availableProducts = products.filter(p => p.available).length;

  const kpis = [
    { label: 'Revenus totaux', value: totalRevenue > 0 ? `${totalRevenue.toLocaleString()} FCFA` : '0 FCFA', icon: 'CurrencyDollarIcon', color: 'text-primary', bg: 'bg-primary/10', href: '/seller-dashboard/analytics' },
    { label: 'Commandes reçues', value: orders.length, icon: 'ClipboardDocumentListIcon', color: 'text-success', bg: 'bg-success/10', href: '/seller-dashboard/orders' },
    { label: 'En attente', value: pendingOrders, icon: 'ClockIcon', color: 'text-warning', bg: 'bg-warning/10', href: '/seller-dashboard/orders' },
    { label: 'Produits actifs', value: availableProducts, icon: 'CubeIcon', color: 'text-accent', bg: 'bg-accent/10', href: '/seller-dashboard/products' },
  ];

  const recentOrders = orders.slice(0, 5);
  const recentProducts = products.slice(0, 4);

  return (
    <div className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Bonjour, {shopName || 'Bienvenue'} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Voici un aperçu de votre boutique Bimark</p>
        </div>

        {/* Verification banner */}
        <div className="mb-6">
          <VerificationStatusBanner status={initialData?.verificationStatus || 'pending'} expiryDate={initialData?.verificationExpiry} />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((k, i) => (
            <Link key={i} href={k.href}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-card transition-smooth">
              <div className={`w-10 h-10 ${k.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon name={k.icon} size={20} className={k.color} />
              </div>
              <p className="text-xs text-muted-foreground mb-0.5">{k.label}</p>
              <p className="text-xl font-bold text-foreground">{k.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mb-6">
          <QuickActionsPanel actions={initialData?.quickActions} onActionClick={handleQuickAction} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Commandes récentes</h2>
              <Link href="/seller-dashboard/orders" className="text-xs text-primary hover:underline font-medium">Voir tout</Link>
            </div>
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="ClipboardDocumentListIcon" size={28} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground mb-1">Aucune commande</p>
                <p className="text-xs text-muted-foreground">Les commandes apparaîtront ici</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentOrders.map(o => (
                  <Link key={o.id} href="/seller-dashboard/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-smooth">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{o.id} · {o.buyer}</p>
                      <p className="text-xs text-muted-foreground truncate">{o.product}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary">{o.total.toLocaleString()} F</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        o.status === 'Livrée' ? 'bg-success/10 text-success' :
                        o.status === 'En attente' ? 'bg-warning/10 text-warning' :
                        o.status === 'Expédiée' ? 'bg-blue-100 text-blue-600' :
                        'bg-muted text-muted-foreground'
                      }`}>{o.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Products overview */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Mes produits</h2>
              <Link href="/seller-dashboard/products" className="text-xs text-primary hover:underline font-medium">Gérer</Link>
            </div>
            {recentProducts.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="CubeIcon" size={28} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground mb-1">Aucun produit</p>
                <p className="text-xs text-muted-foreground mb-4">Ajoutez votre premier produit</p>
                <Link href="/seller-dashboard/products"
                  className="inline-flex items-center space-x-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-smooth">
                  <Icon name="PlusIcon" size={14} /><span>Ajouter un produit</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentProducts.map(p => (
                  <Link key={p.id} href="/seller-dashboard/products"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-smooth">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {p.images?.[0]
                        ? <img src={p.images[0].url} alt="" className="w-full h-full object-cover" />
                        : <Icon name="CubeIcon" size={16} className="text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Stock: {p.stock} {p.unit}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">{parseInt(p.price || 0).toLocaleString()} F</p>
                      <span className={`text-xs ${p.available ? 'text-success' : 'text-error'}`}>
                        {p.available ? '● Actif' : '● Inactif'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Statistiques', href: '/seller-dashboard/analytics', icon: 'ChartBarIcon' },
            { label: 'Clients', href: '/seller-dashboard/customers', icon: 'UsersIcon' },
            { label: 'Messages', href: '/seller-dashboard/messages', icon: 'ChatBubbleLeftRightIcon' },
            { label: 'Ma Boutique', href: '/seller-dashboard/settings', icon: 'BuildingStorefrontIcon' },
          ].map((s, i) => (
            <Link key={i} href={s.href}
              className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center hover:border-primary/30 hover:shadow-card transition-smooth">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-2">
                <Icon name={s.icon} size={20} className="text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
