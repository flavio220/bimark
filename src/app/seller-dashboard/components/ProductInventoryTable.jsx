'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function ProductInventoryTable({ products = [], onEditProduct }) {
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Rupture', color: 'text-error bg-error/10' };
    if (stock < 20) return { label: 'Stock bas', color: 'text-warning bg-warning/10' };
    return { label: 'En stock', color: 'text-success bg-success/10' };
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Inventaire produits</h3>
            <p className="text-sm text-muted-foreground">Gérez vos produits et niveaux de stock</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth">
            <Icon name="PlusIcon" size={20} />
            <span className="font-medium">Ajouter</span>
          </button>
        </div>
      </div>

      {(!products || products.length === 0) ? (
        <div className="p-12 text-center">
          <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CubeIcon" size={28} className="text-muted-foreground" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Aucun produit listé</h4>
          <p className="text-sm text-muted-foreground mb-4">Commencez à vendre en ajoutant votre premier produit.</p>
          <button className="inline-flex items-center space-x-2 px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth text-sm font-medium">
            <Icon name="PlusIcon" size={16} />
            <span>Ajouter un produit</span>
          </button>
        </div>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Produit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => {
                  const stockStatus = getStockStatus(product?.stock);
                  return (
                    <tr key={product?.id} className="hover:bg-muted/50 transition-smooth">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <AppImage src={product?.image} alt={product?.imageAlt} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{product?.name}</p>
                            <p className="text-xs text-muted-foreground">{product?.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-foreground">{product?.sku}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-foreground">{product?.stock}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-semibold text-foreground">{product?.price}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus?.color}`}>
                          {stockStatus?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => onEditProduct(product?.id)} className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-smooth">
                            <Icon name="PencilIcon" size={18} />
                          </button>
                          <button className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-smooth">
                            <Icon name="EyeIcon" size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden divide-y divide-border">
            {products.map((product) => {
              const stockStatus = getStockStatus(product?.stock);
              return (
                <div key={product?.id} className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <AppImage src={product?.image} alt={product?.imageAlt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground mb-1">{product?.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{product?.category}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${stockStatus?.color}`}>
                        {stockStatus?.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

ProductInventoryTable.propTypes = {
  products: PropTypes.array,
  onEditProduct: PropTypes.func,
};
