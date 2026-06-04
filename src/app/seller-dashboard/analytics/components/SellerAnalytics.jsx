'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const MONTHLY = [
  { month: 'Jan', revenue: 0, orders: 0 },
  { month: 'Fév', revenue: 0, orders: 0 },
  { month: 'Mar', revenue: 0, orders: 0 },
  { month: 'Avr', revenue: 0, orders: 0 },
  { month: 'Mai', revenue: 4500000, orders: 3 },
  { month: 'Juin', revenue: 6750000, orders: 5 },
  { month: 'Juil', revenue: 0, orders: 0 },
  { month: 'Aoû', revenue: 0, orders: 0 },
  { month: 'Sep', revenue: 0, orders: 0 },
  { month: 'Oct', revenue: 0, orders: 0 },
  { month: 'Nov', revenue: 0, orders: 0 },
  { month: 'Déc', revenue: 0, orders: 0 },
];

const TOP_PRODUCTS = [
  { name: 'LED Industriel 200W', sales: 50, revenue: 4500000, trend: '+12%' },
  { name: 'Chaise ergonomique', sales: 20, revenue: 1800000, trend: '+8%' },
  { name: 'Ciment 50kg', sales: 200, revenue: 3800000, trend: '+25%' },
];

export default function SellerAnalytics() {
  const [period, setPeriod] = useState('6m');

  const maxRevenue = Math.max(...MONTHLY.map(m => m.revenue), 1);
  const totalRevenue = MONTHLY.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = MONTHLY.reduce((s, m) => s + m.orders, 0);
  const hasData = totalRevenue > 0;

  const displayData = period === '3m' ? MONTHLY.slice(9) : period === '6m' ? MONTHLY.slice(6) : MONTHLY;

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
            <p className="text-sm text-muted-foreground">Vue d'ensemble de vos performances</p>
          </div>
          <select value={period} onChange={e => setPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
            <option value="3m">3 derniers mois</option>
            <option value="6m">6 derniers mois</option>
            <option value="1y">12 mois</option>
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Revenus totaux', value: `${(totalRevenue/1000000).toFixed(2)}M FCFA`, icon: 'CurrencyDollarIcon', color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Commandes', value: totalOrders, icon: 'ShoppingCartIcon', color: 'text-success', bg: 'bg-success/10' },
            { label: 'Panier moyen', value: totalOrders > 0 ? `${Math.round(totalRevenue/totalOrders).toLocaleString()} F` : '— F', icon: 'ChartBarIcon', color: 'text-accent', bg: 'bg-accent/10' },
            { label: 'Taux conversion', value: hasData ? '3.2%' : '—', icon: 'ArrowTrendingUpIcon', color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map((k, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon name={k.icon} size={18} className={k.color} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
              <p className="text-xl font-bold text-foreground">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Revenus mensuels (FCFA)</h2>
          {!hasData ? (
            <div className="h-40 flex flex-col items-center justify-center text-center">
              <Icon name="ChartBarIcon" size={32} className="text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Aucune donnée pour l'instant</p>
              <p className="text-xs text-muted-foreground">Les graphiques apparaîtront après vos premières ventes</p>
            </div>
          ) : (
            <div className="flex items-end gap-1.5 h-40 mt-2">
              {displayData.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full relative flex items-end justify-center" style={{ height: '120px' }}>
                    <div
                      className="w-full bg-primary rounded-t-sm hover:opacity-80 transition-smooth cursor-pointer group relative"
                      style={{ height: `${Math.max(4, (m.revenue / maxRevenue) * 100)}%` }}
                      title={`${m.month}: ${m.revenue.toLocaleString()} FCFA`}
                    >
                      {m.revenue > 0 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-smooth whitespace-nowrap z-10">
                          {(m.revenue/1000000).toFixed(1)}M
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Produits les plus vendus</h2>
          {!hasData ? (
            <div className="py-8 text-center">
              <Icon name="CubeIcon" size={28} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Données disponibles après vos premières ventes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {TOP_PRODUCTS.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sales} unités vendues</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{p.revenue.toLocaleString()} FCFA</p>
                    <p className="text-xs text-success">{p.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Traffic sources */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Sources de trafic</h2>
          {!hasData ? (
            <div className="py-8 text-center">
              <Icon name="GlobeAltIcon" size={28} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Données disponibles après activité sur votre boutique</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { source: 'Recherche Bimark', pct: 52 },
                { source: 'Accès direct', pct: 28 },
                { source: 'Recommandations', pct: 13 },
                { source: 'Réseaux sociaux', pct: 7 },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-foreground w-40 flex-shrink-0">{s.source}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-10 text-right">{s.pct}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
