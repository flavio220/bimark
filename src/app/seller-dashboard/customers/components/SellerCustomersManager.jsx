'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const DEMO_CUSTOMERS = [
  { id: 'CLT-001', name: 'Kolade Adeyemi', email: 'kolade@example.com', phone: '+229 01 90 00 00 01', country: 'Bénin', totalOrders: 3, totalSpent: 5400000, lastOrder: '2024-06-01', status: 'Actif' },
  { id: 'CLT-002', name: 'Fatou Diallo', email: 'fatou@example.com', phone: '+221 77 000 00 01', country: 'Sénégal', totalOrders: 5, totalSpent: 12700000, lastOrder: '2024-05-28', status: 'Actif' },
  { id: 'CLT-003', name: 'Ibrahim Traoré', email: 'ibrahim@example.com', phone: '+225 01 00 00 01 00', country: 'Côte d\'Ivoire', totalOrders: 2, totalSpent: 7600000, lastOrder: '2024-05-20', status: 'Actif' },
  { id: 'CLT-004', name: 'Amina Ouédraogo', email: 'amina@example.com', phone: '+226 70 00 00 01', country: 'Burkina Faso', totalOrders: 1, totalSpent: 950000, lastOrder: '2024-05-10', status: 'Inactif' },
  { id: 'CLT-005', name: 'Moussa Camara', email: 'moussa@example.com', phone: '+223 70 00 00 01', country: 'Mali', totalOrders: 4, totalSpent: 9200000, lastOrder: '2024-04-15', status: 'Inactif' },
];

export default function SellerCustomersManager() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    const stored = localStorage.getItem('bimark_seller_customers');
    setCustomers(stored ? JSON.parse(stored) : DEMO_CUSTOMERS);
  }, []);

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
      || c.email.toLowerCase().includes(search.toLowerCase())
      || c.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Tous' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const totalOrders  = customers.reduce((s, c) => s + c.totalOrders, 0);
  const activeCount  = customers.filter(c => c.status === 'Actif').length;

  if (selected) return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => setSelected(null)} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-smooth">
          <Icon name="ArrowLeftIcon" size={16} /><span>Retour aux clients</span>
        </button>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-start gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-xl flex-shrink-0">
              {selected.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
              <p className="text-sm text-muted-foreground">{selected.id}</p>
              <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${selected.status === 'Actif' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                {selected.status}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Coordonnées</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Icon name="EnvelopeIcon" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Icon name="PhoneIcon" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <a href={`tel:${selected.phone}`} className="text-sm text-primary hover:underline">{selected.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Icon name="GlobeAltIcon" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Pays</p>
                    <p className="text-sm text-foreground">{selected.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Statistiques</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Commandes', value: selected.totalOrders, icon: 'ShoppingCartIcon' },
                  { label: 'Total dépensé', value: `${selected.totalSpent.toLocaleString()} F`, icon: 'CurrencyDollarIcon' },
                  { label: 'Dernière commande', value: selected.lastOrder, icon: 'CalendarIcon' },
                ].map((s, i) => (
                  <div key={i} className="bg-muted rounded-lg p-3 text-center">
                    <Icon name={s.icon} size={18} className="text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
                    <p className="text-sm font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a href={`mailto:${selected.email}`}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                <Icon name="EnvelopeIcon" size={16} /><span>Envoyer un email</span>
              </a>
              <a href={`tel:${selected.phone}`}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth text-foreground">
                <Icon name="PhoneIcon" size={16} /><span>Appeler</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Mes Clients</h1>
        <p className="text-sm text-muted-foreground mb-6">{customers.length} client(s) enregistré(s)</p>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Clients actifs', value: activeCount, icon: 'UsersIcon', color: 'text-success' },
            { label: 'Commandes totales', value: totalOrders, icon: 'ShoppingCartIcon', color: 'text-primary' },
            { label: 'Revenus totaux', value: `${(totalRevenue / 1000000).toFixed(1)}M FCFA`, icon: 'CurrencyDollarIcon', color: 'text-accent' },
          ].map((k, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <Icon name={k.icon} size={20} className={`${k.color} mb-2`} />
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="text-lg font-bold text-foreground">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un client..."
              className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
            <option value="Tous">Tous les clients</option>
            <option value="Actif">Actifs</option>
            <option value="Inactif">Inactifs</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center">
            <Icon name="UsersIcon" size={36} className="text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Aucun client</h2>
            <p className="text-sm text-muted-foreground">Vos clients apparaîtront ici après vos premières ventes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(c => (
              <div key={c.id} onClick={() => setSelected(c)}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-card transition-smooth">
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary flex-shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground text-sm">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === 'Actif' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.email} · {c.country}</p>
                  <p className="text-xs text-muted-foreground">{c.totalOrders} commande(s) · Dernière: {c.lastOrder}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-primary">{c.totalSpent.toLocaleString()} FCFA</p>
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
