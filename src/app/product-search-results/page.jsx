import Header from '@/components/common/Header';
import SearchResultsInteractive from './components/SearchResultsInteractive';

export const metadata = {
  title: 'Recherche de produits - Bimark',
  description: 'Recherchez des produits auprès de fournisseurs vérifiés sur Bimark. Comparez les prix, demandez des devis en gros.',
};

export default function ProductSearchResultsPage() {
  return (
    <>
      <Header />
      <SearchResultsInteractive />
    </>
  );
}