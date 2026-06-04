import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerOrdersManager from './components/SellerOrdersManager';

export const metadata = { title: 'Commandes reçues - Bimark' };

export default function SellerOrdersPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerOrdersManager />
    </>
  );
}
