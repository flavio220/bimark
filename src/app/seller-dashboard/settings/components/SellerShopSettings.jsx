'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';
import { useTheme } from '@/components/common/ThemeProvider';
import { useT } from '@/i18n/useTranslation';

const TABS_KEYS = [
  { id: 'boutique',    icon: 'BuildingStorefrontIcon' },
  { id: 'contact',     icon: 'TruckIcon' },
  { id: 'paiements',   icon: 'CreditCardIcon' },
  { id: 'securite',    icon: 'ShieldCheckIcon' },
  { id: 'preferences', icon: 'AdjustmentsHorizontalIcon' },
];

const TAB_LABELS = {
  fr: { boutique:'Ma Boutique', contact:'Contact & Livraison', paiements:'Paiements', securite:'Sécurité', preferences:'Préférences' },
  en: { boutique:'My Shop', contact:'Contact & Delivery', paiements:'Payments', securite:'Security', preferences:'Preferences' },
  es: { boutique:'Mi Tienda', contact:'Contacto y Entrega', paiements:'Pagos', securite:'Seguridad', preferences:'Preferencias' },
  pt: { boutique:'Minha Loja', contact:'Contato e Entrega', paiements:'Pagamentos', securite:'Segurança', preferences:'Preferências' },
  ar: { boutique:'متجري', contact:'التواصل والتسليم', paiements:'المدفوعات', securite:'الأمان', preferences:'التفضيلات' },
  zh: { boutique:'我的店铺', contact:'联系方式与配送', paiements:'支付', securite:'安全', preferences:'偏好设置' },
};

const CATEGORIES = {
  fr: ['Électronique','Alimentation','Textile','Bâtiment','Agriculture','Cosmétiques','Mobilier','Informatique','Santé','Autre'],
  en: ['Electronics','Food','Textile','Construction','Agriculture','Cosmetics','Furniture','IT','Health','Other'],
  es: ['Electrónica','Alimentación','Textil','Construcción','Agricultura','Cosméticos','Muebles','Informática','Salud','Otro'],
  pt: ['Eletrônicos','Alimentação','Têxtil','Construção','Agricultura','Cosméticos','Móveis','Informática','Saúde','Outro'],
  ar: ['إلكترونيات','غذاء','نسيج','بناء','زراعة','مستحضرات تجميل','أثاث','تكنولوجيا','صحة','أخرى'],
  zh: ['电子产品','食品','纺织品','建筑','农业','化妆品','家具','IT','健康','其他'],
};

export default function SellerShopSettings() {
  const { theme, toggleTheme } = useTheme();
  const { t, lang } = useT();
  const [tab, setTab] = useState('boutique');
  const [saved, setSaved] = useState(false);
  const logoRef = useRef();
  const bannerRef = useRef();

  const [shop, setShop] = useState({
    name:'', tagline:'', description:'', category:'', rccm:'', logoUrl:'', bannerUrl:'',
    country:'', city:'', address:'', phone:'', phone2:'', email:'', whatsapp:'', website:'',
    deliveryZones:'', deliveryDelay:'', minOrder:'', returnPolicy:'',
    mobileMoneyNumber:'', bankName:'', bankAccount:'', paypalEmail:'',
    notifEmail:true, notifSMS:false, notifOrders:true, language:'fr',
  });

  useEffect(() => {
    const stored = localStorage.getItem('bimark_shop_settings');
    if (stored) { const p = JSON.parse(stored); setShop(p); localStorage.setItem('shopName', p.name || ''); }
  }, []);

  const set = (k,v) => setShop(p => ({...p,[k]:v}));

  const handleSave = () => {
    localStorage.setItem('bimark_shop_settings', JSON.stringify(shop));
    localStorage.setItem('shopName', shop.name || '');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleImg = (key, e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set(key, ev.target.result);
    reader.readAsDataURL(file);
  };

  const labels = TAB_LABELS[lang] || TAB_LABELS.fr;
  const cats = CATEGORIES[lang] || CATEGORIES.fr;
  const inputCls = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  const notifLabels = {
    notifOrders: { fr:'Alertes commandes', en:'Order alerts', es:'Alertas de pedidos', pt:'Alertas de pedidos', ar:'تنبيهات الطلبات', zh:'订单提醒' },
    notifEmail:  { fr:'Notifications email', en:'Email notifications', es:'Notificaciones email', pt:'Notificações email', ar:'إشعارات البريد', zh:'邮件通知' },
    notifSMS:    { fr:'Notifications SMS', en:'SMS notifications', es:'Notificaciones SMS', pt:'Notificações SMS', ar:'إشعارات SMS', zh:'短信通知' },
  };

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">{t('seller.myShop')}</h1>
        <p className="text-sm text-muted-foreground mb-6">{lang === 'fr' ? 'Gérez les informations et paramètres de votre boutique' : lang === 'en' ? 'Manage your shop information and settings' : lang === 'es' ? 'Gestiona la información de tu tienda' : lang === 'pt' ? 'Gerencie as informações da sua loja' : lang === 'ar' ? 'إدارة معلومات متجرك' : '管理您的店铺信息'}</p>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>{t('profile.saved')}</span>
          </div>
        )}

        {/* Tab nav */}
        <div className="flex overflow-x-auto gap-1 mb-6 pb-1">
          {TABS_KEYS.map(tk => (
            <button key={tk.id} onClick={() => setTab(tk.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${tab === tk.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              <Icon name={tk.icon} size={15} /><span>{labels[tk.id]}</span>
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">

          {/* ── BOUTIQUE ── */}
          {tab === 'boutique' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.boutique}</h2>
            {/* Logo */}
            <div>
              <label className={labelCls}>{lang === 'fr' ? 'Logo' : lang === 'en' ? 'Logo' : lang === 'ar' ? 'الشعار' : lang === 'zh' ? '店标' : 'Logo'}</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                  {shop.logoUrl ? <img src={shop.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <Icon name="BuildingStorefrontIcon" size={28} className="text-muted-foreground" />}
                </div>
                <div>
                  <button onClick={() => logoRef.current?.click()} className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth">
                    <Icon name="ArrowUpTrayIcon" size={15} /><span>{lang === 'fr' ? 'Choisir' : lang === 'en' ? 'Choose' : lang === 'ar' ? 'اختر' : lang === 'zh' ? '选择' : 'Elegir'}</span>
                  </button>
                  <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => handleImg('logoUrl', e)} />
                </div>
              </div>
            </div>
            {/* Banner */}
            <div>
              <label className={labelCls}>{lang === 'fr' ? 'Bannière' : lang === 'en' ? 'Banner' : lang === 'ar' ? 'البانر' : lang === 'zh' ? '横幅' : 'Banner'}</label>
              <div className="w-full h-28 bg-muted rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden mb-2">
                {shop.bannerUrl ? <img src={shop.bannerUrl} alt="Banner" className="w-full h-full object-cover" /> : <Icon name="PhotoIcon" size={28} className="text-muted-foreground" />}
              </div>
              <button onClick={() => bannerRef.current?.click()} className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth">
                <Icon name="ArrowUpTrayIcon" size={15} /><span>{lang === 'fr' ? 'Choisir' : 'Choose'}</span>
              </button>
              <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={e => handleImg('bannerUrl', e)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className={labelCls}>{t('seller.shopName')} *</label><input value={shop.name} onChange={e => set('name', e.target.value)} placeholder="TechSupply Bénin" className={inputCls} /></div>
              <div className="sm:col-span-2"><label className={labelCls}>{lang === 'fr' ? 'Slogan' : lang === 'en' ? 'Tagline' : lang === 'ar' ? 'الشعار' : lang === 'zh' ? '标语' : 'Eslogan'}</label><input value={shop.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Votre fournisseur de confiance" className={inputCls} /></div>
              <div><label className={labelCls}>{t('common.category')}</label>
                <select value={shop.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                  <option value="">—</option>{cats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>RCCM</label><input value={shop.rccm} onChange={e => set('rccm', e.target.value)} placeholder="RCCM/BJ/COT/2024/B/12345" className={inputCls} /></div>
              <div className="sm:col-span-2"><label className={labelCls}>{t('seller.shopDesc')}</label>
                <textarea value={shop.description} onChange={e => set('description', e.target.value)} rows={4} className={`${inputCls} resize-none`} />
              </div>
            </div>
          </>}

          {/* ── CONTACT ── */}
          {tab === 'contact' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.contact}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <CountrySelect label={t('common.country')} required value={shop.country} onChange={v => set('country', v)} />
              </div>
              <div><label className={labelCls}>{t('common.city')}</label><input value={shop.city} onChange={e => set('city', e.target.value)} placeholder="Cotonou" className={inputCls} /></div>
              <div className="sm:col-span-2"><label className={labelCls}>{t('common.address')}</label><input value={shop.address} onChange={e => set('address', e.target.value)} className={inputCls} /></div>
              <PhoneInput label={t('common.phone')} value={shop.phone} onChange={v => set('phone', v)} />
              <PhoneInput label={`${t('common.phone')} 2`} value={shop.phone2} onChange={v => set('phone2', v)} />
              <div><label className={labelCls}>{t('common.email')}</label><input type="email" value={shop.email} onChange={e => set('email', e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>WhatsApp</label><input value={shop.whatsapp} onChange={e => set('whatsapp', e.target.value)} className={inputCls} /></div>
              <div className="sm:col-span-2"><label className={labelCls}>{t('common.website')}</label><input value={shop.website} onChange={e => set('website', e.target.value)} className={inputCls} /></div>
            </div>
            <div className="border-t border-border pt-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">{lang === 'fr' ? 'Livraison' : lang === 'en' ? 'Delivery' : lang === 'ar' ? 'التسليم' : lang === 'zh' ? '配送' : 'Entrega'}</h3>
              <div><label className={labelCls}>{lang === 'fr' ? 'Zones de livraison' : lang === 'en' ? 'Delivery zones' : lang === 'ar' ? 'مناطق التسليم' : lang === 'zh' ? '配送区域' : 'Zonas de entrega'}</label>
                <textarea value={shop.deliveryZones} onChange={e => set('deliveryZones', e.target.value)} rows={2} className={`${inputCls} resize-none`} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>{lang === 'fr' ? 'Délai' : lang === 'en' ? 'Lead time' : lang === 'ar' ? 'وقت التسليم' : lang === 'zh' ? '交货期' : 'Plazo'}</label><input value={shop.deliveryDelay} onChange={e => set('deliveryDelay', e.target.value)} className={inputCls} /></div>
                <div><label className={labelCls}>{lang === 'fr' ? 'Commande min.' : lang === 'en' ? 'Min. order' : lang === 'ar' ? 'الحد الأدنى للطلب' : lang === 'zh' ? '最低订单' : 'Pedido mín.'}</label><input value={shop.minOrder} onChange={e => set('minOrder', e.target.value)} className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>{lang === 'fr' ? 'Politique de retour' : lang === 'en' ? 'Return policy' : lang === 'ar' ? 'سياسة الإرجاع' : lang === 'zh' ? '退货政策' : 'Política de devoluciones'}</label>
                <textarea value={shop.returnPolicy} onChange={e => set('returnPolicy', e.target.value)} rows={2} className={`${inputCls} resize-none`} /></div>
            </div>
          </>}

          {/* ── PAIEMENTS ── */}
          {tab === 'paiements' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.paiements}</h2>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center space-x-2"><Icon name="DevicePhoneMobileIcon" size={16} className="text-primary" /><h3 className="text-sm font-semibold text-foreground">Mobile Money</h3></div>
                <PhoneInput label="MTN / Moov / Orange Money" value={shop.mobileMoneyNumber} onChange={v => set('mobileMoneyNumber', v)} />
              </div>
              <div className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center space-x-2"><Icon name="BuildingLibraryIcon" size={16} className="text-primary" /><h3 className="text-sm font-semibold text-foreground">{lang === 'fr' ? 'Virement bancaire' : lang === 'en' ? 'Bank transfer' : lang === 'ar' ? 'تحويل بنكي' : lang === 'zh' ? '银行转账' : 'Transferencia bancaria'}</h3></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className={labelCls}>{lang === 'fr' ? 'Banque' : lang === 'en' ? 'Bank' : lang === 'ar' ? 'البنك' : lang === 'zh' ? '银行' : 'Banco'}</label><input value={shop.bankName} onChange={e => set('bankName', e.target.value)} placeholder="BOA Bénin" className={inputCls} /></div>
                  <div><label className={labelCls}>{lang === 'fr' ? 'Numéro de compte' : lang === 'en' ? 'Account number' : lang === 'ar' ? 'رقم الحساب' : lang === 'zh' ? '账号' : 'Número de cuenta'}</label><input value={shop.bankAccount} onChange={e => set('bankAccount', e.target.value)} className={inputCls} /></div>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-2 mb-3"><Icon name="GlobeAltIcon" size={16} className="text-primary" /><h3 className="text-sm font-semibold text-foreground">PayPal</h3></div>
                <div><label className={labelCls}>Email PayPal</label><input type="email" value={shop.paypalEmail} onChange={e => set('paypalEmail', e.target.value)} placeholder="you@paypal.com" className={inputCls} /></div>
              </div>
            </div>
          </>}

          {/* ── SECURITE ── */}
          {tab === 'securite' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.securite}</h2>
            <div className="space-y-4">
              <div><label className={labelCls}>{t('profile.currentPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              <div><label className={labelCls}>{t('profile.newPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              <div><label className={labelCls}>{t('profile.confirmPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div><p className="text-sm font-medium text-foreground">2FA SMS</p><p className="text-xs text-muted-foreground">{lang === 'fr' ? 'Code SMS à chaque connexion' : lang === 'en' ? 'SMS code on each login' : lang === 'ar' ? 'رمز SMS عند كل تسجيل دخول' : lang === 'zh' ? '每次登录时发送短信验证码' : 'Código SMS en cada inicio'}</p></div>
                <button className="relative w-11 h-6 rounded-full bg-border"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" /></button>
              </div>
            </div>
          </>}

          {/* ── PREFERENCES ── */}
          {tab === 'preferences' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.preferences}</h2>
            <div className="space-y-3">
              {Object.entries(notifLabels).map(([key, labels_]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div><p className="text-sm font-medium text-foreground">{labels_[lang] || labels_.fr}</p></div>
                  <button onClick={() => set(key, !shop[key])} className={`relative w-11 h-6 rounded-full transition-smooth ${shop[key] ? 'bg-primary' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${shop[key] ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div><p className="text-sm font-medium text-foreground">{t('profile.theme')}</p><p className="text-xs text-muted-foreground">{theme === 'dark' ? t('profile.darkMode') : t('profile.lightMode')}</p></div>
                <button onClick={toggleTheme} className={`relative w-11 h-6 rounded-full transition-smooth ${theme === 'dark' ? 'bg-primary' : 'bg-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </>}
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={handleSave} className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
            <Icon name="CheckIcon" size={18} /><span>{t('seller.saveChanges')}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
