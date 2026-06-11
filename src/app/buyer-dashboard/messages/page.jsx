import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import BuyerMessagesManager from './components/BuyerMessagesManager';

export const metadata = { title: 'Messages - Bimark' };

export default function BuyerMessagesPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="buyer" />
      <BuyerMessagesManager />
    </>
  );
}
