'use client';

import { useState, useEffect, useRef } from 'react';
import { SUPPORTED_LANGUAGES, DEFAULT_LANG } from '@/i18n/translations';
import Icon from '@/components/ui/AppIcon';

export default function LanguageToggle() {
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setLang(localStorage.getItem('language') || DEFAULT_LANG);
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleChange = (code) => {
    setLang(code);
    localStorage.setItem('language', code);
    setIsOpen(false);
    // RTL support
    document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
    // Notify all hooks without full reload
    window.dispatchEvent(new Event('bimark-lang-change'));
  };

  const current = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-2.5 py-2 rounded-md hover:bg-muted transition-smooth border border-border"
        aria-label="Changer la langue"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-xs font-semibold text-foreground">{current.code.toUpperCase()}</span>
        <Icon name="ChevronDownIcon" size={13} className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-card z-[1100] overflow-hidden animate-slide-in">
          <div className="p-2 space-y-0.5">
            {SUPPORTED_LANGUAGES.map(l => (
              <button key={l.code} onClick={() => handleChange(l.code)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-smooth ${lang === l.code ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'}`}>
                <span className="text-lg leading-none">{l.flag}</span>
                <span className="flex-1 text-left">{l.label}</span>
                {lang === l.code && <Icon name="CheckIcon" size={14} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
