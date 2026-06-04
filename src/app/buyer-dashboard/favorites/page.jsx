import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import BuyerFavoritesManager from './components/BuyerFavoritesManager';

export const metadata = { title: 'Mes Favoris - Bimark' };

export default function BuyerFavoritesPage() {
  return (<><Header /><DashboardSidebar userRole="buyer" /><BuyerFavoritesManager /></>);
}
