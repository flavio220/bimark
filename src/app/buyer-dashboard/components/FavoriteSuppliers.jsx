'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function FavoriteSuppliers({ suppliers = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Fournisseurs favoris</h3>
        <Icon name="BuildingStorefrontIcon" size={18} className="text-primary" />
      </div>
      {(!suppliers || suppliers.length === 0) ? (
        <div className="p-8 text-center">
          <Icon name="BuildingStorefrontIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium mb-1">Aucun fournisseur favori</p>
          <p className="text-xs text-muted-foreground mb-3">Ajoutez des fournisseurs à vos favoris pour un accès rapide</p>
          <Link href="/product-search-results" className="text-xs text-primary hover:underline">Trouver des fournisseurs</Link>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {suppliers.map((s, i) => (
            <div key={i} className="p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="BuildingStorefrontIcon" size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
FavoriteSuppliers.propTypes = { suppliers: PropTypes.array };
