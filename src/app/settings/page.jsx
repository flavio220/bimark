import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SettingsContent from './components/SettingsContent';

export const metadata = {
  title: 'Paramètres - Bimark',
  description: 'Gérez les paramètres de votre compte Bimark'
};

export default function SettingsPage() {
  return (
    <>
      <Header />
      <SettingsContent />
      <Footer />
    </>
  );
}
