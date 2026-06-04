import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function TrustSignals({ metrics, currentLanguage }) {
  return (
    <section className="py-12 bg-muted rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={metric?.icon} size={24} className="text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">
              {metric?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {metric?.label?.[currentLanguage]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

TrustSignals.propTypes = {
  metrics: PropTypes?.arrayOf(
    PropTypes?.shape({
      icon: PropTypes?.string?.isRequired,
      value: PropTypes?.string?.isRequired,
      label: PropTypes?.shape({
        en: PropTypes?.string?.isRequired,
        fr: PropTypes?.string?.isRequired,
      })?.isRequired,
    })
  )?.isRequired,
  currentLanguage: PropTypes?.string?.isRequired,
};