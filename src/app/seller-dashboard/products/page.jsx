import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerProductsManager from './components/SellerProductsManager';

export const metadata = { title: 'Mes Produits - Bimark' };

export default function SellerProductsPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerProductsManager />
    </>
  );
}
