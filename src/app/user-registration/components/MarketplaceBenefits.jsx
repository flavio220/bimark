import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function MarketplaceBenefits({ accountType, translations }) {
  const buyerBenefits = [
    {
      icon: 'MagnifyingGlassIcon',
      title: translations?.buyer?.benefit1Title,
      description: translations?.buyer?.benefit1Desc
    },
    {
      icon: 'CurrencyDollarIcon',
      title: translations?.buyer?.benefit2Title,
      description: translations?.buyer?.benefit2Desc
    },
    {
      icon: 'TruckIcon',
      title: translations?.buyer?.benefit3Title,
      description: translations?.buyer?.benefit3Desc
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: translations?.buyer?.benefit4Title,
      description: translations?.buyer?.benefit4Desc
    }
  ];

  const sellerBenefits = [
    {
      icon: 'GlobeAltIcon',
      title: translations?.seller?.benefit1Title,
      description: translations?.seller?.benefit1Desc
    },
    {
      icon: 'ChartBarIcon',
      title: translations?.seller?.benefit2Title,
      description: translations?.seller?.benefit2Desc
    },
    {
      icon: 'ShieldCheckIcon',
      title: translations?.seller?.benefit3Title,
      description: translations?.seller?.benefit3Desc
    },
    {
      icon: 'CreditCardIcon',
      title: translations?.seller?.benefit4Title,
      description: translations?.seller?.benefit4Desc
    }
  ];

  const benefits = accountType === 'buyer' ? buyerBenefits : sellerBenefits;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {accountType === 'buyer' ? translations?.buyerBenefitsTitle : translations?.sellerBenefitsTitle}
      </h3>
      <div className="space-y-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted transition-smooth">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">{benefit?.title}</h4>
              <p className="text-xs text-muted-foreground">{benefit?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

MarketplaceBenefits.propTypes = {
  accountType: PropTypes?.string?.isRequired,
  translations: PropTypes?.shape({
    buyerBenefitsTitle: PropTypes?.string?.isRequired,
    sellerBenefitsTitle: PropTypes?.string?.isRequired,
    buyer: PropTypes?.shape({
      benefit1Title: PropTypes?.string?.isRequired,
      benefit1Desc: PropTypes?.string?.isRequired,
      benefit2Title: PropTypes?.string?.isRequired,
      benefit2Desc: PropTypes?.string?.isRequired,
      benefit3Title: PropTypes?.string?.isRequired,
      benefit3Desc: PropTypes?.string?.isRequired,
      benefit4Title: PropTypes?.string?.isRequired,
      benefit4Desc: PropTypes?.string?.isRequired
    })?.isRequired,
    seller: PropTypes?.shape({
      benefit1Title: PropTypes?.string?.isRequired,
      benefit1Desc: PropTypes?.string?.isRequired,
      benefit2Title: PropTypes?.string?.isRequired,
      benefit2Desc: PropTypes?.string?.isRequired,
      benefit3Title: PropTypes?.string?.isRequired,
      benefit3Desc: PropTypes?.string?.isRequired,
      benefit4Title: PropTypes?.string?.isRequired,
      benefit4Desc: PropTypes?.string?.isRequired
    })?.isRequired
  })?.isRequired
};