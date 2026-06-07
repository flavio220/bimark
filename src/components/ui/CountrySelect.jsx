'use client';

import { useState, useRef, useEffect } from 'react';
import { WORLD_COUNTRIES } from '@/i18n/countries';
import Icon from '@/components/ui/AppIcon';

export default function CountrySelect({ value = '', onChange, label, required, className = '', placeholder }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [lang] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('language') || 'fr' : 'fr'));
  const ref = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const filtered = WORLD_COUNTRIES
    .filter(c => {
      const q = search.toLowerCase();
      return (c.name[lang] || c.name.fr).toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    })
    .sort((a, b) => (a.name[lang] || a.name.fr).localeCompare(b.name[lang] || b.name.fr));

  const selected = WORLD_COUNTRIES.find(c => c.code === value);
  const displayName = selected ? (selected.name[lang] || selected.name.fr) : '';

  const ph = placeholder || (lang === 'fr' ? 'Sélectionner un pays...' : 'Select a country...');

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/40 transition-smooth ${className}`}>
        <span className="flex items-center space-x-2">
          {selected ? (
            <>
              <span className="text-base leading-none">{selected.flag}</span>
              <span className="text-foreground">{displayName}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{ph}</span>
          )}
        </span>
        <Icon name="ChevronDownIcon" size={14} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-[200] mt-1 bg-card border border-border rounded-xl shadow-card overflow-hidden animate-slide-in">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)}
                placeholder={lang === 'fr' ? 'Rechercher...' : 'Search...'}
                className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="overflow-y-auto max-h-52">
            {filtered.map(c => (
              <button key={c.code} type="button" onClick={() => { onChange?.(c.code); setOpen(false); setSearch(''); }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-left hover:bg-muted transition-smooth ${value === c.code ? 'bg-primary/5 text-primary font-semibold' : 'text-foreground'}`}>
                <span className="text-base leading-none w-6 flex-shrink-0">{c.flag}</span>
                <span className="flex-1 truncate">{c.name[lang] || c.name.fr}</span>
                {value === c.code && <Icon name="CheckIcon" size={14} className="text-primary flex-shrink-0" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                {lang === 'fr' ? 'Aucun pays trouvé' : 'No country found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
