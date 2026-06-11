'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  const translations = {
    en: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of'
    },
    fr: {
      previous: 'Précédent',
      next: 'Suivant',
      page: 'Page',
      of: 'de'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations?.[currentLanguage];

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages?.push(i);
        }
        pages?.push('...');
        pages?.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages?.push(1);
        pages?.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages?.push(i);
        }
      } else {
        pages?.push(1);
        pages?.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages?.push(i);
        }
        pages?.push('...');
        pages?.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg shadow-card">
      <div className="text-sm text-muted-foreground">
        {t?.page} {currentPage} {t?.of} {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md bg-background text-foreground hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeftIcon" size={16} />
          <span className="hidden sm:inline">{t?.previous}</span>
        </button>

        <div className="flex items-center space-x-1">
          {pageNumbers?.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-md transition-smooth ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-background text-foreground hover:bg-muted border border-border'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md bg-background text-foreground hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">{t?.next}</span>
          <Icon name="ChevronRightIcon" size={16} />
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes?.number?.isRequired,
  totalPages: PropTypes?.number?.isRequired,
  onPageChange: PropTypes?.func?.isRequired
}