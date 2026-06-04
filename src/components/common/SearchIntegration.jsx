'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const SUGGESTIONS_FR = [
  'Chaises de bureau', 'Éclairage LED', 'Ciment', 'Tissu wax',
  'Câbles électriques', 'Cosmétiques', 'Alimentaire', 'Électronique',
  'Mobilier', 'Matériaux de construction', 'Agriculture', 'Informatique',
];
const SUGGESTIONS_EN = [
  'Office chairs', 'LED lighting', 'Cement', 'Electronics',
  'Cables', 'Cosmetics', 'Food products', 'Furniture',
  'Building materials', 'Agriculture', 'Computers', 'Clothing',
];

export default function SearchIntegration() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const [lang, setLang] = useState('fr');
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setLang(localStorage.getItem('language') || 'fr');
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setShowSugg(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 1) {
        const pool = lang === 'fr' ? SUGGESTIONS_FR : SUGGESTIONS_EN;
        const filtered = pool.filter(s => s.toLowerCase().includes(query.toLowerCase()));
        setSuggestions(filtered.slice(0, 5));
        setShowSugg(filtered.length > 0);
      } else {
        setSuggestions([]);
        setShowSugg(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query, lang]);

  const doSearch = (q) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setShowSugg(false);
    router.push(`/product-search-results?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div ref={ref} className="relative">
      <form onSubmit={e => { e.preventDefault(); doSearch(query); }}>
        <div className="relative w-full md:w-80">
          <Icon name="MagnifyingGlassIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query.length >= 1 && suggestions.length > 0 && setShowSugg(true)}
            onKeyDown={e => e.key === 'Escape' && setShowSugg(false)}
            placeholder={lang === 'fr' ? 'Rechercher des produits...' : 'Search products...'}
            className="w-full pl-10 pr-10 py-2 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); setSuggestions([]); setShowSugg(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth">
              <Icon name="XMarkIcon" size={14} />
            </button>
          )}
        </div>
      </form>

      {showSugg && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-card z-[1100] overflow-hidden animate-slide-in">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { setQuery(s); doSearch(s); }}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-smooth text-left">
              <Icon name="MagnifyingGlassIcon" size={14} className="text-muted-foreground flex-shrink-0" />
              <span>{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
