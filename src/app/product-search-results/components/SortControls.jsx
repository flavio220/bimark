'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function SortControls({ onSortChange, viewMode, onViewModeChange }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [sortBy, setSortBy] = useState('relevance');

  const translations = {
    en: {
      sortBy: 'Sort by',
      relevance: 'Relevance',
      priceLowHigh: 'Price: Low to High',
      priceHighLow: 'Price: High to Low',
      rating: 'Rating',
      newest: 'Newest',
      gridView: 'Grid View',
      listView: 'List View'
    },
    fr: {
      sortBy: 'Trier par',
      relevance: 'Pertinence',
      priceLowHigh: 'Prix: Bas à Élevé',
      priceHighLow: 'Prix: Élevé à Bas',
      rating: 'Évaluation',
      newest: 'Plus récent',
      gridView: 'Vue grille',
      listView: 'Vue liste'
    }
  };

  const sortOptions = [
    { value: 'relevance', label: 'relevance' },
    { value: 'price_asc', label: 'priceLowHigh' },
    { value: 'price_desc', label: 'priceHighLow' },
    { value: 'rating', label: 'rating' },
    { value: 'newest', label: 'newest' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations?.[currentLanguage];

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg shadow-card">
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-muted-foreground" />
        <label className="text-sm font-medium text-foreground whitespace-nowrap">
          {t?.sortBy}:
        </label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e?.target?.value)}
          className="flex-1 sm:flex-none px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        >
          {sortOptions?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {t?.[option?.label]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-md transition-smooth ${
            viewMode === 'grid' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
          }`}
          title={t?.gridView}
        >
          <Icon name="Squares2X2Icon" size={20} />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-md transition-smooth ${
            viewMode === 'list' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
          }`}
          title={t?.listView}
        >
          <Icon name="ListBulletIcon" size={20} />
        </button>
      </div>
    </div>
  );
}

SortControls.propTypes = {
  onSortChange: PropTypes?.func?.isRequired,
  viewMode: PropTypes?.oneOf(['grid', 'list'])?.isRequired,
  onViewModeChange: PropTypes?.func?.isRequired
};