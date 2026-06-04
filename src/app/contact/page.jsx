import Header from '@/components/common/Header';
import ContactContent from './components/ContactContent';

export const metadata = {
  title: 'Contact - Bimark',
  description: "Contactez l'équipe Bimark pour toute question ou assistance"
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactContent />
    </>
  );
}
