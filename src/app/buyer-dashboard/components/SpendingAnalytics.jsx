'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SpendingAnalytics({ data }) {
  const hasData = data?.monthlyData?.some(d => d.amount > 0);
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Analyse des dépenses</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { label: "Total dépensé", value: data?.totalSpent || "0 FCFA" },
            { label: "Commandes", value: data?.totalOrders || "0" },
            { label: "Valeur moyenne", value: data?.avgOrderValue || "0 FCFA" },
          ].map((s, i) => (
            <div key={i} className="bg-muted rounded-md p-3">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-sm font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      {!hasData ? (
        <div className="p-10 text-center">
          <Icon name="ChartBarIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">Aucune donnée de dépense</p>
          <p className="text-xs text-muted-foreground">Les statistiques de dépenses apparaîtront après vos premières commandes</p>
        </div>
      ) : (
        <div className="p-5 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" style={{ fontSize: '11px' }} />
              <YAxis style={{ fontSize: '11px' }} />
              <Tooltip />
              <Bar dataKey="amount" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
SpendingAnalytics.propTypes = { data: PropTypes.object };
