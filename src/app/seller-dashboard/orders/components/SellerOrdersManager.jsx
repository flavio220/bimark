'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const STATUS_CONFIG = {
  'En attente':   { color: 'bg-warning/10 text-warning border-warning/20',   icon: 'ClockIcon' },
  'Confirmée':    { color: 'bg-primary/10 text-primary border-primary/20',   icon: 'CheckCircleIcon' },
  'Expédiée':     { color: 'bg-blue-500/10 text-blue-600 border-blue-200',   icon: 'TruckIcon' },
  'Livrée':       { color: 'bg-success/10 text-success border-success/20',   icon: 'CheckBadgeIcon' },
  'Annulée':      { color: 'bg-error/10 text-error border-error/20',         icon: 'XCircleIcon' },
};

const DEMO_ORDERS = [
  { id: 'CMD-0001', buyer: 'Kolade Adeyemi', email: 'kolade@example.com', phone: '+229 01 90 00 00 01', product: 'Chaise de bureau ergonomique', qty: 20, unit: 'unité', total: 1800000, status: 'En attente', date: '2024-06-01', address: 'Cotonou, Bénin', note: 'Livraison avant le 10 juin svp', tracking: '' },
  { id: 'CMD-0002', buyer: 'Fatou Diallo', email: 'fatou@example.com', phone: '+221 77 000 00 01', product: 'LED Industriel 200W', qty: 50, unit: 'unité', total: 4500000, status: 'Confirmée', date: '2024-05-28', address: 'Dakar, Sénégal', note: '', tracking: '' },
  { id: 'CMD-0003', buyer: 'Ibrahim Traoré', email: 'ibrahim@example.com', phone: '+225 01 00 00 01 00', product: 'Sac de ciment 50kg', qty: 200, unit: 'sac', total: 3800000, status: 'Expédiée', date: '2024-05-20', address: 'Abidjan, Côte d\'Ivoire', note: 'Entrepôt Zone 4', tracking: 'TRK-BJ-2024-0099' },
  { id: 'CMD-0004', buyer: 'Amina Ouédraogo', email: 'amina@example.com', phone: '+226 70 00 00 01', product: 'Tissu wax 6 yards', qty: 100, unit: 'pièce', total: 950000, status: 'Livrée', date: '2024-05-10', address: 'Ouagadougou, Burkina Faso', note: '', tracking: 'TRK-BJ-2024-0041' },
];

export default function SellerOrdersManager() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Toutes');
  const [search, setSearch] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bimark_seller_orders');
    setOrders(stored ? JSON.parse(stored) : DEMO_ORDERS);
  }, []);

  const persist = (list) => {
    setOrders(list);
    localStorage.setItem('bimark_seller_orders', JSON.stringify(list));
  };

  const updateStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    persist(updated);
    if (selected?.id === id) setSelected({ ...selected, status });
    flash();
  };

  const saveTracking = (id) => {
    if (!trackingInput.trim()) return;
    const updated = orders.map(o => o.id === id ? { ...o, tracking: trackingInput.trim(), status: 'Expédiée' } : o);
    persist(updated);
    if (selected?.id === id) setSelected({ ...selected, tracking: trackingInput.trim(), status: 'Expédiée' });
    setTrackingInput('');
    flash();
  };

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'Toutes' || o.status === filterStatus;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase())
      || o.buyer.toLowerCase().includes(search.toLowerCase())
      || o.product.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statusKeys = ['Toutes', ...Object.keys(STATUS_CONFIG)];

  if (selected) return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => setSelected(null)} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-smooth">
          <Icon name="ArrowLeftIcon" size={16} /><span>Retour aux commandes</span>
        </button>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>Commande mise à jour</span>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">{selected.id}</h2>
              <p className="text-sm text-muted-foreground">{selected.date}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${STATUS_CONFIG[selected.status]?.color}`}>
              {selected.status}
            </span>
          </div>

          <div className="p-5 space-y-5">
            {/* Buyer */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Informations client</p>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2"><Icon name="UserIcon" size={15} className="text-muted-foreground" /><span className="text-sm font-semibold text-foreground">{selected.buyer}</span></div>
                <div className="flex items-center space-x-2"><Icon name="EnvelopeIcon" size={15} className="text-muted-foreground" /><a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a></div>
                <div className="flex items-center space-x-2"><Icon name="PhoneIcon" size={15} className="text-muted-foreground" /><a href={`tel:${selected.phone}`} className="text-sm text-primary hover:underline">{selected.phone}</a></div>
                <div className="flex items-center space-x-2"><Icon name="MapPinIcon" size={15} className="text-muted-foreground" /><span className="text-sm text-foreground">{selected.address}</span></div>
              </div>
            </div>

            {/* Order details */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Détail de la commande</p>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Produit</span><span className="text-sm font-medium text-foreground">{selected.product}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Quantité</span><span className="text-sm font-medium text-foreground">{selected.qty} {selected.unit}</span></div>
                <div className="flex justify-between border-t border-border pt-2"><span className="text-sm font-semibold text-foreground">Total</span><span className="text-base font-bold text-primary">{selected.total.toLocaleString()} FCFA</span></div>
              </div>
            </div>

            {/* Note */}
            {selected.note && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Note du client</p>
                <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
                  <p className="text-sm text-foreground italic">"{selected.note}"</p>
                </div>
              </div>
            )}

            {/* Tracking */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Numéro de suivi / Tracking</p>
              {selected.tracking ? (
                <div className="flex items-center space-x-2 bg-success/10 border border-success/20 rounded-lg p-3">
                  <Icon name="TruckIcon" size={16} className="text-success" />
                  <span className="text-sm font-semibold text-success">{selected.tracking}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={trackingInput} onChange={e => setTrackingInput(e.target.value)}
                    placeholder="Ex: TRK-BJ-2024-XXXX"
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <button onClick={() => saveTracking(selected.id)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                    Ajouter
                  </button>
                </div>
              )}
            </div>

            {/* Status actions */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Changer le statut</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(STATUS_CONFIG).filter(s => s !== selected.status).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium border transition-smooth ${STATUS_CONFIG[s].color} hover:opacity-80`}>
                    <Icon name={STATUS_CONFIG[s].icon} size={15} />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Commandes reçues</h1>
            <p className="text-sm text-muted-foreground">{orders.length} commande(s) au total</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par ID, client, produit..."
              className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
            {statusKeys.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Status summary pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.entries(STATUS_CONFIG).map(([label, cfg]) => {
            const count = orders.filter(o => o.status === label).length;
            return (
              <button key={label} onClick={() => setFilterStatus(label === filterStatus ? 'Toutes' : label)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth ${filterStatus === label ? cfg.color : 'border-border text-muted-foreground hover:border-primary/30'}`}>
                <Icon name={cfg.icon} size={12} />
                <span>{label}</span>
                <span className="font-bold">({count})</span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center">
            <Icon name="ClipboardDocumentListIcon" size={36} className="text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Aucune commande</h2>
            <p className="text-sm text-muted-foreground">Les commandes de vos clients apparaîtront ici.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <div key={order.id} onClick={() => setSelected(order)}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-card transition-smooth">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold text-foreground">{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_CONFIG[order.status]?.color}`}>
                      {order.status}
                    </span>
                    {order.tracking && (
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200">🚚 {order.tracking}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{order.buyer} · {order.product}</p>
                  <p className="text-xs text-muted-foreground">{order.qty} {order.unit} · {order.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-bold text-primary">{order.total.toLocaleString()} FCFA</p>
                  <Icon name="ChevronRightIcon" size={16} className="text-muted-foreground ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
