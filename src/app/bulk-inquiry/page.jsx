import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BulkInquiryContent from './components/BulkInquiryContent';

export const metadata = {
  title: 'Demande en gros - Bimark',
  description: 'Soumettez une demande de devis en gros auprès des fournisseurs vérifiés Bimark'
};

export default function BulkInquiryPage() {
  return (
    <>
      <Header />
      <BulkInquiryContent />
      <Footer />
    </>
  );
}
