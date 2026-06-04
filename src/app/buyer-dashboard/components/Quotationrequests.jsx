'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function QuotationRequests({ requests = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Demandes de devis</h3>
        <Icon name="DocumentTextIcon" size={18} className="text-primary" />
      </div>
      {(!requests || requests.length === 0) ? (
        <div className="p-8 text-center">
          <Icon name="DocumentTextIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium mb-1">Aucune demande de devis</p>
          <p className="text-xs text-muted-foreground">Vos demandes de devis aux fournisseurs apparaîtront ici</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {requests.map((r, i) => (
            <div key={i} className="p-4">
              <p className="text-sm font-medium text-foreground mb-1">{r.productName}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{r.requestId}</span>
                <span className={`px-2 py-0.5 rounded-full ${r.status === 'Responded' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
QuotationRequests.propTypes = { requests: PropTypes.array };
