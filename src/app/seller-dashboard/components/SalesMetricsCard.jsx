'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const METRICS_CONFIG = [
  { key: 0, title: 'Revenus totaux', icon: 'CurrencyDollarIcon', color: 'text-primary', bg: 'bg-primary/10' },
  { key: 1, title: 'Commandes', icon: 'ShoppingCartIcon', color: 'text-success', bg: 'bg-success/10' },
  { key: 2, title: 'Produits actifs', icon: 'CubeIcon', color: 'text-accent', bg: 'bg-accent/10' },
  { key: 3, title: 'Panier moyen', icon: 'ChartBarIcon', color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function SalesMetricsCard({ metrics = [] }) {
  const safeMetrics = METRICS_CONFIG.map((cfg, i) => ({
    ...cfg,
    value: metrics[i]?.value || '0',
    change: metrics[i]?.change || '0%',
    trend: metrics[i]?.trend || 'up',
  }));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {safeMetrics.map((metric, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-4">
          <div className={`w-10 h-10 ${metric.bg} rounded-lg flex items-center justify-center mb-3`}>
            <Icon name={metric.icon} size={20} className={metric.color} />
          </div>
          <p className="text-xs text-muted-foreground mb-1">{metric.title}</p>
          <p className="text-xl font-bold text-foreground">{metric.value}</p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon
              name={metric.trend === 'up' ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'}
              size={12}
              className={metric.trend === 'up' ? 'text-success' : 'text-error'}
            />
            <span className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
              {metric.change}
            </span>
            <span className="text-xs text-muted-foreground">vs mois préc.</span>
          </div>
        </div>
      ))}
    </div>
  );
}

SalesMetricsCard.propTypes = {
  metrics: PropTypes.array,
};
