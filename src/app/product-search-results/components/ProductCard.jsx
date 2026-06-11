'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ProductCard({ product, viewMode, onWishlistToggle, onCompareToggle, isInWishlist, isInCompare }) {
  const [lang, setLang] = useState('fr');
  useEffect(() => { setLang(localStorage.getItem('language') || 'fr'); }, []);

  const t = {
    fr: { moq: 'QMC min.', wholesale: 'Prix gros', retail: 'Prix détail', verified: 'Fournisseur vérifié', inquiry: 'Demande en gros', view: 'Voir le produit', free: 'Livraison offerte', wishlist: isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris', compare: isInCompare ? 'Retirer' : 'Comparer' },
    en: { moq: 'MOQ', wholesale: 'Wholesale', retail: 'Retail', verified: 'Verified Supplier', inquiry: 'Bulk Inquiry', view: 'View Details', free: 'Free Shipping', wishlist: isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist', compare: isInCompare ? 'Remove' : 'Compare' },
  }[lang];

  const name = product?.name?.[lang] || product?.name?.fr || '';
  const desc = product?.description?.[lang] || product?.description?.fr || '';

  const formatPrice = (p) => {
    if (!p) return '—';
    return lang === 'fr'
      ? `${p.toLocaleString('fr-FR')} FCFA`
      : `$${p.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const Stars = ({ rating }) => (
    <div className="flex items-center space-x-0.5">
      {[1,2,3,4,5].map(i => (
        <Icon key={i} name="StarIcon" size={12} className={i <= Math.round(rating) ? 'text-accent' : 'text-muted'} />
      ))}
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-smooth overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-52 h-44 sm:h-auto overflow-hidden bg-muted flex-shrink-0">
            <AppImage src={product?.image} alt={product?.alt} className="w-full h-full object-cover" />
            {product?.freeShipping && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-success text-success-foreground text-xs font-medium rounded-md">{t.free}</span>
            )}
            {product?.verified && (
              <span className="absolute top-2 right-2 p-1.5 bg-primary rounded-full">
                <Icon name="CheckBadgeIcon" size={14} className="text-primary-foreground" />
              </span>
            )}
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground text-sm leading-snug">{name}</h3>
              <button onClick={() => onWishlistToggle?.(product?.id)} title={t.wishlist}
                className="flex-shrink-0 p-1.5 rounded-md hover:bg-muted transition-smooth">
                <Icon name="HeartIcon" size={16} className={isInWishlist ? 'text-error' : 'text-muted-foreground'} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{desc}</p>
            <div className="flex items-center space-x-2 mb-3">
              <Stars rating={product?.rating} />
              <span className="text-xs text-foreground font-medium">{product?.rating}</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">{t.wholesale}</p>
                <p className="text-base font-bold text-primary">{formatPrice(product?.wholesalePrice)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.retail}</p>
                <p className="text-sm font-medium text-foreground">{formatPrice(product?.retailPrice)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t.moq}</p>
                <p className="text-sm font-medium text-foreground">{product?.moq}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-auto">
              <Link href="/product-details" className="flex-1 flex items-center justify-center py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-smooth">
                {t.view}
              </Link>
              <Link href="/bulk-inquiry" className="flex-1 flex items-center justify-center py-2 border border-border text-foreground rounded-lg text-xs font-medium hover:bg-muted transition-smooth">
                {t.inquiry}
              </Link>
              <button onClick={() => onCompareToggle?.(product?.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-smooth ${isInCompare ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
                {t.compare}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-smooth overflow-hidden flex flex-col">
      <div className="relative h-44 overflow-hidden bg-muted">
        <AppImage src={product?.image} alt={product?.alt} className="w-full h-full object-cover" />
        {product?.freeShipping && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-success text-success-foreground text-xs font-medium rounded-md">{t.free}</span>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {product?.verified && (
            <span className="p-1.5 bg-primary rounded-full block">
              <Icon name="CheckBadgeIcon" size={13} className="text-primary-foreground" />
            </span>
          )}
          <button onClick={() => onWishlistToggle?.(product?.id)} title={t.wishlist}
            className="p-1.5 bg-card/90 rounded-full hover:bg-card transition-smooth">
            <Icon name="HeartIcon" size={13} className={isInWishlist ? 'text-error' : 'text-muted-foreground'} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2">{name}</h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{desc}</p>

        <div className="flex items-center space-x-1.5 mb-3">
          <Stars rating={product?.rating} />
          <span className="text-xs text-foreground font-medium">{product?.rating}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-muted rounded-lg p-2">
            <p className="text-[10px] text-muted-foreground mb-0.5">{t.wholesale}</p>
            <p className="text-sm font-bold text-primary">{formatPrice(product?.wholesalePrice)}</p>
          </div>
          <div className="bg-muted rounded-lg p-2">
            <p className="text-[10px] text-muted-foreground mb-0.5">{t.moq}</p>
            <p className="text-sm font-bold text-foreground">{product?.moq} u.</p>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <Link href="/product-details" className="flex-1 flex items-center justify-center py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-smooth">
            {t.view}
          </Link>
          <Link href="/bulk-inquiry" className="flex-1 flex items-center justify-center py-2 border border-border text-foreground rounded-lg text-xs font-semibold hover:bg-muted transition-smooth">
            {t.inquiry}
          </Link>
        </div>

        <button onClick={() => onCompareToggle?.(product?.id)}
          className={`mt-2 w-full py-1.5 rounded-lg text-xs font-medium border transition-smooth ${isInCompare ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
          {t.compare}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  viewMode: PropTypes.string,
  onWishlistToggle: PropTypes.func,
  onCompareToggle: PropTypes.func,
  isInWishlist: PropTypes.bool,
  isInCompare: PropTypes.bool,
};
