import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import BuyerSuppliersManager from './components/BuyerSuppliersManager';

export const metadata = { title: 'Mes Fournisseurs - Bimark' };

export default function BuyerSuppliersPage() {
  return (<><Header /><DashboardSidebar userRole="buyer" /><BuyerSuppliersManager /></>);
}
