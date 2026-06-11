import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CategoryGrid({ categories, currentLanguage }) {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          {currentLanguage === 'en' ? 'Shop by Category' : 'Acheter par catégorie'}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories?.map((category) => (
          <Link
            key={category?.id}
            href={`/product-search-results?category=${category?.slug}`}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth"
          >
            <div className="relative h-48 overflow-hidden">
              <AppImage
                src={category?.image}
                alt={category?.alt}
                fill
                className="object-cover group-hover:scale-110 transition-smooth"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {category?.name?.[currentLanguage]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category?.productCount} {currentLanguage === 'en' ? 'products' : 'produits'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

CategoryGrid.propTypes = {
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      slug: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      name: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
      productCount: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
  currentLanguage: PropTypes?.string?.isRequired,
};