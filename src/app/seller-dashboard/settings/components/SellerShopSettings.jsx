'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/common/ThemeProvider';

const TABS = [
  { id: 'boutique', label: 'Ma Boutique', icon: 'BuildingStorefrontIcon' },
  { id: 'contact', label: 'Contact & Livraison', icon: 'TruckIcon' },
  { id: 'paiements', label: 'Paiements', icon: 'CreditCardIcon' },
  { id: 'securite', label: 'Sécurité', icon: 'ShieldCheckIcon' },
  { id: 'preferences', label: 'Préférences', icon: 'AdjustmentsHorizontalIcon' },
];

export default function SellerShopSettings() {
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState('boutique');
  const [saved, setSaved] = useState(false);
  const logoRef = useRef();
  const bannerRef = useRef();

  const [shop, setShop] = useState({
    name: '', tagline: '', description: '', category: '', rccm: '',
    logoUrl: '', bannerUrl: '',
    country: 'Bénin', city: '', address: '', phone: '', phone2: '', email: '',
    whatsapp: '', website: '',
    deliveryZones: '', deliveryDelay: '', minOrder: '', returnPolicy: '',
    mobileMoneyNumber: '', bankName: '', bankAccount: '', paypalEmail: '',
    notifEmail: true, notifSMS: false, notifOrders: true, language: 'fr',
  });

  useEffect(() => {
    const stored = localStorage.getItem('bimark_shop_settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      setShop(parsed);
      localStorage.setItem('shopName', parsed.name || 'Ma Boutique');
    }
  }, []);

  const set = (k, v) => setShop(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    localStorage.setItem('bimark_shop_settings', JSON.stringify(shop));
    localStorage.setItem('shopName', shop.name || 'Ma Boutique');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleImageUpload = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set(key, ev.target.result);
    reader.readAsDataURL(file);
  };

  const inputCls = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Ma Boutique</h1>
        <p className="text-sm text-muted-foreground mb-6">Gérez les informations et paramètres de votre boutique Bimark</p>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>Modifications enregistrées avec succès !</span>
          </div>
        )}

        {/* Tab nav */}
        <div className="flex overflow-x-auto gap-1 mb-6 pb-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${
                tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
              }`}>
              <Icon name={t.icon} size={15} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">

          {/* ── BOUTIQUE TAB ── */}
          {tab === 'boutique' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Informations de la boutique</h2>

              {/* Logo & Banner */}
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Logo de la boutique</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                      {shop.logoUrl
                        ? <img src={shop.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                        : <Icon name="BuildingStorefrontIcon" size={28} className="text-muted-foreground" />}
                    </div>
                    <div>
                      <button onClick={() => logoRef.current?.click()}
                        className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth">
                        <Icon name="ArrowUpTrayIcon" size={15} /><span>Choisir un logo</span>
                      </button>
                      <p className="text-xs text-muted-foreground mt-1">PNG ou JPG · Recommandé: 200×200px</p>
                      <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload('logoUrl', e)} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Bannière de la boutique</label>
                  <div className="w-full h-28 bg-muted rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden mb-2">
                    {shop.bannerUrl
                      ? <img src={shop.bannerUrl} alt="Bannière" className="w-full h-full object-cover" />
                      : <div className="text-center"><Icon name="PhotoIcon" size={28} className="text-muted-foreground mx-auto mb-1" /><p className="text-xs text-muted-foreground">Aucune bannière</p></div>}
                  </div>
                  <button onClick={() => bannerRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth">
                    <Icon name="ArrowUpTrayIcon" size={15} /><span>Choisir une bannière</span>
                  </button>
                  <p className="text-xs text-muted-foreground mt-1">PNG ou JPG · Recommandé: 1200×300px</p>
                  <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload('bannerUrl', e)} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Nom de la boutique <span className="text-error">*</span></label>
                  <input value={shop.name} onChange={e => set('name', e.target.value)} placeholder="Ex: TechSupply Bénin" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Slogan / Accroche</label>
                  <input value={shop.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Ex: Votre fournisseur de confiance au Bénin" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Catégorie principale</label>
                  <select value={shop.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                    <option value="">Sélectionner...</option>
                    {['Électronique','Alimentation','Textile','Bâtiment','Agriculture','Cosmétiques','Mobilier','Informatique','Santé','Autre'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>N° RCCM / Registre de commerce</label>
                  <input value={shop.rccm} onChange={e => set('rccm', e.target.value)} placeholder="Ex: RCCM/BJ/COT/2024/B/12345" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Description de la boutique</label>
                  <textarea value={shop.description} onChange={e => set('description', e.target.value)} rows={4}
                    placeholder="Décrivez votre boutique, vos spécialités, votre expérience..."
                    className={`${inputCls} resize-none`} />
                </div>
              </div>
            </>
          )}

          {/* ── CONTACT TAB ── */}
          {tab === 'contact' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Contact & Zones de livraison</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Pays</label>
                  <select value={shop.country} onChange={e => set('country', e.target.value)} className={inputCls}>
                    {['Bénin','Togo','Sénégal','Côte d\'Ivoire','Ghana','Nigeria','Mali','Burkina Faso','Niger','Cameroun','France','Belgique','Canada'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Ville</label>
                  <input value={shop.city} onChange={e => set('city', e.target.value)} placeholder="Ex: Cotonou" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Adresse complète</label>
                  <input value={shop.address} onChange={e => set('address', e.target.value)} placeholder="Quartier, rue, numéro..." className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Téléphone principal</label>
                  <input value={shop.phone} onChange={e => set('phone', e.target.value)} placeholder="+229 01 00 00 00 00" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Téléphone secondaire</label>
                  <input value={shop.phone2} onChange={e => set('phone2', e.target.value)} placeholder="+229 01 00 00 00 00" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email professionnel</label>
                  <input type="email" value={shop.email} onChange={e => set('email', e.target.value)} placeholder="boutique@email.com" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>WhatsApp Business</label>
                  <input value={shop.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+229 01 00 00 00 00" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Site web</label>
                  <input value={shop.website} onChange={e => set('website', e.target.value)} placeholder="https://www.votreboutique.com" className={inputCls} />
                </div>
              </div>

              <div className="border-t border-border pt-5 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Politique de livraison</h3>
                <div>
                  <label className={labelCls}>Zones de livraison</label>
                  <textarea value={shop.deliveryZones} onChange={e => set('deliveryZones', e.target.value)} rows={2}
                    placeholder="Ex: Cotonou, Porto-Novo, Parakou, et toute la sous-région CEDEAO"
                    className={`${inputCls} resize-none`} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Délai de livraison</label>
                    <input value={shop.deliveryDelay} onChange={e => set('deliveryDelay', e.target.value)} placeholder="Ex: 3 à 7 jours ouvrables" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Commande minimum</label>
                    <input value={shop.minOrder} onChange={e => set('minOrder', e.target.value)} placeholder="Ex: 50 000 FCFA ou 10 unités" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Politique de retour</label>
                  <textarea value={shop.returnPolicy} onChange={e => set('returnPolicy', e.target.value)} rows={2}
                    placeholder="Ex: Retour accepté sous 7 jours après réception, produit non ouvert"
                    className={`${inputCls} resize-none`} />
                </div>
              </div>
            </>
          )}

          {/* ── PAIEMENTS TAB ── */}
          {tab === 'paiements' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Modes de réception des paiements</h2>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="DevicePhoneMobileIcon" size={16} className="text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Mobile Money</h3>
                  </div>
                  <div>
                    <label className={labelCls}>Numéro MTN / Moov / Orange Money</label>
                    <input value={shop.mobileMoneyNumber} onChange={e => set('mobileMoneyNumber', e.target.value)}
                      placeholder="+229 01 00 00 00 00" className={inputCls} />
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="BuildingLibraryIcon" size={16} className="text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Virement bancaire</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Nom de la banque</label>
                      <input value={shop.bankName} onChange={e => set('bankName', e.target.value)}
                        placeholder="Ex: BOA Bénin" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Numéro de compte / IBAN</label>
                      <input value={shop.bankAccount} onChange={e => set('bankAccount', e.target.value)}
                        placeholder="Ex: BJ123456789" className={inputCls} />
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="GlobeAltIcon" size={16} className="text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">PayPal</h3>
                  </div>
                  <div>
                    <label className={labelCls}>Email PayPal</label>
                    <input type="email" value={shop.paypalEmail} onChange={e => set('paypalEmail', e.target.value)}
                      placeholder="votre@paypal.com" className={inputCls} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── SECURITE TAB ── */}
          {tab === 'securite' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Sécurité du compte</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Mot de passe actuel</label>
                  <input type="password" placeholder="••••••••" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nouveau mot de passe</label>
                  <input type="password" placeholder="••••••••" className={inputCls} />
                  <p className="text-xs text-muted-foreground mt-1">Minimum 8 caractères, avec chiffres et majuscules</p>
                </div>
                <div>
                  <label className={labelCls}>Confirmer le nouveau mot de passe</label>
                  <input type="password" placeholder="••••••••" className={inputCls} />
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">Authentification 2 facteurs (SMS)</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Recevez un code à chaque connexion</p>
                    </div>
                    <button className="relative w-11 h-6 rounded-full bg-border transition-smooth">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── PREFERENCES TAB ── */}
          {tab === 'preferences' && (
            <>
              <h2 className="text-sm font-semibold text-foreground">Préférences</h2>
              <div className="space-y-3">
                {[
                  { key: 'notifOrders', label: 'Notifications de commandes', desc: 'Soyez alerté dès qu\'une commande est reçue' },
                  { key: 'notifEmail', label: 'Notifications par email', desc: 'Recevez les alertes sur votre email' },
                  { key: 'notifSMS', label: 'Notifications par SMS', desc: 'Alertes SMS pour les commandes urgentes' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                    </div>
                    <button onClick={() => set(n.key, !shop[n.key])}
                      className={`relative w-11 h-6 rounded-full transition-smooth ${shop[n.key] ? 'bg-primary' : 'bg-border'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${shop[n.key] ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Thème de l'interface</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{theme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé'}</p>
                  </div>
                  <button onClick={toggleTheme}
                    className={`relative w-11 h-6 rounded-full transition-smooth ${theme === 'dark' ? 'bg-primary' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                <div>
                  <label className={labelCls}>Langue préférée</label>
                  <select value={shop.language} onChange={e => set('language', e.target.value)} className={inputCls}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
            <Icon name="CheckIcon" size={18} />
            <span>Enregistrer les modifications</span>
          </button>
        </div>
      </div>
    </main>
  );
}
