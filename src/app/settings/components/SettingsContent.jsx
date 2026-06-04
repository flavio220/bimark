'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/common/ThemeProvider';

const settingsSections = [
  {
    id: 'account',
    title: 'Compte & Profil',
    icon: 'UserCircleIcon',
    items: [
      { id: 'profile', label: 'Modifier le profil', desc: 'Nom, photo, coordonnées', icon: 'UserIcon', href: '/profile' },
      { id: 'company', label: 'Informations entreprise', desc: 'Raison sociale, documents légaux', icon: 'BuildingOfficeIcon', href: '/profile' },
    ]
  },
  {
    id: 'preferences',
    title: 'Préférences',
    icon: 'AdjustmentsHorizontalIcon',
    items: [
      { id: 'language', label: 'Langue', desc: 'Français / English', icon: 'LanguageIcon', action: 'language' },
      { id: 'theme', label: 'Thème', desc: 'Clair ou Sombre', icon: 'SwatchIcon', action: 'theme' },
      { id: 'currency', label: 'Devise', desc: 'FCFA, EUR, USD', icon: 'CurrencyDollarIcon', action: 'currency' },
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'BellIcon',
    items: [
      { id: 'email-notif', label: 'Notifications email', desc: 'Commandes, messages, promotions', icon: 'EnvelopeIcon', toggle: true, defaultOn: true },
      { id: 'sms-notif', label: 'Notifications SMS', desc: 'Alertes importantes uniquement', icon: 'DevicePhoneMobileIcon', toggle: true, defaultOn: false },
      { id: 'marketing', label: 'Emails marketing', desc: 'Offres et nouveautés Bimark', icon: 'MegaphoneIcon', toggle: true, defaultOn: true },
    ]
  },
  {
    id: 'security',
    title: 'Sécurité & Confidentialité',
    icon: 'ShieldCheckIcon',
    items: [
      { id: 'password', label: 'Changer le mot de passe', desc: 'Modifier vos identifiants', icon: 'LockClosedIcon', href: '/profile' },
      { id: '2fa', label: 'Authentification à 2 facteurs', desc: 'Sécurité renforcée par SMS', icon: 'FingerPrintIcon', toggle: true, defaultOn: false },
      { id: 'sessions', label: 'Sessions actives', desc: 'Gérer vos connexions', icon: 'ComputerDesktopIcon', href: '/profile' },
    ]
  },
  {
    id: 'payments',
    title: 'Paiements',
    icon: 'CreditCardIcon',
    items: [
      { id: 'payment-methods', label: 'Modes de paiement', desc: 'Cartes, Mobile Money, virement', icon: 'CreditCardIcon', action: 'payment' },
      { id: 'billing', label: 'Historique de facturation', desc: 'Factures et transactions', icon: 'DocumentTextIcon', action: 'billing' },
    ]
  },
];

export default function SettingsContent() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [userRole, setUserRole] = useState(null);
  const [toggles, setToggles] = useState({
    'email-notif': true, 'sms-notif': false, 'marketing': true, '2fa': false
  });
  const [language, setLanguage] = useState('fr');
  const [currency, setCurrency] = useState('FCFA');
  const [activeModal, setActiveModal] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    if (!auth) router.push('/user-login');
    const savedLang = localStorage.getItem('language') || 'fr';
    setLanguage(savedLang);
  }, [router]);

  const handleToggle = (id) => {
    setToggles(p => {
      const next = { ...p, [id]: !p[id] };
      setSaved(id);
      setTimeout(() => setSaved(null), 2000);
      return next;
    });
  };

  const handleLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setActiveModal(null);
    setSaved('language');
    setTimeout(() => setSaved(null), 2000);
  };

  const handleCurrency = (cur) => {
    setCurrency(cur);
    setActiveModal(null);
    setSaved('currency');
    setTimeout(() => setSaved(null), 2000);
  };

  const handleAction = (item) => {
    if (item.href) return;
    if (item.action === 'language') setActiveModal('language');
    else if (item.action === 'theme') toggleTheme();
    else if (item.action === 'currency') setActiveModal('currency');
    else if (item.action === 'payment' || item.action === 'billing') setActiveModal('payment');
  };

  const dashboardHref = userRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href={dashboardHref} className="hover:text-primary transition-smooth capitalize">{userRole || 'Dashboard'}</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">Paramètres</span>
        </nav>

        <h1 className="text-2xl font-bold text-foreground mb-6">Paramètres du compte</h1>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} />
            <span>Modification sauvegardée</span>
          </div>
        )}

        <div className="space-y-6">
          {settingsSections.map(section => (
            <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center space-x-3 px-5 py-4 border-b border-border bg-muted/30">
                <Icon name={section.icon} size={18} className="text-primary" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{section.title}</h2>
              </div>
              <div className="divide-y divide-border">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-smooth">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} size={18} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.action === 'theme'
                            ? (theme === 'dark' ? 'Mode sombre actif' : 'Mode clair actif')
                            : item.action === 'language'
                            ? (language === 'fr' ? 'Français' : 'English')
                            : item.action === 'currency'
                            ? currency
                            : item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {item.toggle ? (
                        <button onClick={() => handleToggle(item.id)}
                          className={`relative w-11 h-6 rounded-full transition-smooth focus:outline-none ${toggles[item.id] ? 'bg-primary' : 'bg-border'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${toggles[item.id] ? 'left-6' : 'left-1'}`} />
                        </button>
                      ) : item.href ? (
                        <Link href={item.href}
                          className="flex items-center space-x-1 text-sm text-primary hover:underline font-medium">
                          <span>Modifier</span>
                          <Icon name="ChevronRightIcon" size={14} />
                        </Link>
                      ) : (
                        <button onClick={() => handleAction(item)}
                          className="flex items-center space-x-1 text-sm text-primary hover:underline font-medium">
                          <span>{item.action === 'theme' ? 'Basculer' : 'Modifier'}</span>
                          <Icon name="ChevronRightIcon" size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Danger zone */}
          <div className="bg-card border border-error/20 rounded-xl overflow-hidden">
            <div className="flex items-center space-x-3 px-5 py-4 border-b border-error/20 bg-error/5">
              <Icon name="ExclamationTriangleIcon" size={18} className="text-error" />
              <h2 className="text-sm font-semibold text-error uppercase tracking-wider">Zone de danger</h2>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Désactiver le compte</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Votre compte sera suspendu temporairement</p>
                </div>
                <button className="px-4 py-2 border border-error text-error rounded-lg text-sm font-medium hover:bg-error/10 transition-smooth">
                  Désactiver
                </button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Besoin d'aide ?</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="tel:+2290150882676" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="PhoneIcon" size={14} />
                <span>+229 01 50 88 26 76</span>
              </a>
              <a href="tel:+2290140903261" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="PhoneIcon" size={14} />
                <span>+229 01 40 90 32 61</span>
              </a>
              <a href="mailto:flavioadantchede@gmail.com" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="EnvelopeIcon" size={14} />
                <span>flavioadantchede@gmail.com</span>
              </a>
              <Link href="/contact" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="ChatBubbleLeftRightIcon" size={14} />
                <span>Centre d'aide</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Language modal */}
      {activeModal === 'language' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm animate-slide-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-foreground mb-4">Choisir la langue</h3>
            <div className="space-y-2">
              {[{code:'fr',label:'Français',flag:'🇫🇷'},{code:'en',label:'English',flag:'🇬🇧'}].map(lang => (
                <button key={lang.code} onClick={() => handleLanguage(lang.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border transition-smooth ${language === lang.code ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted text-foreground'}`}>
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                  {language === lang.code && <Icon name="CheckIcon" size={16} className="ml-auto text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Currency modal */}
      {activeModal === 'currency' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm animate-slide-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-foreground mb-4">Choisir la devise</h3>
            <div className="space-y-2">
              {[{code:'FCFA',label:'Franc CFA (FCFA)'},{code:'EUR',label:'Euro (€)'},{code:'USD',label:'Dollar US ($)'},{code:'GBP',label:'Livre Sterling (£)'}].map(cur => (
                <button key={cur.code} onClick={() => handleCurrency(cur.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-smooth ${currency === cur.code ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted text-foreground'}`}>
                  <span className="font-medium">{cur.label}</span>
                  {currency === cur.code && <Icon name="CheckIcon" size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {activeModal === 'payment' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm animate-slide-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-foreground mb-2">Paiements</h3>
            <div className="py-8 text-center">
              <Icon name="CreditCardIcon" size={36} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Aucun mode de paiement enregistré</p>
              <p className="text-xs text-muted-foreground mb-4">Ajoutez un moyen de paiement pour faciliter vos transactions</p>
              <button onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                Ajouter un paiement
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
