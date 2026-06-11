'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeroSection from './HeroSection';
import CategoryGrid from './CategoryGrid';
import TrustSignals from './TrustSignals';
import FeaturedProducts from './FeaturedProducts';
import TrendingSuppliers from './TrendingSuppliers';
import QuickActions from './QuickActions';

export default function HomepageInteractive({ pageData }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'fr';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 py-6 mt-16">
        <HeroSection slides={pageData?.heroSlides} currentLanguage={currentLanguage} />
        <TrustSignals metrics={pageData?.trustMetrics} currentLanguage={currentLanguage} />
        <CategoryGrid categories={pageData?.categories} currentLanguage={currentLanguage} />
        <FeaturedProducts products={pageData?.featuredProducts} currentLanguage={currentLanguage} />
        <TrendingSuppliers suppliers={pageData?.trendingSuppliers} currentLanguage={currentLanguage} />
        <QuickActions actions={pageData?.quickActions} currentLanguage={currentLanguage} />
      </div>
    </div>
  );
}

HomepageInteractive.propTypes = {
  pageData: PropTypes?.shape({
    heroSlides: PropTypes?.array?.isRequired,
    trustMetrics: PropTypes?.array?.isRequired,
    categories: PropTypes?.array?.isRequired,
    featuredProducts: PropTypes?.array?.isRequired,
    trendingSuppliers: PropTypes?.array?.isRequired,
    quickActions: PropTypes?.array?.isRequired,
  })?.isRequired,
};