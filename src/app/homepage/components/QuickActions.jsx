import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function QuickActions({ actions, currentLanguage }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">
        {currentLanguage === 'en' ? 'Quick Actions' : 'Actions rapides'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions?.map((action, index) => (
          <Link
            key={index}
            href={action?.href}
            className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-lg p-6 hover:shadow-card transition-smooth group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth">
                <Icon name={action?.icon} size={24} className="text-primary-foreground" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {action?.title?.[currentLanguage]}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {action?.description?.[currentLanguage]}
                </p>
                <div className="flex items-center space-x-2 text-primary font-medium text-sm">
                  <span>{currentLanguage === 'en' ? 'Get Started' : 'Commencer'}</span>
                  <Icon name="ArrowRightIcon" size={16} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

QuickActions.propTypes = {
  actions: PropTypes?.arrayOf(
    PropTypes?.shape({
      icon: PropTypes?.string?.isRequired,
      href: PropTypes?.string?.isRequired,
      title: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
      description: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
    })
  )?.isRequired,
  currentLanguage: PropTypes?.string?.isRequired,
};