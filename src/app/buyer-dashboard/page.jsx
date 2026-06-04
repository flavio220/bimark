import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import BuyerDashboardInteractive from './components/BuyerDashboardInteractive';

export const metadata = {
  title: 'Buyer Dashboard - Bimark',
  description: 'Manage your orders, track shipments, and discover new products on Bimark marketplace'
};

export default function BuyerDashboard() {
  const mockData = {
    recentOrders: [],
    orderHistory: [],
    wishlist: [],
    favoriteSuppliers: [],
    analytics: {
      totalSpent: "0 FCFA",
      totalOrders: 0,
      avgOrderValue: "0 FCFA",
      monthlyData: [
        { month: "Jan", amount: 0 },
        { month: "Fév", amount: 0 },
        { month: "Mar", amount: 0 },
        { month: "Avr", amount: 0 },
        { month: "Mai", amount: 0 },
        { month: "Juin", amount: 0 }
      ]
    },
    quotations: [],
    notifications: [],
    recommendedProducts: [],
    quickActions: [
      { id: "search-products", label: "Rechercher des produits", description: "Explorer le catalogue", icon: "MagnifyingGlassIcon" },
      { id: "request-quote", label: "Demander un devis", description: "Contacter des fournisseurs", icon: "DocumentTextIcon" },
      { id: "track-orders", label: "Suivre mes commandes", description: "Statut des livraisons", icon: "TruckIcon" },
      { id: "messages", label: "Mes messages", description: "Contacter les vendeurs", icon: "ChatBubbleLeftRightIcon" }
    ]
  };

  return (
    <>
      <Header />
      <DashboardSidebar userRole="buyer" />
      <BuyerDashboardInteractive initialData={mockData} />
    </>
  );
}
