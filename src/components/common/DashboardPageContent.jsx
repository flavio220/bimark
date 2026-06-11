'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const sectionContent = {
  buyer: {
    orders: {
      emptyTitle: "Aucune commande pour l'instant",
      emptyDesc: "Vous n'avez pas encore passé de commande. Explorez notre marketplace pour trouver des produits.",
      cta: { label: "Explorer les produits", href: "/product-search-results" },
      columns: ["N° Commande", "Fournisseur", "Date", "Montant", "Statut"],
      features: [
        { icon: "ClipboardDocumentListIcon", title: "Suivi en temps réel", desc: "Suivez l'état de vos commandes de la confirmation à la livraison." },
        { icon: "TruckIcon", title: "Livraison suivie", desc: "Recevez des mises à jour sur la localisation de vos colis." },
        { icon: "ArrowPathIcon", title: "Retours simplifiés", desc: "Gérez facilement les retours et remboursements." },
      ]
    },
    suppliers: {
      emptyTitle: "Aucun fournisseur enregistré",
      emptyDesc: "Commencez à explorer les fournisseurs vérifiés sur Bimark et ajoutez-les à vos favoris.",
      cta: { label: "Trouver des fournisseurs", href: "/product-search-results" },
      features: [
        { icon: "ShieldCheckIcon", title: "Fournisseurs vérifiés", desc: "Tous nos fournisseurs sont vérifiés et certifiés par Bimark." },
        { icon: "StarIcon", title: "Évaluations & avis", desc: "Consultez les évaluations d'autres acheteurs." },
        { icon: "ChatBubbleLeftRightIcon", title: "Contact direct", desc: "Communiquez directement avec les fournisseurs." },
      ]
    },
    favorites: {
      emptyTitle: "Aucun favori enregistré",
      emptyDesc: "Sauvegardez vos produits et fournisseurs préférés pour y accéder facilement.",
      cta: { label: "Parcourir les produits", href: "/product-search-results" },
      features: [
        { icon: "HeartIcon", title: "Produits favoris", desc: "Sauvegardez les produits qui vous intéressent." },
        { icon: "BuildingStorefrontIcon", title: "Fournisseurs favoris", desc: "Gardez une liste de vos fournisseurs préférés." },
        { icon: "BellIcon", title: "Alertes de prix", desc: "Soyez notifié des changements de prix." },
      ]
    },
    messages: {
      emptyTitle: "Aucun message",
      emptyDesc: "Vos conversations avec les fournisseurs apparaîtront ici.",
      cta: { label: "Contacter un fournisseur", href: "/product-search-results" },
      features: [
        { icon: "ChatBubbleLeftRightIcon", title: "Messagerie sécurisée", desc: "Communiquez en toute sécurité avec les fournisseurs." },
        { icon: "DocumentTextIcon", title: "Partage de documents", desc: "Échangez des devis, factures et documents." },
        { icon: "LanguageIcon", title: "Support bilingue", desc: "Communication en français et en anglais." },
      ]
    },
    settings: {
      type: "settings",
      sections: [
        { icon: "UserCircleIcon", title: "Profil personnel", desc: "Modifiez vos informations personnelles, photo de profil et coordonnées.", action: "Modifier le profil" },
        { icon: "BuildingOfficeIcon", title: "Informations entreprise", desc: "Mettez à jour les détails de votre entreprise et documents de vérification.", action: "Modifier l'entreprise" },
        { icon: "CreditCardIcon", title: "Modes de paiement", desc: "Gérez vos cartes bancaires et méthodes de paiement.", action: "Gérer les paiements" },
        { icon: "BellIcon", title: "Notifications", desc: "Configurez vos préférences de notifications par email et SMS.", action: "Configurer" },
        { icon: "ShieldCheckIcon", title: "Sécurité & confidentialité", desc: "Changez votre mot de passe et gérez la sécurité du compte.", action: "Gérer la sécurité" },
        { icon: "LanguageIcon", title: "Langue & région", desc: "Définissez votre langue préférée et région.", action: "Modifier" },
      ]
    },
  },
  seller: {
    products: {
      emptyTitle: "Aucun produit listé",
      emptyDesc: "Commencez à vendre en ajoutant votre premier produit sur Bimark.",
      cta: { label: "Ajouter un produit", href: "#" },
      features: [
        { icon: "PhotoIcon", title: "Photos produits", desc: "Ajoutez jusqu'à 10 photos haute résolution par produit." },
        { icon: "CurrencyDollarIcon", title: "Prix flexibles", desc: "Définissez des prix unitaires et des tarifs en gros." },
        { icon: "ChartBarIcon", title: "Suivi des ventes", desc: "Analysez les performances de chaque produit." },
      ]
    },
    orders: {
      emptyTitle: "Aucune commande reçue",
      emptyDesc: "Vos commandes apparaîtront ici dès que des acheteurs passeront commande.",
      cta: { label: "Optimiser mes produits", href: "/seller-dashboard/products" },
      features: [
        { icon: "BellAlertIcon", title: "Alertes instantanées", desc: "Soyez notifié dès réception d'une nouvelle commande." },
        { icon: "TruckIcon", title: "Gestion des expéditions", desc: "Gérez facilement vos expéditions et livraisons." },
        { icon: "ReceiptRefundIcon", title: "Gestion des retours", desc: "Traitez les retours et remboursements simplement." },
      ]
    },
    analytics: {
      emptyTitle: "Pas encore de données",
      emptyDesc: "Les statistiques de ventes apparaîtront ici une fois que vous aurez effectué des ventes.",
      cta: { label: "Ajouter des produits", href: "/seller-dashboard/products" },
      features: [
        { icon: "ChartBarIcon", title: "Revenus", desc: "Suivez vos revenus journaliers, hebdomadaires et mensuels." },
        { icon: "UsersIcon", title: "Comportement clients", desc: "Analysez comment les acheteurs interagissent avec vos produits." },
        { icon: "ArrowTrendingUpIcon", title: "Tendances", desc: "Identifiez vos produits les plus performants." },
      ]
    },
    customers: {
      emptyTitle: "Aucun client pour l'instant",
      emptyDesc: "Vos clients apparaîtront ici après vos premières ventes.",
      cta: { label: "Voir mes produits", href: "/seller-dashboard/products" },
      features: [
        { icon: "StarIcon", title: "Fidélisation", desc: "Identifiez et récompensez vos meilleurs clients." },
        { icon: "ChatBubbleLeftRightIcon", title: "Communication", desc: "Restez en contact avec vos acheteurs." },
        { icon: "DocumentChartBarIcon", title: "Historique d'achats", desc: "Consultez l'historique de commandes par client." },
      ]
    },
    messages: {
      emptyTitle: "Aucun message",
      emptyDesc: "Vos conversations avec les acheteurs apparaîtront ici.",
      cta: { label: "Optimiser mes produits", href: "/seller-dashboard/products" },
      features: [
        { icon: "ChatBubbleLeftRightIcon", title: "Messagerie sécurisée", desc: "Communiquez en toute sécurité avec les acheteurs." },
        { icon: "DocumentTextIcon", title: "Devis & factures", desc: "Envoyez des devis personnalisés directement." },
        { icon: "LanguageIcon", title: "Support bilingue", desc: "Communication en français et en anglais." },
      ]
    },
    settings: {
      type: "settings",
      sections: [
        { icon: "UserCircleIcon", title: "Profil vendeur", desc: "Modifiez vos informations, photo de boutique et description.", action: "Modifier le profil" },
        { icon: "BuildingOfficeIcon", title: "Informations entreprise", desc: "Mettez à jour vos documents de vérification et informations légales.", action: "Modifier l'entreprise" },
        { icon: "CreditCardIcon", title: "Paiements & virements", desc: "Configurez comment vous recevez vos paiements.", action: "Gérer les paiements" },
        { icon: "BellIcon", title: "Notifications", desc: "Configurez vos alertes commandes, messages et promotions.", action: "Configurer" },
        { icon: "ShieldCheckIcon", title: "Sécurité & confidentialité", desc: "Changez votre mot de passe et gérez la sécurité.", action: "Gérer la sécurité" },
        { icon: "TagIcon", title: "Politiques boutique", desc: "Définissez vos politiques de retour et de livraison.", action: "Modifier" },
      ]
    },
  }
};

export default function DashboardPageContent({ title, icon, userRole, section }) {
  const [activeSettingsSection, setActiveSettingsSection] = useState(null);
  const content = sectionContent[userRole]?.[section];

  if (!content) {
    return (
      <main className="lg:ml-64 pt-16 min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground">Cette section est en cours de développement.</p>
        </div>
      </main>
    );
  }

  if (content.type === "settings") {
    return (
      <main className="lg:ml-64 pt-16 min-h-screen bg-background">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground">Gérez vos préférences et informations de compte</p>
            </div>
          </div>

          <div className="grid gap-4">
            {content.sections.map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 flex items-start justify-between hover:border-primary/30 transition-smooth">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={s.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 text-sm font-medium bg-muted hover:bg-primary hover:text-primary-foreground rounded-md transition-smooth flex-shrink-0">
                  {s.action}
                </button>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-5">
            <h3 className="font-semibold text-foreground mb-2">Besoin d'aide ?</h3>
            <p className="text-sm text-muted-foreground mb-3">Notre équipe d'assistance est disponible pour vous aider.</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="tel:+2290150882676" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="PhoneIcon" size={16} />
                <span>+229 01 50 88 26 76</span>
              </a>
              <a href="tel:+2290140903261" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="PhoneIcon" size={16} />
                <span>+229 01 40 90 32 61</span>
              </a>
              <a href="mailto:flavioadantchede@gmail.com" className="flex items-center space-x-2 text-primary hover:underline">
                <Icon name="EnvelopeIcon" size={16} />
                <span>flavioadantchede@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{content.emptyDesc}</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-card border border-border rounded-lg p-12 text-center mb-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name={icon} size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{content.emptyTitle}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{content.emptyDesc}</p>
          {content.cta && (
            <Link
              href={content.cta.href}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
            >
              <span>{content.cta.label}</span>
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          )}
        </div>

        {/* Features */}
        {content.features && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.features.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name={f.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
