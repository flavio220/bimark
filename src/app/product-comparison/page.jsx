import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProductComparisonContent from './components/ProductComparisonContent';

export const metadata = {
  title: 'Comparer des produits - Bimark',
  description: 'Comparez côte à côte les produits et fournisseurs sur Bimark marketplace'
};

export default function ProductComparisonPage() {
  return (
    <>
      <Header />
      <ProductComparisonContent />
      <Footer />
    </>
  );
}
