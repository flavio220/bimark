'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function SupplierProfileContent() {
  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">Fournisseur</span>
        </nav>

        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="BuildingStorefrontIcon" size={36} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Profil du fournisseur</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="ShieldCheckIcon" size={14} className="text-success" />
                <span>Fournisseur vérifié</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">Cette page affichera le profil complet du fournisseur avec ses produits.</p>
          <Link
            href="/product-search-results"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
          >
            <span>Explorer les fournisseurs</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
