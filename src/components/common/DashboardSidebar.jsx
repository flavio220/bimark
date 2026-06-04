'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function DashboardSidebar({ userRole = 'buyer' }) {
  const pathname = usePathname();
  const [shopName, setShopName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setShopName(localStorage.getItem('shopName') || 'Ma Boutique');
    setUserName(localStorage.getItem('userName') || 'Mon Compte');
  }, []);

  const buyerNav = [
    { label: 'Tableau de bord', href: '/buyer-dashboard', icon: 'HomeIcon' },
    { label: 'Mes Commandes', href: '/buyer-dashboard/orders', icon: 'ShoppingCartIcon' },
    { label: 'Mes Fournisseurs', href: '/buyer-dashboard/suppliers', icon: 'BuildingStorefrontIcon' },
    { label: 'Favoris', href: '/buyer-dashboard/favorites', icon: 'HeartIcon' },
    { label: 'Messages', href: '/buyer-dashboard/messages', icon: 'ChatBubbleLeftRightIcon' },
    { label: 'Paramètres', href: '/buyer-dashboard/settings', icon: 'Cog6ToothIcon' },
  ];

  const sellerNav = [
    { label: 'Tableau de bord', href: '/seller-dashboard', icon: 'HomeIcon' },
    { label: 'Mes Produits', href: '/seller-dashboard/products', icon: 'CubeIcon' },
    { label: 'Commandes', href: '/seller-dashboard/orders', icon: 'ClipboardDocumentListIcon' },
    { label: 'Statistiques', href: '/seller-dashboard/analytics', icon: 'ChartBarIcon' },
    { label: 'Clients', href: '/seller-dashboard/customers', icon: 'UsersIcon' },
    { label: 'Messages', href: '/seller-dashboard/messages', icon: 'ChatBubbleLeftRightIcon' },
    { label: 'Ma Boutique', href: '/seller-dashboard/settings', icon: 'Cog6ToothIcon' },
  ];

  const nav = userRole === 'buyer' ? buyerNav : sellerNav;
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-[100]">
        <div className="flex justify-around items-center h-16 px-1">
          {nav.slice(0, 5).map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center justify-center space-y-0.5 px-2 py-2 rounded-md transition-smooth min-w-[52px] ${
                isActive(item.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              }`}>
              <Icon name={item.icon} size={20} />
              <span className="text-[10px] font-medium leading-none">{item.label.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-[100]">
        {/* User/Shop identity */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
              {userRole === 'seller'
                ? (shopName.charAt(0) || 'B').toUpperCase()
                : (userName.charAt(0) || 'M').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {userRole === 'seller' ? shopName : userName}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole === 'seller' ? 'Vendeur Bimark' : 'Acheteur Bimark'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="space-y-0.5">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom quick links */}
        <div className="p-3 border-t border-border space-y-0.5">
          <Link href="/profile"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth">
            <Icon name="UserCircleIcon" size={18} />
            <span>Mon Profil</span>
          </Link>
          <Link href="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth">
            <Icon name="Cog6ToothIcon" size={18} />
            <span>Paramètres</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
