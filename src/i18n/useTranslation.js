'use client';
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_LANG } from './translations';
import T, { t as translate } from './translations';

export function useLang() {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('language') || DEFAULT_LANG : DEFAULT_LANG;
    setLangState(stored);
    // Apply RTL direction for Arabic
    if (stored === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, []);

  // Listen for language changes from LanguageToggle
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('language') || DEFAULT_LANG;
      setLangState(stored);
      document.documentElement.setAttribute('dir', stored === 'ar' ? 'rtl' : 'ltr');
    };
    window.addEventListener('bimark-lang-change', handler);
    return () => window.removeEventListener('bimark-lang-change', handler);
  }, []);

  return lang;
}

// Main hook: useT() returns a translator function for current lang
export function useT() {
  const lang = useLang();
  const tr = useCallback((path) => translate(path, lang), [lang]);
  return { t: tr, lang };
}

export { T, translate as t };
