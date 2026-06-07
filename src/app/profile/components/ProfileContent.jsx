'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';
import { useT } from '@/i18n/useTranslation';

export default function ProfileContent() {
  const router = useRouter();
  const { t, lang } = useT();
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [saved, setSaved] = useState(false);
  const photoRef = useRef();

  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', country:'', city:'', address:'', bio:'', company:'', sector:'', rccm:'', website:'', photoUrl:'' });

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    if (!auth) { router.push('/user-login'); return; }
    const stored = localStorage.getItem('bimark_profile');
    if (stored) setForm(JSON.parse(stored));
  }, [router]);

  const set = (k, v) => setForm(p => ({...p,[k]:v}));

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('bimark_profile', JSON.stringify(form));
    localStorage.setItem('userName', `${form.firstName||''} ${form.lastName||''}`.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set('photoUrl', ev.target.result);
    reader.readAsDataURL(file);
  };

  const dashboardHref = userRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
  const inputCls = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  const TABS = [
    { id:'personal', label: t('profile.personal'), icon:'UserCircleIcon' },
    { id:'company',  label: t('profile.company'),  icon:'BuildingOfficeIcon' },
    { id:'security', label: t('profile.security'), icon:'LockClosedIcon' },
  ];

  const SECTORS = {
    fr:['Commerce','Industrie','Agriculture','Construction','Transport','Santé','Éducation','Technologie','Finance','Autre'],
    en:['Trade','Industry','Agriculture','Construction','Transport','Health','Education','Technology','Finance','Other'],
    es:['Comercio','Industria','Agricultura','Construcción','Transporte','Salud','Educación','Tecnología','Finanzas','Otro'],
    pt:['Comércio','Indústria','Agricultura','Construção','Transporte','Saúde','Educação','Tecnologia','Finanças','Outro'],
    ar:['التجارة','الصناعة','الزراعة','البناء','النقل','الصحة','التعليم','التكنولوجيا','المالية','أخرى'],
    zh:['贸易','工业','农业','建筑','交通','健康','教育','技术','金融','其他'],
  };

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">{t('nav.home')}</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href={dashboardHref} className="hover:text-primary transition-smooth capitalize">{userRole === 'buyer' ? t('auth.buyer') : t('auth.seller')}</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">{t('nav.profile')}</span>
        </nav>

        {/* Profile header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold overflow-hidden">
              {form.photoUrl ? <img src={form.photoUrl} alt="Photo" className="w-full h-full object-cover" /> : (form.firstName?.charAt(0)||userRole?.charAt(0)||'U').toUpperCase()}
            </div>
            <button onClick={() => photoRef.current?.click()} className="absolute -bottom-1 -right-1 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-subtle">
              <Icon name="CameraIcon" size={13} className="text-foreground" />
            </button>
            <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{form.firstName&&form.lastName ? `${form.firstName} ${form.lastName}` : t('nav.profile')}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-muted-foreground capitalize">{userRole === 'buyer' ? t('auth.buyer') : t('auth.seller')}</span>
              {form.country && <><span className="text-muted-foreground">·</span><span className="text-sm text-muted-foreground">{form.country}</span></>}
            </div>
            <div className="flex items-center space-x-1 mt-2"><div className="w-2 h-2 rounded-full bg-success"></div><span className="text-xs text-muted-foreground">{lang==='fr'?'Compte actif':lang==='en'?'Active account':lang==='ar'?'حساب نشط':lang==='zh'?'账户已激活':'Cuenta activa'}</span></div>
          </div>
        </div>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>{t('profile.saved')}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <nav className="bg-card border border-border rounded-xl overflow-hidden">
              {TABS.map(tab_ => (
                <button key={tab_.id} onClick={() => setActiveTab(tab_.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 text-sm font-medium transition-smooth border-l-2 ${activeTab===tab_.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-foreground hover:bg-muted'}`}>
                  <Icon name={tab_.icon} size={18} /><span className="hidden lg:block">{tab_.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSave}>
              {activeTab === 'personal' && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-semibold text-foreground">{t('profile.personal')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>{t('profile.firstName')}</label><input value={form.firstName} onChange={e=>set('firstName',e.target.value)} placeholder={t('profile.firstName')} className={inputCls} /></div>
                    <div><label className={labelCls}>{t('profile.lastName')}</label><input value={form.lastName} onChange={e=>set('lastName',e.target.value)} placeholder={t('profile.lastName')} className={inputCls} /></div>
                    <div><label className={labelCls}>{t('common.email')}</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@email.com" className={inputCls} /></div>
                    <PhoneInput label={t('common.phone')} value={form.phone} onChange={v=>set('phone',v)} />
                  </div>
                  <CountrySelect label={t('common.country')} value={form.country} onChange={v=>set('country',v)} />
                  <div><label className={labelCls}>{t('common.city')}</label><input value={form.city} onChange={e=>set('city',e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>{t('common.address')}</label><input value={form.address} onChange={e=>set('address',e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>{lang==='fr'?'Biographie':lang==='en'?'Bio':lang==='ar'?'نبذة':lang==='zh'?'简介':'Biografía'}</label>
                    <textarea value={form.bio} onChange={e=>set('bio',e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-semibold text-foreground">{t('profile.company')}</h2>
                  <div><label className={labelCls}>{lang==='fr'?"Nom de l'entreprise":lang==='en'?'Company name':lang==='ar'?'اسم الشركة':lang==='zh'?'公司名称':'Nombre de empresa'}</label><input value={form.company} onChange={e=>set('company',e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>{lang==='fr'?'Secteur':lang==='en'?'Industry':lang==='ar'?'القطاع':lang==='zh'?'行业':'Sector'}</label>
                    <select value={form.sector} onChange={e=>set('sector',e.target.value)} className={inputCls}>
                      <option value="">—</option>{(SECTORS[lang]||SECTORS.fr).map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>RCCM</label><input value={form.rccm} onChange={e=>set('rccm',e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>{t('common.website')}</label><input type="url" value={form.website} onChange={e=>set('website',e.target.value)} placeholder="https://" className={inputCls} /></div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="ShieldCheckIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">{lang==='fr'?'Vérification entreprise':lang==='en'?'Business verification':lang==='ar'?'التحقق من الشركة':lang==='zh'?'企业认证':'Verificación empresa'}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{lang==='fr'?'Obtenez le badge de confiance Bimark':lang==='en'?'Get the Bimark trust badge':lang==='ar'?'احصل على شارة الثقة من بيمارك':lang==='zh'?'获取Bimark信任徽章':'Obtén la insignia de confianza Bimark'}</p>
                        <button type="button" className="text-xs font-medium text-primary hover:underline">{lang==='fr'?'Démarrer →':lang==='en'?'Start →':lang==='ar'?'ابدأ ←':lang==='zh'?'开始 →':'Iniciar →'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-semibold text-foreground">{t('profile.security')}</h2>
                  <div><label className={labelCls}>{t('profile.currentPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
                  <div><label className={labelCls}>{t('profile.newPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
                  <div><label className={labelCls}>{t('profile.confirmPwd')}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div><p className="text-sm font-medium text-foreground">2FA SMS</p><p className="text-xs text-muted-foreground">{lang==='fr'?'Code SMS à chaque connexion':lang==='en'?'SMS code on each login':lang==='ar'?'رمز SMS عند كل تسجيل دخول':lang==='zh'?'每次登录发送短信验证码':'Código SMS en cada inicio'}</p></div>
                    <button type="button" className="relative w-11 h-6 rounded-full bg-border"><div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" /></button>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button type="submit" className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
                  <Icon name="CheckIcon" size={18} /><span>{t('common.save')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
