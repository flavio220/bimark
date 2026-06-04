'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const defaultActions = [
  { id: "search-products", label: "Chercher des produits", description: "Explorer le catalogue", icon: "MagnifyingGlassIcon" },
  { id: "request-quote", label: "Demander un devis", description: "Contacter fournisseurs", icon: "DocumentTextIcon" },
  { id: "track-orders", label: "Suivre mes commandes", description: "Statut des livraisons", icon: "TruckIcon" },
  { id: "messages", label: "Mes messages", description: "Contacter les vendeurs", icon: "ChatBubbleLeftRightIcon" },
];

export default function QuickActionsPanel({ onActionClick, actions }) {
  const items = actions || defaultActions;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((action) => (
        <button
          key={action.id}
          onClick={() => onActionClick?.(action.id)}
          className="bg-card border border-border rounded-lg p-4 text-left hover:border-primary/40 hover:shadow-card transition-smooth group"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-smooth">
            <Icon name={action.icon} size={20} className="text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">{action.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
        </button>
      ))}
    </div>
  );
}
QuickActionsPanel.propTypes = {
  onActionClick: PropTypes.func,
  actions: PropTypes.array,
};
