'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ProductDetailContent() {
  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/product-search-results" className="hover:text-primary transition-smooth">Produits</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">Détail produit</span>
        </nav>

        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CubeIcon" size={30} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Page produit</h1>
          <p className="text-muted-foreground mb-6">Cette page affichera les détails complets d'un produit sélectionné.</p>
          <Link
            href="/product-search-results"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            <span>Retour aux résultats</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
