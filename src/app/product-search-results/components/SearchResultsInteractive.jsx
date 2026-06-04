'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FilterPanel from './FilterPanel';
import SortControls from './SortControls';
import ProductCard from './ProductCard';
import ActiveFilters from './ActiveFilters';
import BulkSelectionBar from './BulkSelectionBar';
import Pagination from './Pagination';
import Icon from '@/components/ui/AppIcon';

// ─── Catalogue complet des produits ───────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: 1, category: 'electronics', location: 'china', wholesalePrice: 89.99, retailPrice: 149.99, rating: 4.7, reviews: 234, moq: 50, verified: true, freeShipping: true,
    name: { fr: 'Système LED industriel 500W High Bay', en: 'Industrial LED Lighting System 500W High Bay' },
    description: { fr: 'Éclairage LED industriel économe en énergie, durée de vie 50 000h', en: 'Energy-efficient industrial LED, 50,000h lifespan' },
    image: 'https://images.unsplash.com/photo-1585585827015-9b85a09137a1', alt: 'LED industriel' },

  { id: 2, category: 'furniture', location: 'canada', wholesalePrice: 125.50, retailPrice: 249.99, rating: 4.8, reviews: 567, moq: 20, verified: true, freeShipping: false,
    name: { fr: 'Chaise de bureau ergonomique Série Executive', en: 'Ergonomic Office Chair Executive Series' },
    description: { fr: 'Chaise haut de gamme avec support lombaire et accoudoirs réglables', en: 'Premium mesh chair with lumbar support and adjustable armrests' },
    image: 'https://images.unsplash.com/photo-1680092919273-63c9458abaca', alt: 'Chaise ergonomique' },

  { id: 3, category: 'electronics', location: 'china', wholesalePrice: 45.00, retailPrice: 99.99, rating: 4.6, reviews: 892, moq: 100, verified: true, freeShipping: true,
    name: { fr: 'Casque Bluetooth sans fil Pro Audio', en: 'Wireless Bluetooth Headphones Pro Audio' },
    description: { fr: 'Réduction active du bruit, 30h d\'autonomie, qualité premium', en: 'Active noise cancellation, 30h battery, premium sound' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png', alt: 'Casque bluetooth' },

  { id: 4, category: 'office', location: 'china', wholesalePrice: 12.99, retailPrice: 29.99, rating: 4.5, reviews: 1234, moq: 200, verified: false, freeShipping: true,
    name: { fr: 'Bouteille en acier inoxydable 1L isolée', en: 'Stainless Steel Water Bottle 1L Insulated' },
    description: { fr: 'Double paroi sous vide, garde les boissons froides 24h', en: 'Double-wall vacuum insulated, keeps drinks cold 24h' },
    image: 'https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3', alt: 'Bouteille acier' },

  { id: 5, category: 'safety', location: 'usa', wholesalePrice: 8.50, retailPrice: 19.99, rating: 4.7, reviews: 456, moq: 500, verified: true, freeShipping: false,
    name: { fr: 'Lunettes de sécurité anti-buée professionnelles', en: 'Safety Goggles Anti-Fog Professional Grade' },
    description: { fr: 'Certifiées ANSI Z87.1, protection UV, résistantes aux rayures', en: 'ANSI Z87.1 certified, UV protection, scratch resistant' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_14e3e32a3-1764676652509.png', alt: 'Lunettes sécurité' },

  { id: 6, category: 'office', location: 'canada', wholesalePrice: 2.25, retailPrice: 4.99, rating: 4.4, reviews: 678, moq: 1000, verified: true, freeShipping: true,
    name: { fr: 'Cartons ondulés usage intensif 20×20×20', en: 'Corrugated Cardboard Boxes Heavy Duty 20x20x20' },
    description: { fr: 'Double paroi, capacité 30kg, idéal expédition', en: 'Double-wall, 65lb capacity, ideal for shipping' },
    image: 'https://images.unsplash.com/photo-1570086625846-f33f679eb4f5', alt: 'Cartons' },

  { id: 7, category: 'electronics', location: 'china', wholesalePrice: 5.99, retailPrice: 14.99, rating: 4.6, reviews: 1567, moq: 300, verified: false, freeShipping: true,
    name: { fr: 'Câble USB-C tressé 1.8m charge rapide', en: 'USB-C Charging Cable 6ft Braided Fast Charge' },
    description: { fr: 'Charge rapide, connecteurs renforcés, 10 000+ pliages', en: 'Fast charging, reinforced connectors, 10,000+ bends' },
    image: 'https://images.unsplash.com/photo-1708922692309-50a25e76ee99', alt: 'Câble USB-C' },

  { id: 8, category: 'furniture', location: 'usa', wholesalePrice: 89.00, retailPrice: 179.99, rating: 4.5, reviews: 345, moq: 25, verified: true, freeShipping: false,
    name: { fr: 'Convertisseur bureau debout réglable double niveau', en: 'Adjustable Standing Desk Converter Dual Tier' },
    description: { fr: 'Hauteur réglable, plateau clavier, supporte moniteur', en: 'Height adjustable, keyboard tray, monitor platform' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17b317373-1764840509664.png', alt: 'Bureau debout' },

  { id: 9, category: 'safety', location: 'canada', wholesalePrice: 6.75, retailPrice: 15.99, rating: 4.7, reviews: 789, moq: 250, verified: true, freeShipping: true,
    name: { fr: 'Gilet de sécurité haute visibilité ANSI Classe 2', en: 'Industrial Safety Vest High Visibility ANSI Class 2' },
    description: { fr: 'Bandes réfléchissantes, poches multiples, ajustable', en: 'Reflective strips, multiple pockets, adjustable fit' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_160520782-1764761620226.png', alt: 'Gilet sécurité' },

  { id: 10, category: 'electronics', location: 'china', wholesalePrice: 15.50, retailPrice: 34.99, rating: 4.4, reviews: 923, moq: 150, verified: false, freeShipping: true,
    name: { fr: 'Souris sans fil ergonomique 2.4GHz DPI réglable', en: 'Wireless Mouse Ergonomic 2.4GHz Adjustable DPI' },
    description: { fr: 'Sans fil 2,4 GHz, DPI réglable, batterie rechargeable', en: '2.4GHz wireless, adjustable DPI, rechargeable battery' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_104d5d70c-1765064258284.png', alt: 'Souris sans fil' },

  { id: 11, category: 'furniture', location: 'usa', wholesalePrice: 145.00, retailPrice: 299.99, rating: 4.6, reviews: 234, moq: 15, verified: true, freeShipping: false,
    name: { fr: 'Armoire de rangement modulaire 5 tiroirs verrouillables', en: 'Modular Storage Cabinet 5 Lockable Drawers' },
    description: { fr: 'Métal, tiroirs verrouillables, mécanisme anti-basculement', en: 'Metal, lockable drawers, anti-tip mechanism' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bf809c84-1764777619394.png', alt: 'Armoire' },

  { id: 12, category: 'office', location: 'china', wholesalePrice: 22.99, retailPrice: 49.99, rating: 4.5, reviews: 1456, moq: 100, verified: true, freeShipping: true,
    name: { fr: 'Lampe de bureau LED contrôle tactile USB', en: 'LED Desk Lamp Touch Control USB Charging' },
    description: { fr: 'Luminosité réglable, port USB, température de couleur', en: 'Adjustable brightness, USB port, color temperature' },
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e7a14a69-1764656591353.png', alt: 'Lampe LED' },
];

// ─── Mots-clés pour la recherche ──────────────────────────────────────────────
const SEARCH_KEYWORDS = {
  1:  ['led', 'lumiere', 'lumière', 'éclairage', 'eclairage', 'industriel', 'high bay', 'lampe', 'light', 'lighting'],
  2:  ['chaise', 'bureau', 'ergonomique', 'siège', 'siege', 'chair', 'office', 'mobilier', 'furniture', 'assise'],
  3:  ['casque', 'bluetooth', 'audio', 'sans fil', 'wireless', 'headphone', 'écouteur', 'musique', 'headphones'],
  4:  ['bouteille', 'eau', 'acier', 'inoxydable', 'bottle', 'water', 'steel', 'boisson', 'thermos'],
  5:  ['lunette', 'sécurité', 'securite', 'protection', 'safety', 'goggles', 'anti-buée', 'yeux'],
  6:  ['carton', 'boîte', 'boite', 'emballage', 'box', 'packaging', 'ondulé', 'expédition'],
  7:  ['cable', 'câble', 'usb', 'chargeur', 'charge', 'charging', 'type-c', 'usb-c'],
  8:  ['bureau', 'debout', 'standing', 'desk', 'réglable', 'reglable', 'height', 'hauteur'],
  9:  ['gilet', 'veste', 'sécurité', 'securite', 'visibilité', 'vest', 'safety', 'reflective', 'chantier'],
  10: ['souris', 'mouse', 'sans fil', 'wireless', 'clavier', 'informatique', 'ordinateur'],
  11: ['armoire', 'rangement', 'tiroir', 'cabinet', 'storage', 'meuble', 'classeur'],
  12: ['lampe', 'led', 'bureau', 'desk', 'lamp', 'lumière', 'lumiere', 'éclairage', 'usb'],
};

function matchesSearch(product, query) {
  if (!query || !query.trim()) return false;
  const q = query.toLowerCase().trim();
  const lang_name_fr = product.name.fr.toLowerCase();
  const lang_name_en = product.name.en.toLowerCase();
  const desc_fr = product.description.fr.toLowerCase();
  const desc_en = product.description.en.toLowerCase();
  const keywords = SEARCH_KEYWORDS[product.id] || [];
  return (
    lang_name_fr.includes(q) ||
    lang_name_en.includes(q) ||
    desc_fr.includes(q) ||
    desc_en.includes(q) ||
    product.category.includes(q) ||
    keywords.some(k => k.includes(q) || q.includes(k))
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams?.get('q') || '';
  const [lang, setLang] = useState('fr');
  const [filters, setFilters] = useState({ category: '', priceRange: { min: '', max: '' }, location: '', shipping: '' });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem('language') || 'fr');
    setCurrentPage(1);
  }, [rawQuery]);

  // ─── Filter + search ───────────────────────────────────────────────────────
  const getFiltered = () => {
    let list = [...ALL_PRODUCTS];

    // Search by query
    if (rawQuery.trim()) {
      list = list.filter(p => matchesSearch(p, rawQuery));
    }

    // Category filter
    if (filters.category) list = list.filter(p => p.category === filters.category);

    // Price range
    if (filters.priceRange?.min) list = list.filter(p => p.wholesalePrice >= parseFloat(filters.priceRange.min));
    if (filters.priceRange?.max) list = list.filter(p => p.wholesalePrice <= parseFloat(filters.priceRange.max));

    // Location
    if (filters.location) list = list.filter(p => p.location === filters.location);

    // Free shipping
    if (filters.shipping === 'free') list = list.filter(p => p.freeShipping);

    // Sort
    if (sortBy === 'price_asc') list.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
    else if (sortBy === 'price_desc') list.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  };

  const filtered = getFiltered();
  const PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const displayed = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleFilterChange = (f) => { setIsLoading(true); setFilters(f); setCurrentPage(1); setTimeout(() => setIsLoading(false), 250); };
  const handleRemoveFilter = (type) => {
    if (type === 'all') handleFilterChange({ category: '', priceRange: { min: '', max: '' }, location: '', shipping: '' });
    else if (type === 'priceRange') handleFilterChange({ ...filters, priceRange: { min: '', max: '' } });
    else handleFilterChange({ ...filters, [type]: '' });
  };
  const handleSortChange = (s) => { setIsLoading(true); setSortBy(s); setTimeout(() => setIsLoading(false), 200); };
  const toggleWishlist = (id) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleCompare = (id) => setCompareList(p => {
    if (p.includes(id)) return p.filter(x => x !== id);
    if (p.length >= 4) return p;
    return [...p, id];
  });

  const hasQuery = rawQuery.trim().length > 0;
  const noResults = filtered.length === 0;

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 lg:pb-8">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Header */}
        <div className="mb-6 pt-4">
          {hasQuery ? (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {lang === 'fr' ? 'Résultats pour' : 'Results for'}{' '}
                <span className="text-primary">"{rawQuery}"</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                {filtered.length} {lang === 'fr'
                  ? `produit${filtered.length !== 1 ? 's' : ''} trouvé${filtered.length !== 1 ? 's' : ''}`
                  : `product${filtered.length !== 1 ? 's' : ''} found`}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {lang === 'fr' ? 'Catalogue produits' : 'Product Catalogue'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {lang === 'fr'
                  ? 'Utilisez la barre de recherche ci-dessus pour trouver un produit'
                  : 'Use the search bar above to find a product'}
              </p>
            </>
          )}
        </div>

        {/* Empty state — no query typed yet */}
        {!hasQuery && (
          <div className="bg-card border border-border rounded-xl p-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MagnifyingGlassIcon" size={30} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {lang === 'fr' ? 'Lancez votre recherche' : 'Start your search'}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {lang === 'fr'
                ? 'Tapez le nom d\'un produit ou d\'une catégorie dans la barre de recherche'
                : 'Type a product name or category in the search bar above'}
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {(lang === 'fr'
                ? ['Chaises de bureau', 'LED industriel', 'Câbles USB', 'Gilets sécurité', 'Lampes de bureau', 'Armoires']
                : ['Office chairs', 'LED lighting', 'USB cables', 'Safety vests', 'Desk lamps', 'Storage cabinets']
              ).map(hint => (
                <Link key={hint} href={`/product-search-results?q=${encodeURIComponent(hint)}`}
                  className="px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary border border-border rounded-full transition-smooth">
                  {hint}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {hasQuery && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FilterPanel onFilterChange={handleFilterChange} resultCount={filtered.length} />
            </div>
            <div className="lg:col-span-3 space-y-5">
              <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
              <SortControls onSortChange={handleSortChange} viewMode={viewMode} onViewModeChange={setViewMode} />

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Icon name="ArrowPathIcon" size={36} className="text-primary animate-spin" />
                </div>
              ) : noResults ? (
                <div className="bg-card border border-border rounded-xl p-14 text-center">
                  <Icon name="MagnifyingGlassIcon" size={40} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {lang === 'fr' ? 'Aucun produit trouvé' : 'No products found'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {lang === 'fr'
                      ? `Aucun résultat pour "${rawQuery}". Essayez un autre terme.`
                      : `No results for "${rawQuery}". Try a different search.`}
                  </p>
                  <Link href="/product-search-results"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                    <Icon name="ArrowLeftIcon" size={15} />
                    <span>{lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}</span>
                  </Link>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
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
        <Icon name="ArrowPathIcon" size={36} className="text-primary animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
