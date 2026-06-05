'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import FilterPanel from './FilterPanel';
import SortControls from './SortControls';
import ProductCard from './ProductCard';
import ActiveFilters from './ActiveFilters';
import BulkSelectionBar from './BulkSelectionBar';
import Pagination from './Pagination';

// ─── Catalogue produits ───────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  {
    id: 1, category: 'electronics', location: 'china',
    wholesalePrice: 89.99, retailPrice: 149.99, rating: 4.7, moq: 50, verified: true, freeShipping: true,
    name: { fr: 'Système LED industriel 500W High Bay', en: 'Industrial LED Lighting System 500W High Bay' },
    description: { fr: 'Éclairage LED industriel économe en énergie, durée de vie 50 000h', en: 'Energy-efficient industrial LED, 50,000h lifespan' },
    image: 'https://images.unsplash.com/photo-1585585827015-9b85a09137a1', alt: 'LED industriel',
    keywords: ['led', 'lumiere', 'lumière', 'eclairage', 'éclairage', 'industriel', 'high bay', 'lampe', 'light', 'lighting', 'ampoule'],
  },
  {
    id: 2, category: 'furniture', location: 'canada',
    wholesalePrice: 125.50, retailPrice: 249.99, rating: 4.8, moq: 20, verified: true, freeShipping: false,
    name: { fr: 'Chaise de bureau ergonomique Série Executive', en: 'Ergonomic Office Chair Executive Series' },
    description: { fr: 'Chaise haut de gamme avec support lombaire et accoudoirs réglables', en: 'Premium mesh chair with lumbar support and adjustable armrests' },
    image: 'https://images.unsplash.com/photo-1680092919273-63c9458abaca', alt: 'Chaise ergonomique',
    keywords: ['chaise', 'bureau', 'ergonomique', 'siège', 'siege', 'chair', 'office', 'mobilier', 'furniture', 'assise', 'fauteuil'],
  },
  {
    id: 3, category: 'electronics', location: 'china',
    wholesalePrice: 45.00, retailPrice: 99.99, rating: 4.6, moq: 100, verified: true, freeShipping: true,
    name: { fr: 'Casque Bluetooth sans fil Pro Audio', en: 'Wireless Bluetooth Headphones Pro Audio' },
    description: { fr: 'Réduction active du bruit, 30h d\'autonomie, qualité premium', en: 'Active noise cancellation, 30h battery, premium sound' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png', alt: 'Casque bluetooth',
    keywords: ['casque', 'bluetooth', 'audio', 'sans fil', 'wireless', 'headphone', 'ecouteur', 'écouteur', 'musique', 'son', 'headphones', 'bruit'],
  },
  {
    id: 4, category: 'office', location: 'china',
    wholesalePrice: 12.99, retailPrice: 29.99, rating: 4.5, moq: 200, verified: false, freeShipping: true,
    name: { fr: 'Bouteille en acier inoxydable 1L isolée', en: 'Stainless Steel Water Bottle 1L Insulated' },
    description: { fr: 'Double paroi sous vide, garde les boissons froides 24h', en: 'Double-wall vacuum insulated, keeps drinks cold 24h' },
    image: 'https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3', alt: 'Bouteille acier',
    keywords: ['bouteille', 'eau', 'acier', 'inoxydable', 'bottle', 'water', 'steel', 'boisson', 'thermos', 'gourde'],
  },
  {
    id: 5, category: 'safety', location: 'usa',
    wholesalePrice: 8.50, retailPrice: 19.99, rating: 4.7, moq: 500, verified: true, freeShipping: false,
    name: { fr: 'Lunettes de sécurité anti-buée professionnelles', en: 'Safety Goggles Anti-Fog Professional Grade' },
    description: { fr: 'Certifiées ANSI Z87.1, protection UV, résistantes aux rayures', en: 'ANSI Z87.1 certified, UV protection, scratch resistant' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_14e3e32a3-1764676652509.png', alt: 'Lunettes sécurité',
    keywords: ['lunette', 'sécurité', 'securite', 'protection', 'safety', 'goggles', 'anti-buée', 'yeux', 'équipement'],
  },
  {
    id: 6, category: 'office', location: 'canada',
    wholesalePrice: 2.25, retailPrice: 4.99, rating: 4.4, moq: 1000, verified: true, freeShipping: true,
    name: { fr: 'Cartons d\'emballage double paroi 20×20×20cm', en: 'Corrugated Cardboard Boxes Heavy Duty 20x20x20' },
    description: { fr: 'Double paroi, capacité 30kg, idéal pour l\'expédition', en: 'Double-wall, 65lb capacity, ideal for shipping' },
    image: 'https://images.unsplash.com/photo-1570086625846-f33f679eb4f5', alt: 'Cartons emballage',
    keywords: ['carton', 'boîte', 'boite', 'emballage', 'box', 'packaging', 'ondule', 'expedition', 'colis', 'stockage'],
  },
  {
    id: 7, category: 'electronics', location: 'china',
    wholesalePrice: 5.99, retailPrice: 14.99, rating: 4.6, moq: 300, verified: false, freeShipping: true,
    name: { fr: 'Câble USB-C tressé 1.8m charge rapide', en: 'USB-C Charging Cable 6ft Braided Fast Charge' },
    description: { fr: 'Charge rapide, connecteurs renforcés, 10 000+ cycles', en: 'Fast charging, reinforced connectors, 10,000+ bends' },
    image: 'https://images.unsplash.com/photo-1708922692309-50a25e76ee99', alt: 'Câble USB-C',
    keywords: ['cable', 'câble', 'usb', 'chargeur', 'charge', 'charging', 'type-c', 'usb-c', 'telephone', 'mobile'],
  },
  {
    id: 8, category: 'furniture', location: 'usa',
    wholesalePrice: 89.00, retailPrice: 179.99, rating: 4.5, moq: 25, verified: true, freeShipping: false,
    name: { fr: 'Convertisseur bureau debout réglable double niveau', en: 'Adjustable Standing Desk Converter Dual Tier' },
    description: { fr: 'Hauteur réglable, plateau clavier séparé, supporte moniteur 27"', en: 'Height adjustable, keyboard tray, supports monitor' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17b317373-1764840509664.png', alt: 'Bureau debout',
    keywords: ['bureau', 'debout', 'standing', 'desk', 'reglable', 'réglable', 'height', 'hauteur', 'convertisseur', 'travail'],
  },
  {
    id: 9, category: 'safety', location: 'canada',
    wholesalePrice: 6.75, retailPrice: 15.99, rating: 4.7, moq: 250, verified: true, freeShipping: true,
    name: { fr: 'Gilet de sécurité haute visibilité ANSI Classe 2', en: 'Industrial Safety Vest High Visibility ANSI Class 2' },
    description: { fr: 'Bandes réfléchissantes, poches multiples, taille ajustable', en: 'Reflective strips, multiple pockets, adjustable fit' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_160520782-1764761620226.png', alt: 'Gilet sécurité',
    keywords: ['gilet', 'veste', 'sécurité', 'securite', 'visibilité', 'vest', 'safety', 'reflective', 'chantier', 'btp', 'construction'],
  },
  {
    id: 10, category: 'electronics', location: 'china',
    wholesalePrice: 15.50, retailPrice: 34.99, rating: 4.4, moq: 150, verified: false, freeShipping: true,
    name: { fr: 'Souris sans fil ergonomique 2.4GHz DPI réglable', en: 'Wireless Mouse Ergonomic 2.4GHz Adjustable DPI' },
    description: { fr: 'Sans fil 2,4 GHz, DPI réglable, batterie rechargeable USB', en: '2.4GHz wireless, adjustable DPI, rechargeable battery' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_104d5d70c-1765064258284.png', alt: 'Souris sans fil',
    keywords: ['souris', 'mouse', 'sans fil', 'wireless', 'informatique', 'ordinateur', 'pc', 'peripherique', 'clavier'],
  },
  {
    id: 11, category: 'furniture', location: 'usa',
    wholesalePrice: 145.00, retailPrice: 299.99, rating: 4.6, moq: 15, verified: true, freeShipping: false,
    name: { fr: 'Armoire de rangement modulaire 5 tiroirs verrouillables', en: 'Modular Storage Cabinet 5 Lockable Drawers' },
    description: { fr: 'Métal robuste, tiroirs verrouillables, mécanisme anti-basculement', en: 'Sturdy metal, lockable drawers, anti-tip mechanism' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bf809c84-1764777619394.png', alt: 'Armoire rangement',
    keywords: ['armoire', 'rangement', 'tiroir', 'cabinet', 'storage', 'meuble', 'classeur', 'coffre', 'placard'],
  },
  {
    id: 12, category: 'office', location: 'china',
    wholesalePrice: 22.99, retailPrice: 49.99, rating: 4.5, moq: 100, verified: true, freeShipping: true,
    name: { fr: 'Lampe de bureau LED contrôle tactile avec port USB', en: 'LED Desk Lamp Touch Control USB Charging Port' },
    description: { fr: 'Luminosité réglable 5 niveaux, port USB intégré, température couleur', en: 'Adjustable brightness 5 levels, USB port, color temperature' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e7a14a69-1764656591353.png', alt: 'Lampe LED bureau',
    keywords: ['lampe', 'led', 'bureau', 'desk', 'lamp', 'lumiere', 'lumière', 'eclairage', 'éclairage', 'usb', 'tactile', 'bureau'],
  },
];

// ─── Moteur de recherche ──────────────────────────────────────────────────────
function matchesQuery(product, query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (!q) return false;

  const normalize = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const fields = [
    normalize(product.name.fr),
    normalize(product.name.en),
    normalize(product.description.fr),
    normalize(product.description.en),
    normalize(product.category),
    ...product.keywords.map(normalize),
  ];

  return fields.some(f => f.includes(q));
}

// ─── Suggestions quand aucun résultat ────────────────────────────────────────
const SUGGESTIONS = {
  fr: ['Chaises de bureau', 'Éclairage LED', 'Câbles USB', 'Gilets de sécurité', 'Lampes de bureau', 'Armoires', 'Casques audio', 'Cartons d\'emballage'],
  en: ['Office chairs', 'LED lighting', 'USB cables', 'Safety vests', 'Desk lamps', 'Storage cabinets', 'Headphones', 'Cardboard boxes'],
};

// ─── Composant principal ──────────────────────────────────────────────────────
function SearchContent() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams?.get('q') || '';
  const trimmedQuery = rawQuery.trim();

  const [lang, setLang] = useState('fr');
  const [filters, setFilters] = useState({ category: '', priceRange: { min: '', max: '' }, location: '', shipping: '' });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLang(localStorage.getItem('language') || 'fr');
    setCurrentPage(1);
    setFilters({ category: '', priceRange: { min: '', max: '' }, location: '', shipping: '' });
  }, [rawQuery]);

  // Aucune requête = aucun produit affiché, point final
  const hasQuery = trimmedQuery.length > 0;

  const getResults = () => {
    if (!hasQuery) return [];

    let list = ALL_PRODUCTS.filter(p => matchesQuery(p, trimmedQuery));

    if (filters.category) list = list.filter(p => p.category === filters.category);
    if (filters.priceRange?.min) list = list.filter(p => p.wholesalePrice >= parseFloat(filters.priceRange.min));
    if (filters.priceRange?.max) list = list.filter(p => p.wholesalePrice <= parseFloat(filters.priceRange.max));
    if (filters.location) list = list.filter(p => p.location === filters.location);
    if (filters.shipping === 'free') list = list.filter(p => p.freeShipping);

    if (sortBy === 'price_asc') list.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
    else if (sortBy === 'price_desc') list.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  };

  const results = getResults();
  const hasResults = results.length > 0;
  const PER_PAGE = 12;
  const totalPages = Math.ceil(results.length / PER_PAGE);
  const displayed = results.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleFilterChange = (f) => { setFilters(f); setCurrentPage(1); };
  const handleRemoveFilter = (type) => {
    if (type === 'all') setFilters({ category: '', priceRange: { min: '', max: '' }, location: '', shipping: '' });
    else if (type === 'priceRange') setFilters(p => ({ ...p, priceRange: { min: '', max: '' } }));
    else setFilters(p => ({ ...p, [type]: '' }));
    setCurrentPage(1);
  };

  const toggleWishlist = (id) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleCompare = (id) => setCompareList(p => {
    if (p.includes(id)) return p.filter(x => x !== id);
    if (p.length >= 4) return p;
    return [...p, id];
  });

  const t = {
    title_empty: lang === 'fr' ? 'Recherche de produits' : 'Product Search',
    subtitle_empty: lang === 'fr' ? 'Tapez un mot-clé pour trouver des produits' : 'Type a keyword to find products',
    start_search: lang === 'fr' ? 'Lancez votre recherche' : 'Start your search',
    start_hint: lang === 'fr' ? 'Entrez le nom d\'un produit, d\'une catégorie ou d\'un mot-clé dans la barre de recherche en haut.' : 'Enter a product name, category or keyword in the search bar above.',
    suggestions_title: lang === 'fr' ? 'Suggestions populaires' : 'Popular suggestions',
    results_for: lang === 'fr' ? 'Résultats pour' : 'Results for',
    count: (n) => lang === 'fr' ? `${n} produit${n !== 1 ? 's' : ''} trouvé${n !== 1 ? 's' : ''}` : `${n} product${n !== 1 ? 's' : ''} found`,
    no_results: lang === 'fr' ? 'Aucun résultat' : 'No results',
    no_results_hint: lang === 'fr' ? `Aucun produit trouvé pour "${trimmedQuery}".` : `No product found for "${trimmedQuery}".`,
    try_instead: lang === 'fr' ? 'Vous pourriez aussi aimer' : 'You might also like',
    clear: lang === 'fr' ? 'Nouvelle recherche' : 'New search',
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-24 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 py-6">

        {/* ── Page vide : aucune requête ── */}
        {!hasQuery && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-5">
              <Icon name="MagnifyingGlassIcon" size={36} className="text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t.start_search}</h1>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">{t.start_hint}</p>

            <div className="w-full max-w-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{t.suggestions_title}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS[lang].map(s => (
                  <Link key={s} href={`/product-search-results?q=${encodeURIComponent(s)}`}
                    className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-smooth">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Requête présente ── */}
        {hasQuery && (
          <>
            {/* Header résultats */}
            <div className="mb-5">
              <h1 className="text-xl font-bold text-foreground">
                {t.results_for} <span className="text-primary">"{trimmedQuery}"</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {hasResults ? t.count(results.length) : t.no_results}
              </p>
            </div>

            {/* Aucun résultat → suggestions */}
            {!hasResults && (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MagnifyingGlassIcon" size={28} className="text-muted-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{t.no_results}</h2>
                <p className="text-sm text-muted-foreground mb-8">{t.no_results_hint}</p>

                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t.try_instead}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {SUGGESTIONS[lang].map(s => (
                    <Link key={s} href={`/product-search-results?q=${encodeURIComponent(s)}`}
                      className="px-4 py-2 bg-muted border border-border rounded-full text-sm text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-smooth">
                      {s}
                    </Link>
                  ))}
                </div>
                <Link href="/product-search-results"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth">
                  <Icon name="XMarkIcon" size={15} />
                  <span>{t.clear}</span>
                </Link>
              </div>
            )}

            {/* Résultats trouvés */}
            {hasResults && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <FilterPanel onFilterChange={handleFilterChange} resultCount={results.length} />
                </div>
                <div className="lg:col-span-3 space-y-4">
                  <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
                  <SortControls onSortChange={setSortBy} viewMode={viewMode} onViewModeChange={setViewMode} />

                  <div className={viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'space-y-4'}>
                    {displayed.map(p => (
                      <ProductCard key={p.id} product={p} viewMode={viewMode}
                        onWishlistToggle={toggleWishlist} onCompareToggle={toggleCompare}
                        isInWishlist={wishlist.includes(p.id)} isInCompare={compareList.includes(p.id)} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages}
                      onPageChange={p => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                  )}
                </div>
              </div>
            )}
          </>
        )}

        <BulkSelectionBar selectedCount={compareList.length} onClearSelection={() => setCompareList([])} />
      </div>
    </div>
  );
}

export default function SearchResultsInteractive() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <div className="text-center">
          <Icon name="ArrowPathIcon" size={36} className="text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
