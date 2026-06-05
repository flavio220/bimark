'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import LanguageToggle from '@/components/common/LanguageToggle';
import AuthStateNavigator from '@/components/common/AuthStateNavigator';
import SearchIntegration from '@/components/common/SearchIntegration';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Accueil', href: '/homepage', icon: 'HomeIcon' },
    { label: 'Produits', href: '/product-search-results', icon: 'MagnifyingGlassIcon' },
    { label: 'Espace Acheteur', href: '/buyer-dashboard', icon: 'ShoppingCartIcon', requiresAuth: true },
    { label: 'Espace Vendeur', href: '/seller-dashboard', icon: 'BuildingStorefrontIcon', requiresAuth: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-[1000]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
              <Icon name="ShoppingBagIcon" size={24} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">Bimark</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-2xl mx-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth"
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <SearchIntegration />
            </div>
            <LanguageToggle />
            <ThemeToggle />
            <AuthStateNavigator />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <SearchIntegration />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-in">
            <nav className="px-4 py-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.href}
                  href={item?.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-smooth"
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
