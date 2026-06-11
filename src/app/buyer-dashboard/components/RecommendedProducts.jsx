'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function RecommendedProducts({ products = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Produits recommandés</h3>
        <Link href="/product-search-results" className="text-xs text-primary hover:underline">Voir tout</Link>
      </div>
      {(!products || products.length === 0) ? (
        <div className="p-8 text-center">
          <Icon name="SparklesIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">Des recommandations bientôt disponibles</p>
          <p className="text-xs text-muted-foreground mb-3">Explorez notre catalogue pour découvrir des produits</p>
          <Link href="/product-search-results" className="inline-flex items-center space-x-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:opacity-90 transition-smooth">
            <Icon name="MagnifyingGlassIcon" size={14} />
            <span>Explorer</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
          {products.map((p, i) => (
            <div key={i} className="border border-border rounded-md p-3 hover:border-primary/30 transition-smooth">
              <div className="w-full h-24 bg-muted rounded-md mb-2" />
              <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
              <p className="text-xs text-primary font-semibold">{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
RecommendedProducts.propTypes = { products: PropTypes.array };
