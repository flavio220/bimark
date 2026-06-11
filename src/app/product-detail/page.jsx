import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProductDetailContent from './components/ProductDetailContent';

export const metadata = {
  title: 'Détail produit - Bimark',
  description: 'Consultez les détails du produit sur Bimark marketplace'
};

export default function ProductDetailPage() {
  return (
    <>
      <Header />
      <ProductDetailContent />
      <Footer />
    </>
  );
}
