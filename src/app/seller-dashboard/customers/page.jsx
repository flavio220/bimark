import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerCustomersManager from './components/SellerCustomersManager';

export const metadata = { title: 'Mes Clients - Bimark' };

export default function SellerCustomersPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerCustomersManager />
    </>
  );
}
