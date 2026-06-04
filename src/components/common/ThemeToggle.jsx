'use client';

import { useTheme } from './ThemeProvider';
import Icon from '@/components/ui/AppIcon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-muted transition-smooth text-foreground"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Mode sombre / Dark mode' : 'Mode clair / Light mode'}
    >
      {theme === 'light' ? (
        <Icon name="MoonIcon" size={20} />
      ) : (
        <Icon name="SunIcon" size={20} />
      )}
    </button>
  );
}
