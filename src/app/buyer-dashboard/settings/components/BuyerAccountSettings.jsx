'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/common/ThemeProvider';

const TABS = [
  { id: 'profil', label: 'Mon Profil', icon: 'UserCircleIcon' },
  { id: 'entreprise', label: 'Mon Entreprise', icon: 'BuildingOfficeIcon' },
  { id: 'livraison', label: 'Adresses', icon: 'MapPinIcon' },
  { id: 'securite', label: 'Sécurité', icon: 'ShieldCheckIcon' },
  { id: 'preferences', label: 'Préférences', icon: 'AdjustmentsHorizontalIcon' },
];

export default function BuyerAccountSettings() {
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState('profil');
  const [saved, setSaved] = useState(false);
  const photoRef = useRef();

  const [profile, setProfile] = useState({
    firstName: '', lastName: '', email: '', phone: '', photoUrl: '',
    company: '', sector: '', rccm: '', employees: '',
    addresses: [{ label: 'Principal', country: 'Bénin', city: '', address: '', phone: '', isDefault: true }],
    notifOrders: true, notifMessages: true, notifPromotions: false,
    language: 'fr', currency: 'FCFA',
  });

  useEffect(() => {
    const stored = localStorage.getItem('bimark_buyer_profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    localStorage.setItem('bimark_buyer_profile', JSON.stringify(profile));
    localStorage.setItem('userName', `${profile.firstName} ${profile.lastName}`.trim() || 'Mon Compte');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set('photoUrl', ev.target.result);
    reader.readAsDataURL(file);
  };

  const addAddress = () => {
    set('addresses', [...profile.addresses, { label: `Adresse ${profile.addresses.length + 1}`, country: 'Bénin', city: '', address: '', phone: '', isDefault: false }]);
  };

  const updateAddress = (idx, k, v) => {
    const updated = profile.addresses.map((a, i) => i === idx ? { ...a, [k]: v } : a);
    set('addresses', updated);
  };

  const removeAddress = (idx) => {
    if (profile.addresses.length === 1) return;
    set('addresses', profile.addresses.filter((_, i) => i !== idx));
  };

  const inputCls = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Paramètres du compte</h1>
        <p className="text-sm text-muted-foreground mb-6">Gérez vos informations personnelles et préférences</p>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>Modifications enregistrées !</span>
          </div>
        )}

        <div className="flex overflow-x-auto gap-1 mb-6 pb-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              <Icon name={t.icon} size={15} /><span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">

          {tab === 'profil' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Informations personnelles</h2>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-border">
                    {profile.photoUrl
                      ? <img src={profile.photoUrl} alt="Photo" className="w-full h-full object-cover" />
                      : <Icon name="UserCircleIcon" size={36} className="text-primary" />}
                  </div>
                  <button onClick={() => photoRef.current?.click()} className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <Icon name="CameraIcon" size={13} className="text-primary-foreground" />
                  </button>
                  <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}` : 'Votre nom'}</p>
                  <p className="text-xs text-muted-foreground">Acheteur Bimark</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Prénom</label><input value={profile.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Prénom" className={inputCls} /></div>
                <div><label className={labelCls}>Nom</label><input value={profile.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Nom de famille" className={inputCls} /></div>
                <div><label className={labelCls}>Email</label><input type="email" value={profile.email} onChange={e => set('email', e.target.value)} placeholder="votre@email.com" className={inputCls} /></div>
                <div><label className={labelCls}>Téléphone</label><input value={profile.phone} onChange={e => set('phone', e.target.value)} placeholder="+229 01 00 00 00 00" className={inputCls} /></div>
              </div>
            </>
          )}

          {tab === 'entreprise' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Informations de l'entreprise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className={labelCls}>Nom de l'entreprise</label><input value={profile.company} onChange={e => set('company', e.target.value)} placeholder="Nom de votre entreprise" className={inputCls} /></div>
                <div>
                  <label className={labelCls}>Secteur d'activité</label>
                  <select value={profile.sector} onChange={e => set('sector', e.target.value)} className={inputCls}>
                    <option value="">Sélectionner...</option>
                    {['Commerce','Industrie','Agriculture','Construction','Transport','Santé','Éducation','Technologie','Autre'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Taille de l'entreprise</label>
                  <select value={profile.employees} onChange={e => set('employees', e.target.value)} className={inputCls}>
                    <option value="">Sélectionner...</option>
                    {['1-10 employés','11-50 employés','51-200 employés','200+ employés'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2"><label className={labelCls}>N° RCCM / Registre de commerce</label><input value={profile.rccm} onChange={e => set('rccm', e.target.value)} placeholder="Ex: RCCM/BJ/COT/2024/B/12345" className={inputCls} /></div>
              </div>
            </>
          )}

          {tab === 'livraison' && (
            <>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-foreground">Adresses de livraison</h2>
                <button onClick={addAddress} className="flex items-center space-x-1 text-xs text-primary hover:underline font-medium">
                  <Icon name="PlusIcon" size={14} /><span>Ajouter</span>
                </button>
              </div>
              <div className="space-y-4">
                {profile.addresses.map((addr, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <input value={addr.label} onChange={e => updateAddress(idx, 'label', e.target.value)}
                        className="text-sm font-semibold text-foreground bg-transparent border-b border-dashed border-border focus:outline-none focus:border-primary pb-0.5 w-32" />
                      <div className="flex items-center gap-2">
                        {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Par défaut</span>}
                        {profile.addresses.length > 1 && (
                          <button onClick={() => removeAddress(idx)} className="p-1 text-error hover:bg-error/10 rounded transition-smooth"><Icon name="TrashIcon" size={14} /></button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Pays</label>
                        <select value={addr.country} onChange={e => updateAddress(idx, 'country', e.target.value)} className={`${inputCls} text-xs py-2`}>
                          {['Bénin','Togo','Sénégal','Côte d\'Ivoire','Ghana','Nigeria','Mali','Burkina Faso','Niger','Cameroun'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Ville</label>
                        <input value={addr.city} onChange={e => updateAddress(idx, 'city', e.target.value)} placeholder="Ville" className={`${inputCls} text-xs py-2`} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-muted-foreground mb-1">Adresse complète</label>
                        <input value={addr.address} onChange={e => updateAddress(idx, 'address', e.target.value)} placeholder="Rue, quartier, BP..." className={`${inputCls} text-xs py-2`} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-muted-foreground mb-1">Téléphone</label>
                        <input value={addr.phone} onChange={e => updateAddress(idx, 'phone', e.target.value)} placeholder="+229 01 00 00 00 00" className={`${inputCls} text-xs py-2`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'securite' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Sécurité</h2>
              <div className="space-y-4">
                <div><label className={labelCls}>Mot de passe actuel</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
                <div><label className={labelCls}>Nouveau mot de passe</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
                <div><label className={labelCls}>Confirmer</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div><p className="text-sm font-medium text-foreground">Authentification 2FA</p><p className="text-xs text-muted-foreground">Code SMS à chaque connexion</p></div>
                  <button className="relative w-11 h-6 rounded-full bg-border transition-smooth"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" /></button>
                </div>
              </div>
            </>
          )}

          {tab === 'preferences' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Préférences</h2>
              <div className="space-y-3">
                {[
                  { key: 'notifOrders', label: 'Notifications commandes', desc: 'Alertes sur vos commandes' },
                  { key: 'notifMessages', label: 'Notifications messages', desc: 'Nouveaux messages fournisseurs' },
                  { key: 'notifPromotions', label: 'Offres & promotions', desc: 'Emails marketing Bimark' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div><p className="text-sm font-medium text-foreground">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                    <button onClick={() => set(n.key, !profile[n.key])}
                      className={`relative w-11 h-6 rounded-full transition-smooth ${profile[n.key] ? 'bg-primary' : 'bg-border'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${profile[n.key] ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div><p className="text-sm font-medium text-foreground">Thème</p><p className="text-xs text-muted-foreground">{theme === 'dark' ? 'Mode sombre' : 'Mode clair'}</p></div>
                  <button onClick={toggleTheme} className={`relative w-11 h-6 rounded-full transition-smooth ${theme === 'dark' ? 'bg-primary' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
                <div>
                  <label className={labelCls}>Langue</label>
                  <select value={profile.language} onChange={e => set('language', e.target.value)} className={inputCls}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Devise</label>
                  <select value={profile.currency} onChange={e => set('currency', e.target.value)} className={inputCls}>
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollar US ($)</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={handleSave} className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
            <Icon name="CheckIcon" size={18} /><span>Enregistrer</span>
          </button>
        </div>
      </div>
    </main>
  );
}
