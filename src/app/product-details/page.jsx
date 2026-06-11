import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProductDetailsContent from './components/ProductDetailsContent';

export const metadata = {
  title: 'Détails du produit - Bimark',
  description: 'Consultez les détails complets, prix et informations fournisseur de ce produit sur Bimark'
};

export default function ProductDetailsPage() {
  return (
    <>
      <Header />
      <ProductDetailsContent />
      <Footer />
    </>
  );
}
