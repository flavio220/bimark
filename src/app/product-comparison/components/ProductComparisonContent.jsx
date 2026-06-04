'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const mockProducts = [
  {
    id: 1,
    name: "Système LED Industriel Pro",
    supplier: "TechSupply Co.",
    verified: true,
    price: "89 999 FCFA",
    moq: 10,
    rating: 4.7,
    reviews: 128,
    delivery: "7-14 jours",
    warranty: "3 ans",
    certification: "CE, ISO 9001",
    specs: {
      "Puissance": "200W",
      "Flux lumineux": "24 000 lm",
      "Durée de vie": "50 000h",
      "IP Rating": "IP65",
      "Température couleur": "6500K",
    }
  },
  {
    id: 2,
    name: "LED Industriel Standard",
    supplier: "LightPro Africa",
    verified: true,
    price: "72 000 FCFA",
    moq: 20,
    rating: 4.3,
    reviews: 85,
    delivery: "10-20 jours",
    warranty: "2 ans",
    certification: "CE",
    specs: {
      "Puissance": "180W",
      "Flux lumineux": "21 600 lm",
      "Durée de vie": "40 000h",
      "IP Rating": "IP54",
      "Température couleur": "6000K",
    }
  },
  {
    id: 3,
    name: "EcoLED Industrial 200",
    supplier: "GreenTech Solutions",
    verified: false,
    price: "64 500 FCFA",
    moq: 50,
    rating: 4.0,
    reviews: 42,
    delivery: "14-21 jours",
    warranty: "1 an",
    certification: "CE",
    specs: {
      "Puissance": "200W",
      "Flux lumineux": "22 000 lm",
      "Durée de vie": "35 000h",
      "IP Rating": "IP44",
      "Température couleur": "5700K",
    }
  }
];

const criteriaRows = [
  { key: 'price', label: 'Prix unitaire', icon: 'CurrencyDollarIcon' },
  { key: 'moq', label: 'Quantité min (MOQ)', icon: 'CubeIcon' },
  { key: 'rating', label: 'Note moyenne', icon: 'StarIcon' },
  { key: 'delivery', label: 'Délai de livraison', icon: 'TruckIcon' },
  { key: 'warranty', label: 'Garantie', icon: 'ShieldCheckIcon' },
  { key: 'certification', label: 'Certifications', icon: 'DocumentCheckIcon' },
];

export default function ProductComparisonContent() {
  const [products, setProducts] = useState(mockProducts);
  const [highlight, setHighlight] = useState(null);

  const removeProduct = (id) => setProducts(p => p.filter(pr => pr.id !== id));

  const getBestPrice = () => Math.min(...products.map(p => parseInt(p.price.replace(/\D/g, ''))));
  const getBestRating = () => Math.max(...products.map(p => p.rating));
  const getLowestMoq = () => Math.min(...products.map(p => p.moq));

  const isBest = (product, key) => {
    if (key === 'price') return parseInt(product.price.replace(/\D/g, '')) === getBestPrice();
    if (key === 'rating') return product.rating === getBestRating();
    if (key === 'moq') return product.moq === getLowestMoq();
    return false;
  };

  const renderValue = (product, key) => {
    if (key === 'price') return product.price;
    if (key === 'moq') return `${product.moq} unités`;
    if (key === 'rating') return (
      <div className="flex items-center space-x-1 justify-center">
        <span className="font-semibold">{product.rating}</span>
        <Icon name="StarIcon" size={14} className="text-accent" />
        <span className="text-xs text-muted-foreground">({product.reviews})</span>
      </div>
    );
    return product[key];
  };

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/product-search-results" className="hover:text-primary transition-smooth">Produits</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">Comparaison</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Comparaison de produits</h1>
            <p className="text-sm text-muted-foreground mt-1">{products.length} produit(s) comparé(s)</p>
          </div>
          <Link href="/product-search-results"
            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth">
            <Icon name="PlusIcon" size={16} />
            <span className="hidden sm:inline">Ajouter un produit</span>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ArrowsRightLeftIcon" size={30} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Aucun produit à comparer</h2>
            <p className="text-muted-foreground mb-6">Sélectionnez 2 à 4 produits depuis la liste pour les comparer.</p>
            <Link href="/product-search-results"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth">
              <Icon name="MagnifyingGlassIcon" size={18} />
              <span>Parcourir les produits</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              {/* Product headers */}
              <thead>
                <tr>
                  <th className="w-40 pb-4 text-left">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Critère</span>
                  </th>
                  {products.map(product => (
                    <th key={product.id} className="pb-4 px-3">
                      <div className={`bg-card border rounded-xl p-4 text-left transition-smooth ${highlight === product.id ? 'border-primary shadow-card' : 'border-border'}`}
                        onMouseEnter={() => setHighlight(product.id)}
                        onMouseLeave={() => setHighlight(null)}>
                        {/* Remove button */}
                        <div className="flex justify-end mb-2">
                          <button onClick={() => removeProduct(product.id)}
                            className="p-1 text-muted-foreground hover:text-error hover:bg-error/10 rounded transition-smooth">
                            <Icon name="XMarkIcon" size={14} />
                          </button>
                        </div>
                        {/* Product image placeholder */}
                        <div className="w-full h-28 bg-muted rounded-lg flex items-center justify-center mb-3">
                          <Icon name="CubeIcon" size={32} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center space-x-1 mb-3">
                          <span className="text-xs text-muted-foreground">{product.supplier}</span>
                          {product.verified && <Icon name="ShieldCheckIcon" size={12} className="text-success" />}
                        </div>
                        <div className="flex gap-2">
                          <Link href="/product-details"
                            className="flex-1 text-xs py-1.5 bg-primary text-primary-foreground rounded-md text-center font-medium hover:opacity-90 transition-smooth">
                            Voir détails
                          </Link>
                          <Link href="/bulk-inquiry"
                            className="flex-1 text-xs py-1.5 border border-border text-foreground rounded-md text-center font-medium hover:bg-muted transition-smooth">
                            Devis
                          </Link>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Criteria rows */}
              <tbody className="divide-y divide-border">
                {criteriaRows.map(row => (
                  <tr key={row.key} className="hover:bg-muted/30 transition-smooth">
                    <td className="py-4 pr-4">
                      <div className="flex items-center space-x-2">
                        <Icon name={row.icon} size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{row.label}</span>
                      </div>
                    </td>
                    {products.map(product => (
                      <td key={product.id} className="py-4 px-3 text-center">
                        <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                          isBest(product, row.key)
                            ? 'bg-success/10 text-success ring-1 ring-success/30'
                            : 'text-foreground'
                        }`}>
                          {isBest(product, row.key) && (
                            <Icon name="CheckCircleIcon" size={14} className="mr-1 text-success" />
                          )}
                          {renderValue(product, row.key)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Specs rows */}
                <tr>
                  <td colSpan={products.length + 1} className="py-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Spécifications techniques</p>
                  </td>
                </tr>
                {Object.keys(mockProducts[0].specs).map(specKey => (
                  <tr key={specKey} className="hover:bg-muted/30 transition-smooth">
                    <td className="py-3 pr-4 text-sm text-muted-foreground">{specKey}</td>
                    {products.map(product => (
                      <td key={product.id} className="py-3 px-3 text-center text-sm text-foreground">
                        {product.specs[specKey] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className="mt-6 flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircleIcon" size={14} className="text-success" />
                <span className="text-success font-medium">Meilleure valeur</span>
              </div>
              <span>pour ce critère parmi les produits comparés</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
