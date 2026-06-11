import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerAnalytics from './components/SellerAnalytics';

export const metadata = { title: 'Statistiques - Bimark' };

export default function SellerAnalyticsPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerAnalytics />
    </>
  );
}
