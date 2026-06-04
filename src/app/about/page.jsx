import Header from '@/components/common/Header';
import AboutContent from './components/AboutContent';

export const metadata = {
  title: 'À propos - Bimark',
  description: 'Découvrez Bimark, la marketplace B2B bilingue franco-anglophone'
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutContent />
    </>
  );
}
