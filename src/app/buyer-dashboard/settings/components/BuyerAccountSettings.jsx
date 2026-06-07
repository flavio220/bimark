'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';
import { useTheme } from '@/components/common/ThemeProvider';
import { useT } from '@/i18n/useTranslation';

const TABS_KEYS = [
  { id: 'profil',      icon: 'UserCircleIcon' },
  { id: 'entreprise',  icon: 'BuildingOfficeIcon' },
  { id: 'livraison',   icon: 'MapPinIcon' },
  { id: 'securite',    icon: 'ShieldCheckIcon' },
  { id: 'preferences', icon: 'AdjustmentsHorizontalIcon' },
];

const TAB_LABELS = {
  fr: { profil:'Mon Profil', entreprise:'Mon Entreprise', livraison:'Adresses', securite:'Sécurité', preferences:'Préférences' },
  en: { profil:'My Profile', entreprise:'My Company', livraison:'Addresses', securite:'Security', preferences:'Preferences' },
  es: { profil:'Mi Perfil', entreprise:'Mi Empresa', livraison:'Direcciones', securite:'Seguridad', preferences:'Preferencias' },
  pt: { profil:'Meu Perfil', entreprise:'Minha Empresa', livraison:'Endereços', securite:'Segurança', preferences:'Preferências' },
  ar: { profil:'ملفي', entreprise:'شركتي', livraison:'العناوين', securite:'الأمان', preferences:'التفضيلات' },
  zh: { profil:'我的资料', entreprise:'我的公司', livraison:'地址', securite:'安全', preferences:'偏好设置' },
};

export default function BuyerAccountSettings() {
  const { theme, toggleTheme } = useTheme();
  const { t, lang } = useT();
  const [tab, setTab] = useState('profil');
  const [saved, setSaved] = useState(false);
  const photoRef = useRef();

  const [profile, setProfile] = useState({
    firstName:'', lastName:'', email:'', phone:'', photoUrl:'',
    company:'', sector:'', rccm:'', employees:'', country:'', city:'', address:'',
    addresses:[{ label:'Principal', country:'BJ', city:'', address:'', phone:'', isDefault:true }],
    notifOrders:true, notifMessages:true, notifPromotions:false,
    language:'fr', currency:'FCFA',
  });

  useEffect(() => {
    const stored = localStorage.getItem('bimark_buyer_profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const set = (k,v) => setProfile(p => ({...p,[k]:v}));

  const handleSave = () => {
    localStorage.setItem('bimark_buyer_profile', JSON.stringify(profile));
    localStorage.setItem('userName', `${profile.firstName||''} ${profile.lastName||''}`.trim() || t('nav.profile'));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set('photoUrl', ev.target.result);
    reader.readAsDataURL(file);
  };

  const addAddress = () => set('addresses', [...profile.addresses, { label:`${lang==='fr'?'Adresse':lang==='en'?'Address':lang==='ar'?'عنوان':lang==='zh'?'地址':'Dirección'} ${profile.addresses.length+1}`, country:'BJ', city:'', address:'', phone:'', isDefault:false }]);
  const updateAddr = (idx, k, v) => set('addresses', profile.addresses.map((a,i) => i===idx ? {...a,[k]:v} : a));
  const removeAddr = (idx) => { if (profile.addresses.length===1) return; set('addresses', profile.addresses.filter((_,i) => i!==idx)); };

  const labels = TAB_LABELS[lang] || TAB_LABELS.fr;
  const inputCls = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  const SECTORS = {
    fr:['Commerce','Industrie','Agriculture','Construction','Transport','Santé','Éducation','Technologie','Autre'],
    en:['Trade','Industry','Agriculture','Construction','Transport','Health','Education','Technology','Other'],
    es:['Comercio','Industria','Agricultura','Construcción','Transporte','Salud','Educación','Tecnología','Otro'],
    pt:['Comércio','Indústria','Agricultura','Construção','Transporte','Saúde','Educação','Tecnologia','Outro'],
    ar:['التجارة','الصناعة','الزراعة','البناء','النقل','الصحة','التعليم','التكنولوجيا','أخرى'],
    zh:['贸易','工业','农业','建筑','交通','健康','教育','技术','其他'],
  };

  const SIZES = {
    fr:['1–5 employés','6–20','21–50','51–200','200+'],
    en:['1–5 employees','6–20','21–50','51–200','200+'],
    es:['1–5 empleados','6–20','21–50','51–200','200+'],
    pt:['1–5 funcionários','6–20','21–50','51–200','200+'],
    ar:['1–5 موظفين','6–20','21–50','51–200','200+'],
    zh:['1–5人','6–20人','21–50人','51–200人','200人以上'],
  };

  const notifLabels = {
    notifOrders:   {fr:'Alertes commandes',  en:'Order alerts',    es:'Alertas pedidos',  pt:'Alertas pedidos',  ar:'تنبيهات الطلبات', zh:'订单提醒'},
    notifMessages: {fr:'Alertes messages',   en:'Message alerts',  es:'Alertas mensajes', pt:'Alertas mensagens', ar:'تنبيهات الرسائل', zh:'消息提醒'},
    notifPromotions:{fr:'Offres & promos',   en:'Offers & promos', es:'Ofertas',          pt:'Ofertas',          ar:'العروض والتخفيضات',zh:'优惠活动'},
  };

  const currencies = ['FCFA','EUR','USD','GBP','CAD','JPY','CNY','SAR','AED'];

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">{t('nav.settings')}</h1>
        <p className="text-sm text-muted-foreground mb-6">{lang==='fr'?'Gérez vos informations et préférences':lang==='en'?'Manage your information and preferences':lang==='ar'?'إدارة معلوماتك وتفضيلاتك':lang==='zh'?'管理您的信息和偏好':'Gestiona tu información'}</p>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>{t('profile.saved')}</span>
          </div>
        )}

        <div className="flex overflow-x-auto gap-1 mb-6 pb-1">
          {TABS_KEYS.map(tk => (
            <button key={tk.id} onClick={() => setTab(tk.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${tab===tk.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
              <Icon name={tk.icon} size={15} /><span>{labels[tk.id]}</span>
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-5">

          {/* PROFIL */}
          {tab === 'profil' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.profil}</h2>
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-border">
                  {profile.photoUrl ? <img src={profile.photoUrl} alt="Photo" className="w-full h-full object-cover" /> : <Icon name="UserCircleIcon" size={36} className="text-primary" />}
                </div>
                <button onClick={() => photoRef.current?.click()} className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                  <Icon name="CameraIcon" size={13} className="text-primary-foreground" />
                </button>
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{profile.firstName||profile.lastName ? `${profile.firstName} ${profile.lastName}` : t('nav.profile')}</p>
                <p className="text-xs text-muted-foreground">{t('auth.buyer')} Bimark</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelCls}>{t('profile.firstName')}</label><input value={profile.firstName} onChange={e=>set('firstName',e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>{t('profile.lastName')}</label><input value={profile.lastName} onChange={e=>set('lastName',e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>{t('common.email')}</label><input type="email" value={profile.email} onChange={e=>set('email',e.target.value)} className={inputCls} /></div>
              <PhoneInput label={t('common.phone')} value={profile.phone} onChange={v=>set('phone',v)} />
            </div>
          </>}

          {/* ENTREPRISE */}
          {tab === 'entreprise' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.entreprise}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className={labelCls}>{lang==='fr'?'Nom de l\'entreprise':lang==='en'?'Company name':lang==='ar'?'اسم الشركة':lang==='zh'?'公司名称':'Nombre de empresa'}</label><input value={profile.company} onChange={e=>set('company',e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>{lang==='fr'?'Secteur':lang==='en'?'Industry':lang==='ar'?'القطاع':lang==='zh'?'行业':'Sector'}</label>
                <select value={profile.sector} onChange={e=>set('sector',e.target.value)} className={inputCls}>
                  <option value="">—</option>{(SECTORS[lang]||SECTORS.fr).map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>{lang==='fr'?'Taille':lang==='en'?'Size':lang==='ar'?'الحجم':lang==='zh'?'规模':'Tamaño'}</label>
                <select value={profile.employees} onChange={e=>set('employees',e.target.value)} className={inputCls}>
                  <option value="">—</option>{(SIZES[lang]||SIZES.fr).map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2"><label className={labelCls}>RCCM</label><input value={profile.rccm} onChange={e=>set('rccm',e.target.value)} className={inputCls} /></div>
            </div>
          </>}

          {/* ADRESSES */}
          {tab === 'livraison' && <>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-foreground">{labels.livraison}</h2>
              <button onClick={addAddress} className="flex items-center space-x-1 text-xs text-primary hover:underline font-medium"><Icon name="PlusIcon" size={14}/><span>{t('common.add')}</span></button>
            </div>
            <div className="space-y-4">
              {profile.addresses.map((addr, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <input value={addr.label} onChange={e=>updateAddr(idx,'label',e.target.value)} className="text-sm font-semibold text-foreground bg-transparent border-b border-dashed border-border focus:outline-none focus:border-primary pb-0.5 w-40" />
                    <div className="flex items-center gap-2">
                      {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{lang==='fr'?'Par défaut':lang==='en'?'Default':lang==='ar'?'افتراضي':lang==='zh'?'默认':'Por defecto'}</span>}
                      {profile.addresses.length > 1 && <button onClick={()=>removeAddr(idx)} className="p-1 text-error hover:bg-error/10 rounded transition-smooth"><Icon name="TrashIcon" size={14}/></button>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <CountrySelect value={addr.country} onChange={v=>updateAddr(idx,'country',v)} />
                    <div><label className="block text-xs text-muted-foreground mb-1">{t('common.city')}</label><input value={addr.city} onChange={e=>updateAddr(idx,'city',e.target.value)} className={`${inputCls} text-xs py-2`} /></div>
                    <div className="col-span-2"><label className="block text-xs text-muted-foreground mb-1">{t('common.address')}</label><input value={addr.address} onChange={e=>updateAddr(idx,'address',e.target.value)} className={`${inputCls} text-xs py-2`} /></div>
                    <div className="col-span-2"><PhoneInput value={addr.phone} onChange={v=>updateAddr(idx,'phone',v)} /></div>
                  </div>
                </div>
              ))}
            </div>
          </>}

          {/* SECURITE */}
          {tab === 'securite' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.securite}</h2>
            <div className="space-y-4">
              <div><label className={labelCls}>{t('profile.currentPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              <div><label className={labelCls}>{t('profile.newPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              <div><label className={labelCls}>{t('profile.confirmPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div><p className="text-sm font-medium text-foreground">2FA SMS</p></div>
                <button className="relative w-11 h-6 rounded-full bg-border"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" /></button>
              </div>
            </div>
          </>}

          {/* PREFERENCES */}
          {tab === 'preferences' && <>
            <h2 className="text-sm font-semibold text-foreground">{labels.preferences}</h2>
            <div className="space-y-3">
              {Object.entries(notifLabels).map(([key, lbls]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground">{lbls[lang]||lbls.fr}</p>
                  <button onClick={()=>set(key,!profile[key])} className={`relative w-11 h-6 rounded-full transition-smooth ${profile[key]?'bg-primary':'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${profile[key]?'left-6':'left-1'}`} />
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div><p className="text-sm font-medium text-foreground">{t('profile.theme')}</p><p className="text-xs text-muted-foreground">{theme==='dark'?t('profile.darkMode'):t('profile.lightMode')}</p></div>
                <button onClick={toggleTheme} className={`relative w-11 h-6 rounded-full transition-smooth ${theme==='dark'?'bg-primary':'bg-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${theme==='dark'?'left-6':'left-1'}`} />
                </button>
              </div>
              <div><label className={labelCls}>{t('profile.language')}</label>
                <select value={profile.language} onChange={e=>set('language',e.target.value)} className={inputCls}>
                  {[{c:'fr',l:'Français'},{c:'en',l:'English'},{c:'es',l:'Español'},{c:'pt',l:'Português'},{c:'ar',l:'العربية'},{c:'zh',l:'中文'}].map(l=><option key={l.c} value={l.c}>{l.l}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>{t('profile.currency')}</label>
                <select value={profile.currency} onChange={e=>set('currency',e.target.value)} className={inputCls}>
                  {currencies.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </>}
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={handleSave} className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
            <Icon name="CheckIcon" size={18} /><span>{t('common.save')}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
