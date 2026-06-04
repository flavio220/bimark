'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function FeaturedProducts({ products, currentLanguage }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev?.includes(productId)
        ? prev?.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price, currency) => {
    if (currentLanguage === 'fr') {
      return `${price?.toLocaleString('fr-FR')} ${currency}`;
    }
    return `${currency} ${price?.toLocaleString('en-US')}`;
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          {currentLanguage === 'en' ? 'Featured Products' : 'Produits en vedette'}
        </h2>
        <Link
          href="/product-search-results"
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
        >
          <span className="font-medium">
            {currentLanguage === 'en' ? 'View All' : 'Voir tout'}
          </span>
          <Icon name="ArrowRightIcon" size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth group"
          >
            <div className="relative h-56 overflow-hidden">
              <Link href={`/product-search-results?id=${product?.id}`}>
                <AppImage
                  src={product?.image}
                  alt={product?.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-smooth"
                />
              </Link>
              <button
                onClick={() => toggleFavorite(product?.id)}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-smooth"
                aria-label="Add to favorites"
              >
                <Icon
                  name="HeartIcon"
                  size={20}
                  variant={favorites?.includes(product?.id) ? 'solid' : 'outline'}
                  className={favorites?.includes(product?.id) ? 'text-error' : 'text-foreground'}
                />
              </button>
              {product?.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground rounded-md text-xs font-semibold">
                  {product?.badge?.[currentLanguage]}
                </div>
              )}
            </div>

            <div className="p-4">
              <Link href={`/product-search-results?id=${product?.id}`}>
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-smooth">
                  {product?.name?.[currentLanguage]}
                </h3>
              </Link>

              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={14}
                      variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                      className={i < Math.floor(product?.rating) ? 'text-accent' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviews})
                </span>
              </div>

              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(product?.price, product?.currency)}
                </span>
                {product?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice, product?.currency)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>
                  {currentLanguage === 'en' ? 'Min Order:' : 'Commande min:'} {product?.minOrder}
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="MapPinIcon" size={14} />
                  <span>{product?.location}</span>
                </span>
              </div>

              <Link
                href={`/product-search-results?id=${product?.id}`}
                className="w-full block text-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
              >
                {currentLanguage === 'en' ? 'View Details' : 'Voir les détails'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

FeaturedProducts.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      name: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      currency: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      reviews: PropTypes?.number?.isRequired,
      minOrder: PropTypes?.string?.isRequired,
      location: PropTypes?.string?.isRequired,
      badge: PropTypes?.shape({
        en: PropTypes?.string,
        fr: PropTypes?.string,
      }),
    })
  )?.isRequired,
  currentLanguage: PropTypes?.string?.isRequired,
};