'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import VerificationStatusBanner from './VerificationStatusBanner';
import QuickActionsPanel from './QuickActionsPanel';
import { useT } from '@/i18n/useTranslation';

const GREETINGS = { fr:'Bonjour', en:'Hello', es:'Hola', pt:'Olá', ar:'مرحباً', zh:'你好' };

export default function SellerDashboardInteractive({ initialData }) {
  const router = useRouter();
  const { t, lang } = useT();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shopName, setShopName] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    if (!isAuthenticated || userRole !== 'seller') { router.push('/user-login'); return; }
    const sp = localStorage.getItem('bimark_seller_products');
    const so = localStorage.getItem('bimark_seller_orders');
    const ss = localStorage.getItem('bimark_shop_settings');
    if (sp) setProducts(JSON.parse(sp));
    if (so) setOrders(JSON.parse(so));
    if (ss) setShopName(JSON.parse(ss).name || '');
    else setShopName(localStorage.getItem('shopName') || '');
  }, [router]);

  const handleQuickAction = (actionId) => {
    const map = { 'add-product':'/seller-dashboard/products', 'bulk-update':'/seller-dashboard/products', 'promotions':'/seller-dashboard/products', 'analytics':'/seller-dashboard/analytics' };
    if (map[actionId]) router.push(map[actionId]);
  };

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === (lang === 'en' ? 'Pending' : 'En attente')).length || orders.filter(o => o.status === 'En attente').length;
  const availableProducts = products.filter(p => p.available).length;

  const KPI_LABELS = {
    revenue: { fr:'Revenus totaux', en:'Total Revenue', es:'Ingresos totales', pt:'Receita total', ar:'إجمالي الإيرادات', zh:'总收入' },
    orders:  { fr:'Commandes reçues', en:'Orders received', es:'Pedidos recibidos', pt:'Pedidos recebidos', ar:'الطلبات المستلمة', zh:'收到的订单' },
    pending: { fr:'En attente', en:'Pending', es:'Pendientes', pt:'Pendentes', ar:'قيد الانتظار', zh:'待处理' },
    active:  { fr:'Produits actifs', en:'Active products', es:'Productos activos', pt:'Produtos ativos', ar:'المنتجات النشطة', zh:'有效产品' },
  };

  const kpis = [
    { label: KPI_LABELS.revenue[lang]||KPI_LABELS.revenue.fr, value: totalRevenue > 0 ? `${totalRevenue.toLocaleString()} FCFA` : '0 FCFA', icon: 'CurrencyDollarIcon', color: 'text-primary', bg: 'bg-primary/10', href: '/seller-dashboard/analytics' },
    { label: KPI_LABELS.orders[lang]||KPI_LABELS.orders.fr,   value: orders.length, icon: 'ClipboardDocumentListIcon', color: 'text-success', bg: 'bg-success/10', href: '/seller-dashboard/orders' },
    { label: KPI_LABELS.pending[lang]||KPI_LABELS.pending.fr, value: pendingOrders, icon: 'ClockIcon', color: 'text-warning', bg: 'bg-warning/10', href: '/seller-dashboard/orders' },
    { label: KPI_LABELS.active[lang]||KPI_LABELS.active.fr,   value: availableProducts, icon: 'CubeIcon', color: 'text-accent', bg: 'bg-accent/10', href: '/seller-dashboard/products' },
  ];

  const SHORTCUTS = [
    { labelKey:'seller.analytics',  href:'/seller-dashboard/analytics', icon:'ChartBarIcon' },
    { labelKey:'seller.customers',  href:'/seller-dashboard/customers', icon:'UsersIcon' },
    { labelKey:'dashboard.messages',href:'/seller-dashboard/messages',  icon:'ChatBubbleLeftRightIcon' },
    { labelKey:'seller.myShop',     href:'/seller-dashboard/settings',  icon:'BuildingStorefrontIcon' },
  ];

  const greeting = GREETINGS[lang] || GREETINGS.fr;
  const noOrders = { fr:'Aucune commande', en:'No orders', es:'Sin pedidos', pt:'Sem pedidos', ar:'لا توجد طلبات', zh:'暂无订单' };
  const noProducts = { fr:'Aucun produit', en:'No products', es:'Sin productos', pt:'Sem produtos', ar:'لا توجد منتجات', zh:'暂无产品' };
  const addProduct = { fr:'Ajouter un produit', en:'Add a product', es:'Agregar producto', pt:'Adicionar produto', ar:'إضافة منتج', zh:'添加产品' };

  return (
    <div className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">{greeting}, {shopName || 'Bimark'} 👋</h1>
        </div>

        <div className="mb-6">
          <VerificationStatusBanner status={initialData?.verificationStatus || 'pending'} expiryDate={initialData?.verificationExpiry} />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((k, i) => (
            <Link key={i} href={k.href} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-card transition-smooth">
              <div className={`w-10 h-10 ${k.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon name={k.icon} size={20} className={k.color} />
              </div>
              <p className="text-xs text-muted-foreground mb-0.5">{k.label}</p>
              <p className="text-xl font-bold text-foreground">{k.value}</p>
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <QuickActionsPanel actions={initialData?.quickActions} onActionClick={handleQuickAction} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">{t('dashboard.orders')}</h2>
              <Link href="/seller-dashboard/orders" className="text-xs text-primary hover:underline font-medium">{t('common.seeAll')}</Link>
            </div>
            {orders.length === 0 ? (
              <div className="p-8 text-center"><Icon name="ClipboardDocumentListIcon" size={28} className="text-muted-foreground mx-auto mb-2" /><p className="text-sm font-medium text-foreground">{noOrders[lang]||noOrders.fr}</p></div>
            ) : (
              <div className="divide-y divide-border">
                {orders.slice(0, 5).map(o => (
                  <Link key={o.id} href="/seller-dashboard/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-smooth">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{o.id} · {o.buyer}</p>
                      <p className="text-xs text-muted-foreground truncate">{o.product}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary">{o.total?.toLocaleString()} F</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${o.status==='Livrée'||o.status==='Delivered'?'bg-success/10 text-success':o.status==='En attente'||o.status==='Pending'?'bg-warning/10 text-warning':'bg-blue-100 text-blue-600'}`}>{o.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Products */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">{t('seller.myProducts')}</h2>
              <Link href="/seller-dashboard/products" className="text-xs text-primary hover:underline font-medium">{t('common.manage')}</Link>
            </div>
            {products.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="CubeIcon" size={28} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground mb-3">{noProducts[lang]||noProducts.fr}</p>
                <Link href="/seller-dashboard/products" className="inline-flex items-center space-x-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-smooth">
                  <Icon name="PlusIcon" size={14} /><span>{addProduct[lang]||addProduct.fr}</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {products.slice(0, 4).map(p => (
                  <Link key={p.id} href="/seller-dashboard/products" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-smooth">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {p.images?.[0] ? <img src={p.images[0].url} alt="" className="w-full h-full object-cover" /> : <Icon name="CubeIcon" size={16} className="text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{t('common.quantity')}: {p.stock} {p.unit}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-foreground">{parseInt(p.price||0).toLocaleString()} F</p>
                      <span className={`text-xs ${p.available?'text-success':'text-error'}`}>● {p.available?t('seller.available'):t('seller.unavailable')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SHORTCUTS.map((s, i) => (
            <Link key={i} href={s.href} className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center hover:border-primary/30 hover:shadow-card transition-smooth">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-2">
                <Icon name={s.icon} size={20} className="text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">{t(s.labelKey)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
