import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProfileContent from './components/ProfileContent';

export const metadata = {
  title: 'Mon profil - Bimark',
  description: 'Gérez votre profil et vos informations personnelles sur Bimark'
};

export default function ProfilePage() {
  return (
    <>
      <Header />
      <ProfileContent />
      <Footer />
    </>
  );
}
