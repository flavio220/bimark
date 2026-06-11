'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const DEMO_FAVS = [
  { id: 1, name: 'LED Industriel 200W', supplier: 'TechSupply Co.', price: '89 999 FCFA', category: 'Électronique', available: true, addedDate: '2024-05-10' },
  { id: 2, name: 'Chaise ergonomique Pro', supplier: 'Mobilier Plus', price: '90 000 FCFA', category: 'Mobilier', available: true, addedDate: '2024-05-15' },
  { id: 3, name: 'Ciment Portland 50kg', supplier: 'BatiMat Bénin', price: '19 000 FCFA', category: 'Bâtiment', available: false, addedDate: '2024-05-20' },
];

export default function BuyerFavoritesManager() {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('bimark_buyer_favorites');
    setFavorites(stored ? JSON.parse(stored) : DEMO_FAVS);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('bimark_buyer_favorites', JSON.stringify(updated));
  };

  const filtered = favorites.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) || f.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Mes Favoris</h1>
        <p className="text-sm text-muted-foreground mb-6">{favorites.length} produit(s) sauvegardé(s)</p>

        <div className="relative mb-5">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher dans mes favoris..."
            className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center">
            <Icon name="HeartIcon" size={36} className="text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">{favorites.length === 0 ? 'Aucun favori' : 'Aucun résultat'}</h2>
            <p className="text-sm text-muted-foreground mb-5">Sauvegardez des produits depuis le catalogue pour les retrouver ici.</p>
            <Link href="/product-search-results" className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth text-sm">
              <Icon name="MagnifyingGlassIcon" size={16} /><span>Parcourir les produits</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(f => (
              <div key={f.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-card transition-smooth">
                <div className="h-36 bg-muted flex items-center justify-center">
                  <Icon name="CubeIcon" size={36} className="text-muted-foreground" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight flex-1 pr-2">{f.name}</h3>
                    <button onClick={() => removeFavorite(f.id)} className="p-1 text-muted-foreground hover:text-error transition-smooth flex-shrink-0" title="Retirer des favoris">
                      <Icon name="HeartIcon" size={16} className="text-error" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{f.supplier}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-primary">{f.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${f.available ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                      {f.available ? 'Disponible' : 'Rupture'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/product-details" className="flex-1 flex items-center justify-center py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-smooth">
                      Voir
                    </Link>
                    <Link href="/bulk-inquiry" className="flex-1 flex items-center justify-center py-2 border border-border text-foreground rounded-lg text-xs font-medium hover:bg-muted transition-smooth">
                      Devis
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
