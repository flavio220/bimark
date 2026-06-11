'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const mockProduct = {
  name: "Industrial LED Lighting System",
  nameFr: "Système d'éclairage LED industriel",
  sku: "IND-LED-001",
  category: "Électronique",
  price: { wholesale: "89 999 FCFA", retail: "124 999 FCFA" },
  moq: 10,
  rating: 4.7,
  reviews: 128,
  stock: "En stock",
  supplier: { name: "TechSupply Co.", verified: true, location: "Cotonou, Bénin", rating: 4.9 },
  description: {
    en: "High-performance industrial LED lighting system designed for warehouses, factories, and large commercial spaces. Features energy-efficient technology with a lifespan of 50,000+ hours.",
    fr: "Système d'éclairage LED industriel haute performance conçu pour les entrepôts, usines et grands espaces commerciaux. Technologie économe en énergie avec une durée de vie de 50 000+ heures."
  },
  specs: [
    { label: "Puissance", value: "200W" },
    { label: "Flux lumineux", value: "24 000 lm" },
    { label: "Température de couleur", value: "6500K" },
    { label: "Durée de vie", value: "50 000h" },
    { label: "IP Rating", value: "IP65" },
    { label: "Garantie", value: "3 ans" },
  ]
};

export default function ProductDetailsContent() {
  const [quantity, setQuantity] = useState(mockProduct.moq);
  const [activeTab, setActiveTab] = useState('description');
  const [lang, setLang] = useState('fr');

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/product-search-results" className="hover:text-primary transition-smooth">Produits</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground truncate max-w-[200px]">{mockProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Image gallery */}
          <div>
            <div className="bg-muted rounded-xl h-80 flex items-center justify-center mb-3 border border-border">
              <Icon name="PhotoIcon" size={64} className="text-muted-foreground" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-muted rounded-lg h-16 border border-border flex items-center justify-center cursor-pointer hover:border-primary transition-smooth">
                  <Icon name="PhotoIcon" size={20} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">{mockProduct.category}</span>
              <span className="text-xs text-muted-foreground">SKU: {mockProduct.sku}</span>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-1">{lang === 'fr' ? mockProduct.nameFr : mockProduct.name}</h1>

            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="StarIcon" size={14} className={i <= Math.round(mockProduct.rating) ? "text-accent" : "text-muted"} />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{mockProduct.rating}</span>
              <span className="text-sm text-muted-foreground">({mockProduct.reviews} avis)</span>
              <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">{mockProduct.stock}</span>
            </div>

            {/* Supplier */}
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg mb-5">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BuildingStorefrontIcon" size={20} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-foreground">{mockProduct.supplier.name}</span>
                  {mockProduct.supplier.verified && <Icon name="ShieldCheckIcon" size={14} className="text-success" />}
                </div>
                <span className="text-xs text-muted-foreground">{mockProduct.supplier.location}</span>
              </div>
              <Link href="/supplier-profile" className="ml-auto text-xs text-primary hover:underline">Voir profil</Link>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Prix de gros</p>
                <p className="text-xl font-bold text-primary">{mockProduct.price.wholesale}</p>
                <p className="text-xs text-muted-foreground">Minimum {mockProduct.moq} unités</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Prix de détail</p>
                <p className="text-xl font-bold text-foreground">{mockProduct.price.retail}</p>
                <p className="text-xs text-muted-foreground">Par unité</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">Quantité (MOQ: {mockProduct.moq})</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(q => Math.max(mockProduct.moq, q - 1))}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
                >
                  <Icon name="MinusIcon" size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(mockProduct.moq, parseInt(e.target.value) || mockProduct.moq))}
                  className="w-20 text-center border border-border rounded-lg py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/bulk-inquiry"
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={18} />
                <span>Demander un devis</span>
              </Link>
              <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-smooth">
                <Icon name="HeartIcon" size={18} />
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex border-b border-border">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specs', label: 'Spécifications' },
              { id: 'reviews', label: `Avis (${mockProduct.reviews})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-smooth border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <p className="text-foreground leading-relaxed">{lang === 'fr' ? mockProduct.description.fr : mockProduct.description.en}</p>
            )}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockProduct.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="text-sm font-semibold text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <div className="text-5xl font-bold text-primary mb-2">{mockProduct.rating}</div>
                <div className="flex justify-center mb-2">
                  {[1,2,3,4,5].map(i => (
                    <Icon key={i} name="StarIcon" size={20} className={i <= Math.round(mockProduct.rating) ? "text-accent" : "text-muted"} />
                  ))}
                </div>
                <p className="text-muted-foreground">{mockProduct.reviews} avis clients</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
