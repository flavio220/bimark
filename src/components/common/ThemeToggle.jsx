'use client';

import { useTheme } from './ThemeProvider';
import { useT } from '@/i18n/useTranslation';
import Icon from '@/components/ui/AppIcon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useT();

  return (
    <button onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-muted transition-smooth text-foreground"
      aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
      title={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}>
      {theme === 'light'
        ? <Icon name="MoonIcon" size={20} />
        : <Icon name="SunIcon" size={20} />}
    </button>
  );
}
