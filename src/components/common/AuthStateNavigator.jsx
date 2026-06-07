'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useT } from '@/i18n/useTranslation';

export default function AuthStateNavigator() {
  const { t } = useT();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole]   = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const auth  = localStorage.getItem('isAuthenticated') === 'true';
    const role  = localStorage.getItem('userRole');
    const uname = localStorage.getItem('userName')  || '';
    const sname = localStorage.getItem('shopName')  || '';
    setIsAuthenticated(auth);
    setUserRole(role);
    setDisplayName(role === 'seller' ? sname || t('seller.myShop') : uname || t('nav.profile'));
  }, [t]);

  const handleLogout = () => {
    ['isAuthenticated','userRole','userEmail','userName','shopName'].forEach(k => localStorage.removeItem(k));
    setIsAuthenticated(false);
    setUserRole(null);
    setIsOpen(false);
    window.location.href = '/homepage';
  };

  if (!isAuthenticated) return (
    <div className="flex items-center space-x-2">
      <Link href="/user-login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth hidden sm:block">{t('nav.login')}</Link>
      <Link href="/user-registration" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth">{t('nav.register')}</Link>
    </div>
  );

  const dashLink = userRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';

  const menuItems = userRole === 'buyer' ? [
    { label: t('dashboard.overview'), href: dashLink,                        icon: 'HomeIcon' },
    { label: t('buyer.myOrders'),     href: '/buyer-dashboard/orders',       icon: 'ShoppingCartIcon' },
    { label: t('dashboard.messages'), href: '/buyer-dashboard/messages',     icon: 'ChatBubbleLeftRightIcon' },
    { label: t('nav.profile'),        href: '/profile',                      icon: 'UserCircleIcon' },
    { label: t('nav.settings'),       href: '/buyer-dashboard/settings',     icon: 'Cog6ToothIcon' },
  ] : [
    { label: t('dashboard.overview'), href: dashLink,                        icon: 'HomeIcon' },
    { label: t('seller.myProducts'),  href: '/seller-dashboard/products',    icon: 'CubeIcon' },
    { label: t('dashboard.orders'),   href: '/seller-dashboard/orders',      icon: 'ClipboardDocumentListIcon' },
    { label: t('dashboard.messages'), href: '/seller-dashboard/messages',    icon: 'ChatBubbleLeftRightIcon' },
    { label: t('seller.myShop'),      href: '/seller-dashboard/settings',    icon: 'BuildingStorefrontIcon' },
    { label: t('nav.profile'),        href: '/profile',                      icon: 'UserCircleIcon' },
  ];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-muted transition-smooth">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
          {displayName.charAt(0).toUpperCase() || 'U'}
        </div>
        <Icon name="ChevronDownIcon" size={14} className={`hidden sm:block text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[1050]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-xl shadow-card z-[1100] animate-slide-in overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole === 'buyer' ? t('auth.buyer') : t('auth.seller')} Bimark</p>
                </div>
              </div>
            </div>
            <div className="py-1">
              {menuItems.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-smooth">
                  <Icon name={item.icon} size={16} className="text-muted-foreground flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-border py-1">
              <button onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-smooth">
                <Icon name="ArrowRightOnRectangleIcon" size={16} className="flex-shrink-0" />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
