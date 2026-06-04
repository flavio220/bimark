'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function LanguageToggle() {
  const [lang, setLang] = useState('fr');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  useEffect(() => {
    setLang(localStorage.getItem('language') || 'fr');
    const handler = (e) => { if (!e.target.closest('[data-lang-toggle]')) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (code) => {
    setLang(code);
    localStorage.setItem('language', code);
    setIsOpen(false);
    // Reload page to apply language everywhere
    window.location.reload();
  };

  const current = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative" data-lang-toggle>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-2 rounded-md hover:bg-muted transition-smooth border border-border"
        aria-label="Changer la langue"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline text-sm font-medium text-foreground">{current.code.toUpperCase()}</span>
        <Icon name="ChevronDownIcon" size={14} className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-xl shadow-card z-[1100] overflow-hidden animate-slide-in">
          {languages.map(l => (
            <button key={l.code} onClick={() => handleChange(l.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm transition-smooth hover:bg-muted ${lang === l.code ? 'text-primary font-semibold bg-primary/5' : 'text-foreground'}`}>
              <span className="text-base">{l.flag}</span>
              <span>{l.label}</span>
              {lang === l.code && <Icon name="CheckIcon" size={14} className="ml-auto text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
