'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const priorityConfig = {
  high: { label: 'Urgent', color: 'text-error bg-error/10' },
  medium: { label: 'Normal', color: 'text-warning bg-warning/10' },
  low: { label: 'Faible', color: 'text-success bg-success/10' },
};

export default function PendingOrdersPanel({ orders = [], onViewOrder }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Commandes en attente</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{orders?.length || 0} commande(s)</p>
        </div>
        <Icon name="ClipboardDocumentListIcon" size={20} className="text-primary" />
      </div>

      {(!orders || orders.length === 0) ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="ClipboardDocumentListIcon" size={22} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Aucune commande en attente</p>
          <p className="text-xs text-muted-foreground">Les nouvelles commandes apparaîtront ici</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {orders.map((order) => {
            const priority = priorityConfig[order?.priority] || priorityConfig.low;
            return (
              <div key={order?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{order?.orderNumber}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priority.color}`}>{priority.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{order?.customer}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{order?.items} article(s) · {order?.total}</span>
                  <button
                    onClick={() => onViewOrder?.(order?.id)}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Voir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

PendingOrdersPanel.propTypes = {
  orders: PropTypes.array,
  onViewOrder: PropTypes.func,
};
