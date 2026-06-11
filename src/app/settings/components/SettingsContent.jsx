'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/components/common/ThemeProvider';
import { useT } from '@/i18n/useTranslation';
import { SUPPORTED_LANGUAGES } from '@/i18n/translations';

export default function SettingsContent() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t, lang } = useT();
  const [userRole, setUserRole] = useState(null);
  const [toggles, setToggles] = useState({ 'email-notif': true, 'sms-notif': false, 'marketing': true, '2fa': false });
  const [currency, setCurrency] = useState('FCFA');
  const [activeModal, setActiveModal] = useState(null);
  const [savedKey, setSavedKey] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    if (!auth) router.push('/user-login');
    setCurrency(localStorage.getItem('currency') || 'FCFA');
  }, [router]);

  const flash = (key) => { setSavedKey(key); setTimeout(() => setSavedKey(null), 2000); };

  const handleToggle = (id) => { setToggles(p => ({ ...p, [id]: !p[id] })); flash(id); };

  const handleCurrency = (cur) => {
    setCurrency(cur);
    localStorage.setItem('currency', cur);
    setActiveModal(null);
    flash('currency');
  };

  const handleLang = (code) => {
    localStorage.setItem('language', code);
    setActiveModal(null);
    document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
    window.dispatchEvent(new Event('bimark-lang-change'));
    flash('language');
  };

  const dashboardHref = userRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';

  // Section definitions — labels depend on lang
  const SECTIONS = [
    {
      id: 'account', icon: 'UserCircleIcon',
      title: { fr:'Compte & Profil', en:'Account & Profile', es:'Cuenta y Perfil', pt:'Conta e Perfil', ar:'الحساب والملف الشخصي', zh:'账户与资料' },
      items: [
        { id:'profile', icon:'UserIcon',
          label: { fr:'Modifier le profil', en:'Edit profile', es:'Editar perfil', pt:'Editar perfil', ar:'تعديل الملف', zh:'编辑资料' },
          desc:  { fr:'Nom, photo, coordonnées', en:'Name, photo, contacts', es:'Nombre, foto, contactos', pt:'Nome, foto, contatos', ar:'الاسم والصورة والبيانات', zh:'姓名、照片、联系方式' },
          href: '/profile' },
        { id:'company', icon:'BuildingOfficeIcon',
          label: { fr:'Informations entreprise', en:'Company info', es:'Info empresa', pt:'Info empresa', ar:'معلومات الشركة', zh:'公司信息' },
          desc:  { fr:'Documents et vérification', en:'Documents & verification', es:'Documentos y verificación', pt:'Documentos e verificação', ar:'المستندات والتحقق', zh:'文件与验证' },
          href: '/profile' },
      ]
    },
    {
      id: 'prefs', icon: 'AdjustmentsHorizontalIcon',
      title: { fr:'Préférences', en:'Preferences', es:'Preferencias', pt:'Preferências', ar:'التفضيلات', zh:'偏好设置' },
      items: [
        { id:'language', icon:'LanguageIcon',
          label: { fr:'Langue', en:'Language', es:'Idioma', pt:'Idioma', ar:'اللغة', zh:'语言' },
          desc:  null, action: 'language' },
        { id:'theme', icon:'SwatchIcon',
          label: { fr:'Thème', en:'Theme', es:'Tema', pt:'Tema', ar:'المظهر', zh:'主题' },
          desc:  null, action: 'theme' },
        { id:'currency', icon:'CurrencyDollarIcon',
          label: { fr:'Devise', en:'Currency', es:'Moneda', pt:'Moeda', ar:'العملة', zh:'货币' },
          desc:  null, action: 'currency' },
      ]
    },
    {
      id: 'notifs', icon: 'BellIcon',
      title: { fr:'Notifications', en:'Notifications', es:'Notificaciones', pt:'Notificações', ar:'الإشعارات', zh:'通知' },
      items: [
        { id:'email-notif', icon:'EnvelopeIcon',
          label: { fr:'Notifications email', en:'Email notifications', es:'Notificaciones email', pt:'Notificações email', ar:'إشعارات البريد', zh:'邮件通知' },
          desc:  { fr:'Commandes, messages', en:'Orders, messages', es:'Pedidos, mensajes', pt:'Pedidos, mensagens', ar:'الطلبات والرسائل', zh:'订单和消息' },
          toggle: true },
        { id:'sms-notif', icon:'DevicePhoneMobileIcon',
          label: { fr:'Notifications SMS', en:'SMS notifications', es:'Notificaciones SMS', pt:'Notificações SMS', ar:'إشعارات SMS', zh:'短信通知' },
          desc:  { fr:'Alertes importantes', en:'Important alerts', es:'Alertas importantes', pt:'Alertas importantes', ar:'التنبيهات المهمة', zh:'重要提醒' },
          toggle: true },
        { id:'marketing', icon:'MegaphoneIcon',
          label: { fr:'Emails marketing', en:'Marketing emails', es:'Emails de marketing', pt:'Emails de marketing', ar:'رسائل تسويقية', zh:'营销邮件' },
          desc:  { fr:'Offres et nouveautés', en:'Offers and news', es:'Ofertas y novedades', pt:'Ofertas e novidades', ar:'العروض والأخبار', zh:'优惠和新闻' },
          toggle: true },
      ]
    },
    {
      id: 'security', icon: 'ShieldCheckIcon',
      title: { fr:'Sécurité', en:'Security', es:'Seguridad', pt:'Segurança', ar:'الأمان', zh:'安全' },
      items: [
        { id:'password', icon:'LockClosedIcon',
          label: { fr:'Changer le mot de passe', en:'Change password', es:'Cambiar contraseña', pt:'Alterar senha', ar:'تغيير كلمة المرور', zh:'更改密码' },
          desc:  { fr:'Modifier vos identifiants', en:'Update your credentials', es:'Actualizar credenciales', pt:'Atualizar credenciais', ar:'تحديث بياناتك', zh:'更新您的凭据' },
          href: '/profile' },
        { id:'2fa', icon:'FingerPrintIcon',
          label: { fr:'Authentification 2 facteurs', en:'Two-factor authentication', es:'Autenticación 2 factores', pt:'Autenticação 2 fatores', ar:'المصادقة الثنائية', zh:'双因素认证' },
          desc:  { fr:'Sécurité renforcée par SMS', en:'Enhanced security via SMS', es:'Seguridad mejorada por SMS', pt:'Segurança reforçada por SMS', ar:'أمان معزز عبر SMS', zh:'通过短信增强安全性' },
          toggle: true },
      ]
    },
  ];

  const L = (obj) => (obj && (obj[lang] || obj.fr)) || '';
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];

  const getDesc = (item) => {
    if (item.action === 'theme') return theme === 'dark' ? t('profile.darkMode') : t('profile.lightMode');
    if (item.action === 'language') return `${currentLangObj.flag} ${currentLangObj.label}`;
    if (item.action === 'currency') return currency;
    return L(item.desc);
  };

  const getActionLabel = (item) => {
    const base = { fr:'Modifier', en:'Edit', es:'Editar', pt:'Editar', ar:'تعديل', zh:'编辑' };
    if (item.action === 'theme') return { fr:'Basculer', en:'Toggle', es:'Cambiar', pt:'Alternar', ar:'تبديل', zh:'切换' }[lang] || 'Toggle';
    return base[lang] || 'Edit';
  };

  const currencies = ['FCFA','EUR','USD','GBP','CAD','JPY','CNY','SAR','AED','CHF','NGN','KES','GHS','ZAR'];

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">{t('nav.home')}</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href={dashboardHref} className="hover:text-primary transition-smooth capitalize">{userRole === 'buyer' ? t('auth.buyer') : t('auth.seller')}</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">{t('nav.settings')}</span>
        </nav>

        <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.settings')}</h1>

        {savedKey && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>{t('profile.saved')}</span>
          </div>
        )}

        <div className="space-y-6">
          {SECTIONS.map(section => (
            <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center space-x-3 px-5 py-4 border-b border-border bg-muted/30">
                <Icon name={section.icon} size={18} className="text-primary" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{L(section.title)}</h2>
              </div>
              <div className="divide-y divide-border">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-smooth">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} size={18} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{L(item.label)}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{getDesc(item)}</p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {item.toggle ? (
                        <button onClick={() => handleToggle(item.id)}
                          className={`relative w-11 h-6 rounded-full transition-smooth ${toggles[item.id] ? 'bg-primary' : 'bg-border'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${toggles[item.id] ? 'left-6' : 'left-1'}`} />
                        </button>
                      ) : item.href ? (
                        <Link href={item.href} className="flex items-center space-x-1 text-sm text-primary hover:underline font-medium">
                          <span>{getActionLabel(item)}</span><Icon name="ChevronRightIcon" size={14} />
                        </Link>
                      ) : (
                        <button onClick={() => item.action === 'theme' ? toggleTheme() : setActiveModal(item.action)}
                          className="flex items-center space-x-1 text-sm text-primary hover:underline font-medium">
                          <span>{getActionLabel(item)}</span><Icon name="ChevronRightIcon" size={14} />
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
              <h2 className="text-sm font-semibold text-error uppercase tracking-wider">
                {lang==='fr'?'Zone de danger':lang==='en'?'Danger Zone':lang==='ar'?'منطقة الخطر':lang==='zh'?'危险区域':lang==='es'?'Zona de peligro':'Zona de perigo'}
              </h2>
            </div>
            <div className="px-5 py-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{lang==='fr'?'Désactiver le compte':lang==='en'?'Deactivate account':lang==='ar'?'تعطيل الحساب':lang==='zh'?'停用账户':lang==='es'?'Desactivar cuenta':'Desativar conta'}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{lang==='fr'?'Suspension temporaire':lang==='en'?'Temporary suspension':lang==='ar'?'تعليق مؤقت':lang==='zh'?'临时暂停':lang==='es'?'Suspensión temporal':'Suspensão temporária'}</p>
              </div>
              <button className="px-4 py-2 border border-error text-error rounded-lg text-sm font-medium hover:bg-error/10 transition-smooth">
                {lang==='fr'?'Désactiver':lang==='en'?'Deactivate':lang==='ar'?'تعطيل':lang==='zh'?'停用':lang==='es'?'Desactivar':'Desativar'}
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">{t('contact.needHelp')}</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="tel:+2290150882676" className="flex items-center space-x-2 text-primary hover:underline"><Icon name="PhoneIcon" size={14} /><span>+229 01 50 88 26 76</span></a>
              <a href="tel:+2290140903261" className="flex items-center space-x-2 text-primary hover:underline"><Icon name="PhoneIcon" size={14} /><span>+229 01 40 90 32 61</span></a>
              <a href="mailto:flavioadantchede@gmail.com" className="flex items-center space-x-2 text-primary hover:underline"><Icon name="EnvelopeIcon" size={14} /><span>Email</span></a>
              <Link href="/contact" className="flex items-center space-x-2 text-primary hover:underline"><Icon name="ChatBubbleLeftRightIcon" size={14} /><span>{t('footer.contact')}</span></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Language modal */}
      {activeModal === 'language' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm animate-slide-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-foreground mb-4">{t('profile.language')}</h3>
            <div className="space-y-1.5">
              {SUPPORTED_LANGUAGES.map(l => (
                <button key={l.code} onClick={() => handleLang(l.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border transition-smooth ${lang === l.code ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted text-foreground'}`}>
                  <span className="text-xl">{l.flag}</span>
                  <span className="font-medium flex-1 text-left">{l.label}</span>
                  {lang === l.code && <Icon name="CheckIcon" size={16} className="text-primary" />}
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
            <h3 className="text-base font-semibold text-foreground mb-4">{t('profile.currency')}</h3>
            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {currencies.map(cur => (
                <button key={cur} onClick={() => handleCurrency(cur)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-smooth ${currency === cur ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted text-foreground'}`}>
                  <span className="font-medium">{cur}</span>
                  {currency === cur && <Icon name="CheckIcon" size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
