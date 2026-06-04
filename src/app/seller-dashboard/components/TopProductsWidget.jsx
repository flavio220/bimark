'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function TopProductsWidget({ products = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Top produits</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Meilleures ventes</p>
        </div>
        <Icon name="StarIcon" size={20} className="text-accent" />
      </div>

      {(!products || products.length === 0) ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="ChartBarIcon" size={22} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Aucune donnée</p>
          <p className="text-xs text-muted-foreground">Les produits populaires s'afficheront ici après vos premières ventes</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {products.slice(0, 4).map((product, index) => (
            <div key={product?.id} className="p-4 flex items-center space-x-3">
              <span className="text-sm font-bold text-muted-foreground w-5">{index + 1}</span>
              <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <AppImage src={product?.image} alt={product?.imageAlt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{product?.name}</p>
                <p className="text-xs text-muted-foreground">{product?.sales} ventes</p>
              </div>
              <span className="text-xs font-semibold text-success">{product?.growth}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

TopProductsWidget.propTypes = {
  products: PropTypes.array,
};
