'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ActiveFilters({ filters, onRemoveFilter }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const translations = {
    en: {
      activeFilters: 'Active Filters',
      clearAll: 'Clear All',
      category: 'Category',
      priceRange: 'Price',
      location: 'Location',
      certification: 'Certification',
      shipping: 'Shipping',
      supplierType: 'Supplier Type'
    },
    fr: {
      activeFilters: 'Filtres actifs',
      clearAll: 'Tout effacer',
      category: 'Catégorie',
      priceRange: 'Prix',
      location: 'Localisation',
      certification: 'Certification',
      shipping: 'Expédition',
      supplierType: 'Type de fournisseur'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations?.[currentLanguage];

  const getActiveFilters = () => {
    const active = [];
    
    if (filters?.category) {
      active?.push({ type: 'category', label: t?.category, value: filters?.category });
    }
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      const priceLabel = `${filters?.priceRange?.min || '0'} - ${filters?.priceRange?.max || '∞'}`;
      active?.push({ type: 'priceRange', label: t?.priceRange, value: priceLabel });
    }
    if (filters?.location) {
      active?.push({ type: 'location', label: t?.location, value: filters?.location });
    }
    if (filters?.certification) {
      active?.push({ type: 'certification', label: t?.certification, value: filters?.certification });
    }
    if (filters?.shipping) {
      active?.push({ type: 'shipping', label: t?.shipping, value: filters?.shipping });
    }
    if (filters?.supplierType) {
      active?.push({ type: 'supplierType', label: t?.supplierType, value: filters?.supplierType });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">{t?.activeFilters}</h3>
        <button
          onClick={() => onRemoveFilter('all')}
          className="text-xs text-error hover:underline transition-smooth"
        >
          {t?.clearAll}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters?.map((filter, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm"
          >
            <span className="font-medium">{filter?.label}:</span>
            <span>{filter?.value}</span>
            <button
              onClick={() => onRemoveFilter(filter?.type)}
              className="ml-1 hover:text-error transition-smooth"
            >
              <Icon name="XMarkIcon" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

ActiveFilters.propTypes = {
  filters: PropTypes?.shape({
    category: PropTypes?.string,
    priceRange: PropTypes?.shape({
      min: PropTypes?.string,
      max: PropTypes?.string
    })?.isRequired,
    location: PropTypes?.string,
    certification: PropTypes?.string,
    shipping: PropTypes?.string,
    supplierType: PropTypes?.string
  })?.isRequired,
  onRemoveFilter: PropTypes?.func?.isRequired
};