'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const DEMO_SUPPLIERS = [
  { id: 'SUP-001', name: 'TechSupply Co.', category: 'Électronique', country: 'Bénin', city: 'Cotonou', email: 'contact@techsupply.com', phone: '+229 01 50 00 00 01', rating: 4.9, orders: 2, verified: true, since: '2024-05-01' },
  { id: 'SUP-002', name: 'Mobilier Plus', category: 'Mobilier', country: 'Bénin', city: 'Porto-Novo', email: 'contact@mobilierplus.com', phone: '+229 01 40 00 00 02', rating: 4.6, orders: 1, verified: true, since: '2024-06-01' },
  { id: 'SUP-003', name: 'BatiMat Bénin', category: 'Bâtiment', country: 'Bénin', city: 'Cotonou', email: 'contact@batimat.com', phone: '+229 01 60 00 00 03', rating: 4.3, orders: 0, verified: false, since: '2024-05-15' },
];

export default function BuyerSuppliersManager() {
  const [suppliers, setSuppliers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('bimark_buyer_suppliers');
    setSuppliers(stored ? JSON.parse(stored) : DEMO_SUPPLIERS);
  }, []);

  const removeSupplier = (id) => {
    const updated = suppliers.filter(s => s.id !== id);
    setSuppliers(updated);
    localStorage.setItem('bimark_buyer_suppliers', JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => setSelected(null)} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-smooth">
          <Icon name="ArrowLeftIcon" size={16} /><span>Retour</span>
        </button>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-start gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary text-2xl flex-shrink-0">
              {selected.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
                {selected.verified && <Icon name="ShieldCheckIcon" size={16} className="text-success" />}
              </div>
              <p className="text-sm text-muted-foreground">{selected.category} · {selected.city}, {selected.country}</p>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => <Icon key={i} name="StarIcon" size={12} className={i <= Math.round(selected.rating) ? "text-accent" : "text-muted"} />)}
                <span className="text-xs text-muted-foreground ml-1">{selected.rating}/5</span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-foreground">{selected.orders}</p>
                <p className="text-xs text-muted-foreground">Commandes passées</p>
              </div>
              <div className="bg-muted rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-foreground">{selected.since}</p>
                <p className="text-xs text-muted-foreground">Client depuis</p>
              </div>
            </div>
            <div className="space-y-2">
              <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/70 transition-smooth">
                <Icon name="EnvelopeIcon" size={16} className="text-muted-foreground" />
                <span className="text-sm text-primary">{selected.email}</span>
              </a>
              <a href={`tel:${selected.phone}`} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/70 transition-smooth">
                <Icon name="PhoneIcon" size={16} className="text-muted-foreground" />
                <span className="text-sm text-primary">{selected.phone}</span>
              </a>
            </div>
            <div className="flex gap-3">
              <Link href="/buyer-dashboard/messages" className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                <Icon name="ChatBubbleLeftRightIcon" size={16} /><span>Envoyer un message</span>
              </Link>
              <Link href="/bulk-inquiry" className="flex-1 flex items-center justify-center space-x-2 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth text-foreground">
                <Icon name="DocumentTextIcon" size={16} /><span>Demander un devis</span>
              </Link>
            </div>
            <button onClick={() => removeSupplier(selected.id)} className="w-full flex items-center justify-center space-x-2 py-2 border border-error/30 text-error rounded-lg text-sm hover:bg-error/5 transition-smooth">
              <Icon name="TrashIcon" size={14} /><span>Retirer de mes fournisseurs</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Mes Fournisseurs</h1>
        <p className="text-sm text-muted-foreground mb-6">{suppliers.length} fournisseur(s) enregistré(s)</p>
        <div className="relative mb-5">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
            className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center">
            <Icon name="BuildingStorefrontIcon" size={36} className="text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Aucun fournisseur</h2>
            <p className="text-sm text-muted-foreground mb-5">Vos fournisseurs favoris apparaîtront ici.</p>
            <Link href="/product-search-results" className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth text-sm">
              <Icon name="MagnifyingGlassIcon" size={16} /><span>Trouver des fournisseurs</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(s => (
              <div key={s.id} onClick={() => setSelected(s)}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-card transition-smooth">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary text-lg flex-shrink-0">{s.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                    {s.verified && <Icon name="ShieldCheckIcon" size={13} className="text-success" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.category} · {s.city}, {s.country}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1,2,3,4,5].map(i => <Icon key={i} name="StarIcon" size={10} className={i <= Math.round(s.rating) ? "text-accent" : "text-muted"} />)}
                    <span className="text-[10px] text-muted-foreground ml-1">{s.rating}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">{s.orders} commande(s)</p>
                  <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
