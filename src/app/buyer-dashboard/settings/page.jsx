import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import BuyerAccountSettings from './components/BuyerAccountSettings';

export const metadata = { title: 'Paramètres du compte - Bimark' };

export default function BuyerSettingsPage() {
  return (<><Header /><DashboardSidebar userRole="buyer" /><BuyerAccountSettings /></>);
}
