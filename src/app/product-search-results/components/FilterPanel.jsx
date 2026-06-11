'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function FilterPanel({ onFilterChange, resultCount }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: '', max: '' },
    location: '',
    certification: '',
    shipping: '',
    supplierType: ''
  });
  const [isExpanded, setIsExpanded] = useState(true);

  const translations = {
    en: {
      filters: 'Filters',
      clearAll: 'Clear All',
      category: 'Category',
      priceRange: 'Price Range',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      location: 'Supplier Location',
      certification: 'Certification',
      shipping: 'Shipping Options',
      supplierType: 'Supplier Type',
      apply: 'Apply Filters',
      results: 'results found',
      allCategories: 'All Categories',
      allLocations: 'All Locations',
      allCertifications: 'All Certifications',
      allShipping: 'All Shipping',
      allSuppliers: 'All Suppliers'
    },
    fr: {
      filters: 'Filtres',
      clearAll: 'Tout effacer',
      category: 'Catégorie',
      priceRange: 'Gamme de prix',
      minPrice: 'Prix min',
      maxPrice: 'Prix max',
      location: 'Localisation du fournisseur',
      certification: 'Certification',
      shipping: 'Options d\'expédition',
      supplierType: 'Type de fournisseur',
      apply: 'Appliquer les filtres',
      results: 'résultats trouvés',
      allCategories: 'Toutes les catégories',
      allLocations: 'Tous les emplacements',
      allCertifications: 'Toutes les certifications',
      allShipping: 'Toutes les expéditions',
      allSuppliers: 'Tous les fournisseurs'
    }
  };

  const categories = [
    { value: 'electronics', label: { en: 'Electronics', fr: 'Électronique' } },
    { value: 'office', label: { en: 'Office Supplies', fr: 'Fournitures de bureau' } },
    { value: 'industrial', label: { en: 'Industrial Equipment', fr: 'Équipement industriel' } },
    { value: 'furniture', label: { en: 'Furniture', fr: 'Meubles' } },
    { value: 'safety', label: { en: 'Safety Equipment', fr: 'Équipement de sécurité' } }
  ];

  const locations = [
    { value: 'canada', label: { en: 'Canada', fr: 'Canada' } },
    { value: 'usa', label: { en: 'United States', fr: 'États-Unis' } },
    { value: 'france', label: { en: 'France', fr: 'France' } },
    { value: 'china', label: { en: 'China', fr: 'Chine' } }
  ];

  const certifications = [
    { value: 'iso9001', label: 'ISO 9001' },
    { value: 'ce', label: 'CE Certified' },
    { value: 'fda', label: 'FDA Approved' },
    { value: 'rohs', label: 'RoHS Compliant' }
  ];

  const shippingOptions = [
    { value: 'free', label: { en: 'Free Shipping', fr: 'Livraison gratuite' } },
    { value: 'express', label: { en: 'Express Delivery', fr: 'Livraison express' } },
    { value: 'international', label: { en: 'International', fr: 'International' } }
  ];

  const supplierTypes = [
    { value: 'manufacturer', label: { en: 'Manufacturer', fr: 'Fabricant' } },
    { value: 'distributor', label: { en: 'Distributor', fr: 'Distributeur' } },
    { value: 'wholesaler', label: { en: 'Wholesaler', fr: 'Grossiste' } }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations?.[currentLanguage];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...filters?.priceRange, [type]: value };
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category: '',
      priceRange: { min: '', max: '' },
      location: '',
      certification: '',
      shipping: '',
      supplierType: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="FunnelIcon" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">{t?.filters}</h2>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
            {resultCount} {t?.results}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearAll}
            className="text-sm text-muted-foreground hover:text-primary transition-smooth"
          >
            {t?.clearAll}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={20} />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.category}
            </label>
            <select
              value={filters?.category}
              onChange={(e) => handleFilterChange('category', e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              <option value="">{t?.allCategories}</option>
              {categories?.map((cat) => (
                <option key={cat?.value} value={cat?.value}>
                  {cat?.label?.[currentLanguage]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.priceRange}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder={t?.minPrice}
                value={filters?.priceRange?.min}
                onChange={(e) => handlePriceChange('min', e?.target?.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              />
              <input
                type="number"
                placeholder={t?.maxPrice}
                value={filters?.priceRange?.max}
                onChange={(e) => handlePriceChange('max', e?.target?.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.location}
            </label>
            <select
              value={filters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              <option value="">{t?.allLocations}</option>
              {locations?.map((loc) => (
                <option key={loc?.value} value={loc?.value}>
                  {loc?.label?.[currentLanguage]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.certification}
            </label>
            <select
              value={filters?.certification}
              onChange={(e) => handleFilterChange('certification', e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              <option value="">{t?.allCertifications}</option>
              {certifications?.map((cert) => (
                <option key={cert?.value} value={cert?.value}>
                  {cert?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.shipping}
            </label>
            <select
              value={filters?.shipping}
              onChange={(e) => handleFilterChange('shipping', e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              <option value="">{t?.allShipping}</option>
              {shippingOptions?.map((ship) => (
                <option key={ship?.value} value={ship?.value}>
                  {ship?.label?.[currentLanguage]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.supplierType}
            </label>
            <select
              value={filters?.supplierType}
              onChange={(e) => handleFilterChange('supplierType', e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              <option value="">{t?.allSuppliers}</option>
              {supplierTypes?.map((type) => (
                <option key={type?.value} value={type?.value}>
                  {type?.label?.[currentLanguage]}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

FilterPanel.propTypes = {
  onFilterChange: PropTypes?.func?.isRequired,
  resultCount: PropTypes?.number?.isRequired
};