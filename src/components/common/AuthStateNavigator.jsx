'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function AuthStateNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');
  const [shopName, setShopName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName') || '';
    const shop = localStorage.getItem('shopName') || '';
    setIsAuthenticated(authStatus);
    setUserRole(role);
    setUserName(name);
    setShopName(shop);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    setIsDropdownOpen(false);
    window.location.href = '/homepage';
  };

  const close = () => setIsDropdownOpen(false);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/user-login"
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth hidden sm:block">
          Connexion
        </Link>
        <Link href="/user-registration"
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth">
          S'inscrire
        </Link>
      </div>
    );
  }

  const dashboardLink = userRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
  const displayName = userRole === 'seller' ? (shopName || 'Ma Boutique') : (userName || 'Mon compte');
  const initial = displayName.charAt(0).toUpperCase();
  const roleLabel = userRole === 'buyer' ? 'Acheteur' : 'Vendeur';

  const menuItems = userRole === 'buyer'
    ? [
        { label: 'Tableau de bord', href: dashboardLink, icon: 'HomeIcon' },
        { label: 'Mes Commandes', href: '/buyer-dashboard/orders', icon: 'ShoppingCartIcon' },
        { label: 'Messages', href: '/buyer-dashboard/messages', icon: 'ChatBubbleLeftRightIcon' },
        { label: 'Mon Profil', href: '/profile', icon: 'UserCircleIcon' },
        { label: 'Paramètres', href: '/buyer-dashboard/settings', icon: 'Cog6ToothIcon' },
      ]
    : [
        { label: 'Tableau de bord', href: dashboardLink, icon: 'HomeIcon' },
        { label: 'Mes Produits', href: '/seller-dashboard/products', icon: 'CubeIcon' },
        { label: 'Commandes', href: '/seller-dashboard/orders', icon: 'ClipboardDocumentListIcon' },
        { label: 'Messages', href: '/seller-dashboard/messages', icon: 'ChatBubbleLeftRightIcon' },
        { label: 'Ma Boutique', href: '/seller-dashboard/settings', icon: 'BuildingStorefrontIcon' },
        { label: 'Mon Profil', href: '/profile', icon: 'UserCircleIcon' },
      ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-muted transition-smooth"
        aria-label="Menu utilisateur"
      >
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
          {initial}
        </div>
        <Icon name="ChevronDownIcon" size={14} className={`hidden sm:block text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[1050]" onClick={close} />

          <div className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-xl shadow-card z-[1100] animate-slide-in overflow-hidden">
            {/* User info header */}
            <div className="px-4 py-3 border-b border-border bg-muted/40">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {initial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{roleLabel} Bimark</p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              {menuItems.map(item => (
                <Link key={item.href} href={item.href} onClick={close}
                  className="flex items-center space-x-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-smooth">
                  <Icon name={item.icon} size={16} className="text-muted-foreground flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-border py-1">
              <button onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-smooth">
                <Icon name="ArrowRightOnRectangleIcon" size={16} className="flex-shrink-0" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
