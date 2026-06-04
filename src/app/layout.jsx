import '../styles/index.css';
import ThemeProvider from '@/components/common/ThemeProvider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Bimark - Global B2B & B2C Marketplace',
  description: 'Connect with verified suppliers and manufacturers worldwide. Bilingual French-English marketplace.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
