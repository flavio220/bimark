import Header from '@/components/common/Header';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import SellerDashboardInteractive from './components/SellerDashboardInteractive';

export const metadata = {
  title: 'Seller Dashboard - Bimark',
  description: 'Manage your products, orders, and analytics on Bimark marketplace'
};

export default function SellerDashboard() {
  const dashboardData = {
    sellerName: "Mon Boutique",
    verificationStatus: "pending",
    verificationExpiry: null,
    salesMetrics: [
      { value: "0 FCFA", change: "0%", trend: "up" },
      { value: "0", change: "0%", trend: "up" },
      { value: "0", change: "0%", trend: "up" },
      { value: "0 FCFA", change: "0%", trend: "up" }
    ],
    revenueData: [
      { month: "Jan", revenue: 0 },
      { month: "Fév", revenue: 0 },
      { month: "Mar", revenue: 0 },
      { month: "Avr", revenue: 0 },
      { month: "Mai", revenue: 0 },
      { month: "Juin", revenue: 0 },
      { month: "Juil", revenue: 0 },
      { month: "Août", revenue: 0 },
      { month: "Sep", revenue: 0 },
      { month: "Oct", revenue: 0 },
      { month: "Nov", revenue: 0 },
      { month: "Déc", revenue: 0 }
    ],
    products: [],
    pendingOrders: [],
    topProducts: [],
    quickActions: [
      { id: "add-product", label: "Ajouter un produit", description: "Lister un nouvel article", icon: "PlusCircleIcon" },
      { id: "bulk-update", label: "Mise à jour en masse", description: "Mettre à jour l'inventaire", icon: "ArrowPathIcon" },
      { id: "promotions", label: "Créer une promotion", description: "Configurer des remises", icon: "TagIcon" },
      { id: "analytics", label: "Voir les statistiques", description: "Rapports détaillés", icon: "ChartPieIcon" }
    ],
    recentReviews: []
  };

  return (
    <>
      <Header />
      <DashboardSidebar userRole="seller" />
      <SellerDashboardInteractive initialData={dashboardData} />
    </>
  );
}
