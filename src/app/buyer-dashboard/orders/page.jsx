import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import BuyerOrdersManager from './components/BuyerOrdersManager';

export const metadata = { title: 'Mes Commandes - Bimark' };

export default function BuyerOrdersPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="buyer" />
      <BuyerOrdersManager />
    </>
  );
}
