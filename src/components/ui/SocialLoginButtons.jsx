'use client';

import Link from 'next/link';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import FacebookIcon from '@/components/ui/icons/FacebookIcon';
import GitHubIcon from '@/components/ui/icons/GitHubIcon';

const PROVIDERS = [
  { id: 'google',   label: 'Google',   Icon: GoogleIcon,   border: 'border-red-200 dark:border-red-900',   bg: 'hover:bg-red-50 dark:hover:bg-red-950/20' },
  { id: 'facebook', label: 'Facebook', Icon: FacebookIcon, border: 'border-blue-200 dark:border-blue-900',  bg: 'hover:bg-blue-50 dark:hover:bg-blue-950/20' },
  { id: 'github',   label: 'GitHub',   Icon: GitHubIcon,   border: 'border-gray-200 dark:border-gray-700', bg: 'hover:bg-gray-50 dark:hover:bg-gray-800/50' },
];

const DIVIDER_LABELS = {
  fr: "Ou s'inscrire avec",
  en: 'Or sign up with',
  es: 'O registrarse con',
  pt: 'Ou cadastre-se com',
  ar: 'أو التسجيل عبر',
  zh: '或通过以下方式注册',
};

/**
 * Reusable social login/register buttons.
 * `href` — where to navigate on click (defaults to /user-login for register page)
 * `onSelect` — optional callback(providerId) for login page modal
 */
export default function SocialLoginButtons({ href, onSelect, lang = 'fr', showDivider = true }) {
  const dividerText = DIVIDER_LABELS[lang] || DIVIDER_LABELS.fr;

  return (
    <div>
      {showDivider && (
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-card text-muted-foreground">{dividerText}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {PROVIDERS.map(({ id, label, Icon, border, bg }) => {
          const sharedCls = `flex flex-col items-center justify-center gap-1.5 py-3 border rounded-xl transition-smooth ${bg} ${border}`;
          if (onSelect) {
            return (
              <button key={id} type="button" onClick={() => onSelect(id)} className={sharedCls}>
                <Icon />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </button>
            );
          }
          return (
            <Link key={id} href={href || '/user-login'} className={sharedCls}>
              <Icon />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
