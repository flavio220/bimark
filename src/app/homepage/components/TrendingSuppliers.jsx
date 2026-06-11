import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function TrendingSuppliers({ suppliers, currentLanguage }) {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          {currentLanguage === 'en' ? 'Trending Suppliers' : 'Fournisseurs tendance'}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers?.map((supplier) => (
          <Link
            key={supplier?.id}
            href={`/product-search-results?supplier=${supplier?.id}`}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-smooth group"
          >
            <div className="flex items-start space-x-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage
                  src={supplier?.logo}
                  alt={supplier?.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth truncate">
                    {supplier?.name}
                  </h3>
                  {supplier?.verified && (
                    <Icon name="CheckBadgeIcon" size={18} variant="solid" className="text-success flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  <Icon name="MapPinIcon" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{supplier?.location}</span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="StarIcon"
                        size={14}
                        variant={i < Math.floor(supplier?.rating) ? 'solid' : 'outline'}
                        className={i < Math.floor(supplier?.rating) ? 'text-accent' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {supplier?.rating} ({supplier?.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {supplier?.productCount} {currentLanguage === 'en' ? 'products' : 'produits'}
                  </span>
                  <span className="text-success font-medium">
                    {supplier?.responseRate}% {currentLanguage === 'en' ? 'response' : 'réponse'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

TrendingSuppliers.propTypes = {
  suppliers: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      logo: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      location: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      reviews: PropTypes?.number?.isRequired,
      productCount: PropTypes?.number?.isRequired,
      responseRate: PropTypes?.number?.isRequired,
      verified: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  currentLanguage: PropTypes?.string?.isRequired,
};