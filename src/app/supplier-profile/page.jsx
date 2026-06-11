import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SupplierProfileContent from './components/SupplierProfileContent';

export const metadata = {
  title: 'Profil fournisseur - Bimark',
  description: 'Consultez le profil et les produits de ce fournisseur sur Bimark'
};

export default function SupplierProfilePage() {
  return (
    <>
      <Header />
      <SupplierProfileContent />
      <Footer />
    </>
  );
}
