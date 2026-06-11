'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import FacebookIcon from '@/components/ui/icons/FacebookIcon';
import GitHubIcon from '@/components/ui/icons/GitHubIcon';

// ─── Faux profils sociaux (simulation sans OAuth SDK) ────────────────────────
const SOCIAL_PROFILES = {
  google: {
    buyer: { name: 'Alex Dupont', email: 'alex.dupont@gmail.com', avatar: 'AD', provider: 'Google' },
    seller: { name: 'Marie Kouassi', email: 'marie.kouassi@gmail.com', avatar: 'MK', provider: 'Google' },
  },
  facebook: {
    buyer: { name: 'Jean Traoré', email: 'jean.traore@gmail.com', avatar: 'JT', provider: 'Facebook' },
    seller: { name: 'Fatou Diallo', email: 'fatou.diallo@gmail.com', avatar: 'FD', provider: 'Facebook' },
  },
  github: {
    buyer: { name: 'Dev User', email: 'dev.user@github.com', avatar: 'DU', provider: 'GitHub' },
    seller: { name: 'Tech Seller', email: 'tech.seller@github.com', avatar: 'TS', provider: 'GitHub' },
  },
};


const PROVIDERS = [
  { id: 'google',   label: 'Google',   Icon: GoogleIcon,   border: 'border-red-200 dark:border-red-900',   bg: 'hover:bg-red-50 dark:hover:bg-red-950/20' },
  { id: 'facebook', label: 'Facebook', Icon: FacebookIcon, border: 'border-blue-200 dark:border-blue-900',  bg: 'hover:bg-blue-50 dark:hover:bg-blue-950/20' },
  { id: 'github',   label: 'GitHub',   Icon: GitHubIcon,   border: 'border-gray-200 dark:border-gray-700', bg: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' },
];

const LABELS = {
  fr: {
    chooseRole: 'Choisissez votre rôle',
    chooseRoleDesc: (provider) => `Comment souhaitez-vous utiliser Bimark avec votre compte ${provider} ?`,
    buyer: 'Je suis Acheteur', buyerDesc: 'Je cherche des produits et fournisseurs',
    seller: 'Je suis Vendeur', sellerDesc: 'Je vends des produits sur Bimark',
    cancel: 'Annuler',
    connecting: (p) => `Connexion avec ${p}...`,
    connected: (p, name) => `Connecté avec ${p} en tant que ${name}`,
    orWith: 'Ou continuer avec',
    signIn: 'Se connecter',
    signingIn: 'Connexion...',
    email: 'Email', emailPh: 'votre@email.com',
    password: 'Mot de passe', passwordPh: 'Votre mot de passe',
    remember: 'Se souvenir de moi', forgot: 'Mot de passe oublié ?',
    testCredentials: 'Identifiants de test :',
    invalidCred: 'Email ou mot de passe invalide.',
    required: (f) => `${f} requis`,
    tooMany: 'Trop de tentatives. Attendez quelques secondes.',
  },
  en: {
    chooseRole: 'Choose your role',
    chooseRoleDesc: (provider) => `How would you like to use Bimark with your ${provider} account?`,
    buyer: 'I am a Buyer', buyerDesc: 'I look for products and suppliers',
    seller: 'I am a Seller', sellerDesc: 'I sell products on Bimark',
    cancel: 'Cancel',
    connecting: (p) => `Connecting with ${p}...`,
    connected: (p, name) => `Connected with ${p} as ${name}`,
    orWith: 'Or continue with',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    email: 'Email', emailPh: 'your@email.com',
    password: 'Password', passwordPh: 'Your password',
    remember: 'Remember me', forgot: 'Forgot password?',
    testCredentials: 'Test credentials:',
    invalidCred: 'Invalid email or password.',
    required: (f) => `${f} required`,
    tooMany: 'Too many attempts. Please wait.',
  },
  es: {
    chooseRole: 'Elige tu rol',
    chooseRoleDesc: (provider) => `¿Cómo quieres usar Bimark con tu cuenta de ${provider}?`,
    buyer: 'Soy Comprador', buyerDesc: 'Busco productos y proveedores',
    seller: 'Soy Vendedor', sellerDesc: 'Vendo productos en Bimark',
    cancel: 'Cancelar',
    connecting: (p) => `Conectando con ${p}...`,
    connected: (p, name) => `Conectado con ${p} como ${name}`,
    orWith: 'O continuar con',
    signIn: 'Iniciar sesión', signingIn: 'Iniciando...',
    email: 'Email', emailPh: 'tu@email.com',
    password: 'Contraseña', passwordPh: 'Tu contraseña',
    remember: 'Recuérdame', forgot: '¿Olvidaste la contraseña?',
    testCredentials: 'Credenciales de prueba:',
    invalidCred: 'Email o contraseña inválidos.',
    required: (f) => `${f} obligatorio`,
    tooMany: 'Demasiados intentos. Espera.',
  },
  pt: {
    chooseRole: 'Escolha seu papel',
    chooseRoleDesc: (provider) => `Como deseja usar o Bimark com sua conta ${provider}?`,
    buyer: 'Sou Comprador', buyerDesc: 'Procuro produtos e fornecedores',
    seller: 'Sou Vendedor', sellerDesc: 'Vendo produtos no Bimark',
    cancel: 'Cancelar',
    connecting: (p) => `Conectando com ${p}...`,
    connected: (p, name) => `Conectado com ${p} como ${name}`,
    orWith: 'Ou continuar com',
    signIn: 'Entrar', signingIn: 'Entrando...',
    email: 'Email', emailPh: 'seu@email.com',
    password: 'Senha', passwordPh: 'Sua senha',
    remember: 'Lembrar-me', forgot: 'Esqueceu a senha?',
    testCredentials: 'Credenciais de teste:',
    invalidCred: 'Email ou senha inválidos.',
    required: (f) => `${f} obrigatório`,
    tooMany: 'Muitas tentativas. Aguarde.',
  },
  ar: {
    chooseRole: 'اختر دورك',
    chooseRoleDesc: (provider) => `كيف تريد استخدام بيمارك بحساب ${provider} الخاص بك؟`,
    buyer: 'أنا مشتري', buyerDesc: 'أبحث عن منتجات وموردين',
    seller: 'أنا بائع', sellerDesc: 'أبيع منتجات على بيمارك',
    cancel: 'إلغاء',
    connecting: (p) => `جارٍ الاتصال بـ ${p}...`,
    connected: (p, name) => `متصل بـ ${p} باسم ${name}`,
    orWith: 'أو المتابعة مع',
    signIn: 'تسجيل الدخول', signingIn: 'جارٍ تسجيل الدخول...',
    email: 'البريد الإلكتروني', emailPh: 'بريدك@الإلكتروني.com',
    password: 'كلمة المرور', passwordPh: 'كلمة المرور',
    remember: 'تذكرني', forgot: 'نسيت كلمة المرور؟',
    testCredentials: 'بيانات الاختبار:',
    invalidCred: 'بريد إلكتروني أو كلمة مرور غير صحيحة.',
    required: (f) => `${f} مطلوب`,
    tooMany: 'محاولات كثيرة. انتظر لحظة.',
  },
  zh: {
    chooseRole: '选择您的角色',
    chooseRoleDesc: (provider) => `您希望如何使用 ${provider} 账号登录 Bimark？`,
    buyer: '我是买家', buyerDesc: '我寻找产品和供应商',
    seller: '我是卖家', sellerDesc: '我在 Bimark 上销售产品',
    cancel: '取消',
    connecting: (p) => `正在连接 ${p}...`,
    connected: (p, name) => `已以 ${name} 身份通过 ${p} 登录`,
    orWith: '或继续使用',
    signIn: '登录', signingIn: '登录中...',
    email: '邮箱', emailPh: 'your@email.com',
    password: '密码', passwordPh: '您的密码',
    remember: '记住我', forgot: '忘记密码？',
    testCredentials: '测试账号：',
    invalidCred: '邮箱或密码无效。',
    required: (f) => `${f}不能为空`,
    tooMany: '尝试次数过多，请稍候。',
  },
};



export default function LoginForm({ translations }) {
  const router = useRouter();
  const lang = (typeof window !== 'undefined' ? localStorage.getItem('language') : null) || 'fr';
  const tl = LABELS[lang] || LABELS.fr;

  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Social login state
  const [socialModal, setSocialModal] = useState(null); // { provider, providerLabel, icon }
  const [socialLoading, setSocialLoading] = useState(null);
  const [socialSuccess, setSocialSuccess] = useState(null);

  const mockCredentials = {
    buyer:  { email: 'buyer@bimark.com',  password: 'Buyer@123' },
    seller: { email: 'seller@bimark.com', password: 'Seller@123' },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = tl.required(tl.email);
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = translations?.errors?.emailInvalid || 'Email invalide';
    if (!formData.password) newErrors.password = tl.required(tl.password);
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const isBuyer  = formData.email === mockCredentials.buyer.email  && formData.password === mockCredentials.buyer.password;
    const isSeller = formData.email === mockCredentials.seller.email && formData.password === mockCredentials.seller.password;

    if (isBuyer || isSeller) {
      const role = isBuyer ? 'buyer' : 'seller';
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', formData.email);
      if (formData.rememberMe) localStorage.setItem('rememberMe', 'true');
      router.push(isBuyer ? '/buyer-dashboard' : '/seller-dashboard');
    } else {
      setLoginAttempts(p => p + 1);
      setErrors({ submit: tl.invalidCred });
      setIsLoading(false);
    }
  };

  // ─── Social login: step 1 — show role chooser modal ─────────────────────
  const openSocialModal = (providerId) => {
    const p = PROVIDERS.find(p => p.id === providerId);
    setSocialModal(p);
    setErrors({});
  };

  // ─── Social login: step 2 — user picks buyer or seller ───────────────────
  const completeSocialLogin = async (role) => {
    if (!socialModal) return;
    setSocialLoading(role);
    const profile = SOCIAL_PROFILES[socialModal.id][role];

    // Simulate OAuth redirect + token exchange (1.5s)
    await new Promise(r => setTimeout(r, 1500));

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', profile.email);
    localStorage.setItem('userName', profile.name);
    localStorage.setItem('socialProvider', socialModal.label);
    if (role === 'seller') {
      localStorage.setItem('shopName', `${profile.name.split(' ')[0]}'s Shop`);
    }

    setSocialSuccess({ provider: socialModal.label, name: profile.name });
    setSocialModal(null);
    setSocialLoading(null);

    await new Promise(r => setTimeout(r, 800));
    router.push(role === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard');
  };

  const inputCls = (err) =>
    `w-full pl-10 pr-4 py-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${err ? 'border-error focus:ring-error/50' : 'border-border focus:ring-primary/50'}`;

  return (
    <div className="w-full max-w-md">
      {/* Social success banner */}
      {socialSuccess && (
        <div className="mb-4 flex items-center space-x-3 p-4 bg-success/10 border border-success/20 rounded-xl animate-slide-in">
          <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0" />
          <p className="text-sm font-medium text-success">{tl.connected(socialSuccess.provider, socialSuccess.name)}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{tl.email}</label>
          <div className="relative">
            <Icon name="EnvelopeIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className={inputCls(errors.email)} placeholder={tl.emailPh} disabled={isLoading} autoComplete="email" />
          </div>
          {errors.email && <p className="mt-1 text-xs text-error flex items-center gap-1"><Icon name="ExclamationCircleIcon" size={14} />{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{tl.password}</label>
          <div className="relative">
            <Icon name="LockClosedIcon" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
              className={`${inputCls(errors.password)} pr-12`} placeholder={tl.passwordPh} disabled={isLoading} autoComplete="current-password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth">
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-error flex items-center gap-1"><Icon name="ExclamationCircleIcon" size={14} />{errors.password}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange}
              className="w-4 h-4 border-border rounded text-primary focus:ring-2 focus:ring-primary/50" disabled={isLoading} />
            <span className="text-sm text-foreground">{tl.remember}</span>
          </label>
          <button type="button" className="text-sm text-primary hover:underline" disabled={isLoading}>{tl.forgot}</button>
        </div>

        {/* Submit error */}
        {errors.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg flex items-start gap-2">
            <Icon name="ExclamationTriangleIcon" size={18} className="text-error flex-shrink-0 mt-0.5" />
            <div className="text-sm text-error">{errors.submit}</div>
          </div>
        )}

        {/* Too many attempts */}
        {loginAttempts >= 3 && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg flex items-center gap-2 text-sm text-warning">
            <Icon name="ShieldExclamationIcon" size={18} className="flex-shrink-0" />
            {tl.tooMany}
          </div>
        )}

        {/* Test credentials hint */}
        <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <p className="font-semibold mb-1">{tl.testCredentials}</p>
          <p>🛒 Acheteur: buyer@bimark.com / Buyer@123</p>
          <p>🏪 Vendeur: seller@bimark.com / Seller@123</p>
        </div>

        {/* Submit */}
        <button type="submit" disabled={isLoading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 flex items-center justify-center space-x-2">
          {isLoading ? (
            <><Icon name="ArrowPathIcon" size={18} className="animate-spin" /><span>{tl.signingIn}</span></>
          ) : (
            <><Icon name="ArrowRightOnRectangleIcon" size={18} /><span>{tl.signIn}</span></>
          )}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-card text-muted-foreground">{tl.orWith}</span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-3">
          {PROVIDERS.map(({ id, label, Icon, border, bg }) => (
            <button key={id} type="button"
              onClick={() => openSocialModal(id)}
              disabled={isLoading}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 border rounded-xl transition-smooth disabled:opacity-50 ${bg} ${border}`}>
              <Icon />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </form>

      {/* ─── Social Role Chooser Modal ─────────────────────────────────────── */}
      {socialModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
          onClick={() => !socialLoading && setSocialModal(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-slide-in"
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <socialModal.Icon />
              </div>
              <h2 className="text-lg font-bold text-foreground">{tl.chooseRole}</h2>
              <p className="text-sm text-muted-foreground mt-1">{tl.chooseRoleDesc(socialModal.label)}</p>
            </div>

            {/* Role cards */}
            <div className="space-y-3 mb-4">
              {/* Buyer */}
              <button onClick={() => completeSocialLogin('buyer')}
                disabled={!!socialLoading}
                className="w-full flex items-center gap-4 p-4 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-smooth disabled:opacity-60 group text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-smooth">
                  {socialLoading === 'buyer'
                    ? <Icon name="ArrowPathIcon" size={22} className="text-primary animate-spin" />
                    : <Icon name="ShoppingCartIcon" size={22} className="text-primary" />}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{tl.buyer}</p>
                  <p className="text-xs text-muted-foreground">{tl.buyerDesc}</p>
                </div>
                {socialLoading === 'buyer' && (
                  <span className="ml-auto text-xs text-primary font-medium">{tl.connecting(socialModal.label)}</span>
                )}
              </button>

              {/* Seller */}
              <button onClick={() => completeSocialLogin('seller')}
                disabled={!!socialLoading}
                className="w-full flex items-center gap-4 p-4 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-smooth disabled:opacity-60 group text-left">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-smooth">
                  {socialLoading === 'seller'
                    ? <Icon name="ArrowPathIcon" size={22} className="text-accent animate-spin" />
                    : <Icon name="BuildingStorefrontIcon" size={22} className="text-accent" />}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{tl.seller}</p>
                  <p className="text-xs text-muted-foreground">{tl.sellerDesc}</p>
                </div>
                {socialLoading === 'seller' && (
                  <span className="ml-auto text-xs text-accent font-medium">{tl.connecting(socialModal.label)}</span>
                )}
              </button>
            </div>

            {/* Cancel */}
            <button onClick={() => setSocialModal(null)} disabled={!!socialLoading}
              className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-smooth disabled:opacity-40">
              {tl.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

LoginForm.propTypes = { translations: PropTypes.object };
