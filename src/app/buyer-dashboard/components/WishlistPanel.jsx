'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function WishlistPanel({ items = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Ma liste de souhaits</h3>
        <Icon name="HeartIcon" size={18} className="text-error" />
      </div>
      {(!items || items.length === 0) ? (
        <div className="p-8 text-center">
          <Icon name="HeartIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium mb-1">Liste vide</p>
          <p className="text-xs text-muted-foreground mb-3">Sauvegardez des produits qui vous intéressent</p>
          <Link href="/product-search-results" className="text-xs text-primary hover:underline">Parcourir les produits</Link>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i} className="p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-md flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
WishlistPanel.propTypes = { items: PropTypes.array };
