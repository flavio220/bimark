import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerMessagesManager from './components/SellerMessagesManager';

export const metadata = { title: 'Messages - Bimark' };

export default function SellerMessagesPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerMessagesManager />
    </>
  );
}
