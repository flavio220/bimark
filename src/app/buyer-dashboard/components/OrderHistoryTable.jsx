'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const statusColor = {
  'Shipped': 'bg-primary/10 text-primary',
  'Delivered': 'bg-success/10 text-success',
  'Processing': 'bg-warning/10 text-warning',
  'Cancelled': 'bg-error/10 text-error',
};

export default function OrderHistoryTable({ orders = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Historique des commandes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{orders?.length || 0} commande(s)</p>
        </div>
        <Icon name="ClipboardDocumentListIcon" size={18} className="text-primary" />
      </div>
      {(!orders || orders.length === 0) ? (
        <div className="p-10 text-center">
          <Icon name="ShoppingCartIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">Aucune commande</p>
          <p className="text-xs text-muted-foreground">Votre historique de commandes apparaîtra ici</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {['N° Commande', 'Date', 'Fournisseur', 'Articles', 'Total', 'Statut'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order?.id} className="hover:bg-muted/50 transition-smooth">
                  <td className="px-4 py-3 font-medium text-foreground">{order?.orderNumber}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order?.date}</td>
                  <td className="px-4 py-3 text-foreground">{order?.supplier}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order?.itemCount}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{order?.total}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[order?.status] || 'bg-muted text-muted-foreground'}`}>
                      {order?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
OrderHistoryTable.propTypes = { orders: PropTypes.array };
