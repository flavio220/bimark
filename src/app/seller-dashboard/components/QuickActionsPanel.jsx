'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function QuickActionsPanel({ actions = [], onActionClick }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-base font-semibold text-foreground mb-4">Actions rapides</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick?.(action.id)}
            className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/40 hover:bg-muted/50 transition-smooth group text-center"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-smooth">
              <Icon name={action.icon} size={20} className="text-primary" />
            </div>
            <p className="text-xs font-semibold text-foreground">{action.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
QuickActionsPanel.propTypes = {
  actions: PropTypes.array,
  onActionClick: PropTypes.func,
};
