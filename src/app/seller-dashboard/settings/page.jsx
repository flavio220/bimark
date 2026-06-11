import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerShopSettings from './components/SellerShopSettings';

export const metadata = { title: 'Ma Boutique - Bimark' };

export default function SellerSettingsPage() {
  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerShopSettings />
    </>
  );
}
