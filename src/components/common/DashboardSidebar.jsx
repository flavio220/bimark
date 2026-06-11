'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useT } from '@/i18n/useTranslation';

export default function DashboardSidebar({ userRole = 'buyer' }) {
  const pathname = usePathname();
  const { t } = useT();
  const [shopName, setShopName] = useState('');
  const [userName, setUserName]   = useState('');

  useEffect(() => {
    setShopName(localStorage.getItem('shopName') || t('seller.myShop'));
    setUserName(localStorage.getItem('userName')  || t('common.welcome'));
  }, [t]);

  const buyerNav = [
    { labelKey: 'dashboard.overview', href: '/buyer-dashboard',           icon: 'HomeIcon' },
    { labelKey: 'buyer.myOrders',     href: '/buyer-dashboard/orders',     icon: 'ShoppingCartIcon' },
    { labelKey: 'buyer.mySuppliers',  href: '/buyer-dashboard/suppliers',  icon: 'BuildingStorefrontIcon' },
    { labelKey: 'buyer.myFavorites',  href: '/buyer-dashboard/favorites',  icon: 'HeartIcon' },
    { labelKey: 'dashboard.messages', href: '/buyer-dashboard/messages',   icon: 'ChatBubbleLeftRightIcon' },
    { labelKey: 'nav.settings',       href: '/buyer-dashboard/settings',   icon: 'Cog6ToothIcon' },
  ];

  const sellerNav = [
    { labelKey: 'dashboard.overview', href: '/seller-dashboard',           icon: 'HomeIcon' },
    { labelKey: 'seller.myProducts',  href: '/seller-dashboard/products',  icon: 'CubeIcon' },
    { labelKey: 'dashboard.orders',   href: '/seller-dashboard/orders',    icon: 'ClipboardDocumentListIcon' },
    { labelKey: 'seller.analytics',   href: '/seller-dashboard/analytics', icon: 'ChartBarIcon' },
    { labelKey: 'seller.customers',   href: '/seller-dashboard/customers', icon: 'UsersIcon' },
    { labelKey: 'dashboard.messages', href: '/seller-dashboard/messages',  icon: 'ChatBubbleLeftRightIcon' },
    { labelKey: 'seller.myShop',      href: '/seller-dashboard/settings',  icon: 'BuildingStorefrontIcon' },
  ];

  const nav = userRole === 'buyer' ? buyerNav : sellerNav;
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-[100]">
        <div className="flex justify-around items-center h-16 px-1">
          {nav.slice(0, 5).map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center justify-center space-y-0.5 px-2 py-2 rounded-md transition-smooth min-w-[52px] ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}>
              <Icon name={item.icon} size={20} />
              <span className="text-[10px] font-medium leading-none">{t(item.labelKey).split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-[100]">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
              {(userRole === 'seller' ? shopName : userName).charAt(0).toUpperCase() || 'B'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {userRole === 'seller' ? shopName : userName}
              </p>
              <p className="text-xs text-muted-foreground">
                {userRole === 'seller' ? t('seller.verified') : t('auth.buyer')} Bimark
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="space-y-0.5">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${isActive(item.href) ? 'bg-primary text-primary-foreground shadow-subtle' : 'text-foreground hover:bg-muted hover:text-primary'}`}>
                <Icon name={item.icon} size={18} />
                <span>{t(item.labelKey)}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-3 border-t border-border space-y-0.5">
          <Link href="/profile"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth">
            <Icon name="UserCircleIcon" size={18} />
            <span>{t('nav.profile')}</span>
          </Link>
          <Link href="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth">
            <Icon name="Cog6ToothIcon" size={18} />
            <span>{t('nav.settings')}</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
