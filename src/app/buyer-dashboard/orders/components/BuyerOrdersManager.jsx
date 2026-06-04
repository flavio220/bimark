'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const STATUS_CONFIG = {
  'En attente':  { color: 'bg-warning/10 text-warning border-warning/20',   icon: 'ClockIcon', step: 1 },
  'Confirmée':   { color: 'bg-primary/10 text-primary border-primary/20',   icon: 'CheckCircleIcon', step: 2 },
  'Expédiée':    { color: 'bg-blue-500/10 text-blue-600 border-blue-200',   icon: 'TruckIcon', step: 3 },
  'Livrée':      { color: 'bg-success/10 text-success border-success/20',   icon: 'CheckBadgeIcon', step: 4 },
  'Annulée':     { color: 'bg-error/10 text-error border-error/20',         icon: 'XCircleIcon', step: 0 },
};

const DEMO = [
  { id: 'CMD-0001', supplier: 'TechSupply Co.', supplierEmail: 'techsupply@example.com', product: 'LED Industriel 200W', qty: 50, unit: 'unité', total: 4500000, status: 'Expédiée', date: '2024-05-28', tracking: 'TRK-BJ-2024-0099', address: 'Cotonou, Bénin', note: '' },
  { id: 'CMD-0002', supplier: 'Mobilier Plus', supplierEmail: 'mobilierplus@example.com', product: 'Chaise de bureau ergonomique', qty: 20, unit: 'unité', total: 1800000, status: 'En attente', date: '2024-06-01', tracking: '', address: 'Cotonou, Bénin', note: 'Livraison avant le 15 juin' },
];

export default function BuyerOrdersManager() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Toutes');
  const [search, setSearch] = useState('');
  const [cancelConfirm, setCancelConfirm] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('bimark_buyer_orders');
    setOrders(stored ? JSON.parse(stored) : DEMO);
  }, []);

  const persist = (list) => {
    setOrders(list);
    localStorage.setItem('bimark_buyer_orders', JSON.stringify(list));
  };

  const cancelOrder = (id) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: 'Annulée' } : o);
    persist(updated);
    setCancelConfirm(null);
    if (selected?.id === id) setSelected({ ...selected, status: 'Annulée' });
  };

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'Toutes' || o.status === filterStatus;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase())
      || o.supplier.toLowerCase().includes(search.toLowerCase())
      || o.product.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const STEPS = ['En attente', 'Confirmée', 'Expédiée', 'Livrée'];

  if (selected) return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => setSelected(null)} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-smooth">
          <Icon name="ArrowLeftIcon" size={16} /><span>Retour aux commandes</span>
        </button>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">{selected.id}</h2>
              <p className="text-sm text-muted-foreground">{selected.date}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${STATUS_CONFIG[selected.status]?.color}`}>{selected.status}</span>
          </div>

          <div className="p-5 space-y-5">
            {/* Progress bar */}
            {selected.status !== 'Annulée' && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Suivi de commande</p>
                <div className="flex items-center">
                  {STEPS.map((step, i) => {
                    const currentStep = STATUS_CONFIG[selected.status]?.step || 0;
                    const done = i + 1 <= currentStep;
                    const active = i + 1 === currentStep;
                    return (
                      <div key={step} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-smooth ${done ? 'bg-primary border-primary' : 'bg-card border-border'}`}>
                            {done
                              ? <Icon name="CheckIcon" size={14} className="text-primary-foreground" />
                              : <div className={`w-2 h-2 rounded-full ${active ? 'bg-primary' : 'bg-border'}`} />}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1 w-14 text-center leading-tight">{step}</p>
                        </div>
                        {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mb-5 mx-1 ${i + 1 < currentStep ? 'bg-primary' : 'bg-border'}`} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tracking */}
            {selected.tracking && (
              <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <Icon name="TruckIcon" size={16} className="text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Numéro de suivi</p>
                  <p className="text-sm font-bold text-blue-600">{selected.tracking}</p>
                </div>
              </div>
            )}

            {/* Supplier */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Fournisseur</p>
              <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="BuildingStorefrontIcon" size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{selected.supplier}</p>
                  <a href={`mailto:${selected.supplierEmail}`} className="text-xs text-primary hover:underline">{selected.supplierEmail}</a>
                </div>
                <a href={`mailto:${selected.supplierEmail}`}
                  className="p-2 border border-border rounded-lg hover:bg-card transition-smooth text-muted-foreground">
                  <Icon name="EnvelopeIcon" size={14} />
                </a>
              </div>
            </div>

            {/* Order detail */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Détail</p>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Produit</span><span className="text-sm font-medium text-foreground">{selected.product}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Quantité</span><span className="text-sm font-medium text-foreground">{selected.qty} {selected.unit}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Livraison</span><span className="text-sm font-medium text-foreground">{selected.address}</span></div>
                <div className="flex justify-between border-t border-border pt-2"><span className="text-sm font-semibold">Total</span><span className="text-base font-bold text-primary">{selected.total.toLocaleString()} FCFA</span></div>
              </div>
            </div>

            {/* Actions */}
            {selected.status === 'En attente' && (
              <button onClick={() => setCancelConfirm(selected.id)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 border border-error text-error rounded-lg text-sm font-medium hover:bg-error/10 transition-smooth">
                <Icon name="XMarkIcon" size={16} /><span>Annuler la commande</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {cancelConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full animate-slide-in">
            <h3 className="font-semibold text-foreground mb-2">Annuler la commande ?</h3>
            <p className="text-sm text-muted-foreground mb-4">Cette action ne peut pas être annulée.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelConfirm(null)} className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth">Garder</button>
              <button onClick={() => cancelOrder(cancelConfirm)} className="flex-1 py-2.5 bg-error text-white rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Mes Commandes</h1>
        <p className="text-sm text-muted-foreground mb-6">{orders.length} commande(s)</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
              className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
            <option value="Toutes">Toutes</option>
            {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center">
            <Icon name="ShoppingCartIcon" size={36} className="text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Aucune commande</h2>
            <p className="text-sm text-muted-foreground mb-5">Vos commandes apparaîtront ici après vos achats.</p>
            <Link href="/product-search-results" className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth text-sm">
              <Icon name="MagnifyingGlassIcon" size={16} /><span>Explorer les produits</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(o => (
              <div key={o.id} onClick={() => setSelected(o)}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-card transition-smooth">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold text-foreground">{o.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_CONFIG[o.status]?.color}`}>{o.status}</span>
                    {o.tracking && <span className="text-xs text-blue-600">🚚 En route</span>}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{o.supplier} · {o.product}</p>
                  <p className="text-xs text-muted-foreground">{o.qty} {o.unit} · {o.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-bold text-primary">{o.total.toLocaleString()} FCFA</p>
                  <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
