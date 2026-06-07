'use client';

import { useState, useRef, useEffect } from 'react';
import { WORLD_COUNTRIES } from '@/i18n/countries';
import Icon from '@/components/ui/AppIcon';

export default function PhoneInput({ value = '', onChange, placeholder = '+229 01 00 00 00 00', className = '', label, required }) {
  const [dialCode, setDialCode] = useState('+229');
  const [localNum, setLocalNum] = useState('');
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

  const handleNum = (e) => {
    const v = e.target.value.replace(/[^\d\s\-]/g, '');
    setLocalNum(v);
    onChange?.(dialCode + ' ' + v);
  };

  const selectDial = (country) => {
    setDialCode(country.dial);
    setOpen(false);
    setSearch('');
    onChange?.(country.dial + ' ' + localNum);
  };

  const filtered = WORLD_COUNTRIES.filter(c => {
    const q = search.toLowerCase();
    return (c.name[lang] || c.name.fr).toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q);
  }).sort((a, b) => (a.name[lang] || a.name.fr).localeCompare(b.name[lang] || b.name.fr));

  const currentCountry = WORLD_COUNTRIES.find(c => c.dial === dialCode) || WORLD_COUNTRIES[0];

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="flex">
        {/* Dial code selector */}
        <button type="button" onClick={() => setOpen(!open)}
          className="flex items-center space-x-1.5 px-3 py-2.5 border border-border rounded-l-lg bg-muted hover:bg-muted/80 transition-smooth flex-shrink-0 border-r-0 min-w-[90px]">
          <span className="text-base leading-none">{currentCountry.flag}</span>
          <span className="text-sm font-medium text-foreground">{dialCode}</span>
          <Icon name="ChevronDownIcon" size={13} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {/* Number input */}
        <input
          type="tel"
          value={localNum}
          onChange={handleNum}
          placeholder="01 00 00 00 00"
          className={`flex-1 px-3 py-2.5 border border-border rounded-r-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 z-[200] mt-1 w-72 bg-card border border-border rounded-xl shadow-card overflow-hidden animate-slide-in">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={lang === 'fr' ? 'Rechercher un pays...' : 'Search country...'}
                className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-56">
            {filtered.map(c => (
              <button key={c.code} type="button" onClick={() => selectDial(c)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-left hover:bg-muted transition-smooth ${c.dial === dialCode ? 'bg-primary/5 text-primary' : 'text-foreground'}`}>
                <span className="text-base leading-none w-6 flex-shrink-0">{c.flag}</span>
                <span className="flex-1 truncate">{c.name[lang] || c.name.fr}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0 font-mono">{c.dial}</span>
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
