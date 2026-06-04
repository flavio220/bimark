'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function BulkSelectionBar({ selectedCount, onClearSelection }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const translations = {
    en: {
      selected: 'selected',
      clearSelection: 'Clear Selection',
      requestQuote: 'Request Quote',
      compareProducts: 'Compare Products'
    },
    fr: {
      selected: 'sélectionné(s)',
      clearSelection: 'Effacer la sélection',
      requestQuote: 'Demander un devis',
      compareProducts: 'Comparer les produits'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations?.[currentLanguage];

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 bg-primary text-primary-foreground rounded-lg shadow-lg z-50 animate-slide-in">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full">
            <span className="text-sm font-bold">{selectedCount}</span>
          </div>
          <span className="text-sm font-medium">{t?.selected}</span>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={onClearSelection}
            className="flex-1 sm:flex-none px-4 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-md transition-smooth text-sm font-medium"
          >
            {t?.clearSelection}
          </button>
          <Link
            href="/bulk-inquiry"
            className="flex-1 sm:flex-none px-4 py-2 bg-primary-foreground text-primary rounded-md hover:opacity-90 transition-smooth text-sm font-medium text-center"
          >
            {t?.requestQuote}
          </Link>
          {selectedCount >= 2 && selectedCount <= 4 && (
            <Link
              href="/product-comparison"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-smooth text-sm font-medium"
            >
              <Icon name="ArrowsRightLeftIcon" size={16} />
              <span>{t?.compareProducts}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

BulkSelectionBar.propTypes = {
  selectedCount: PropTypes?.number?.isRequired,
  onClearSelection: PropTypes?.func?.isRequired
};