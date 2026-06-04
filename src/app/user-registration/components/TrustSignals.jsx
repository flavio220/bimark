import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function TrustSignals({ translations }) {
  const trustFeatures = [
    {
      icon: 'ShieldCheckIcon',
      title: translations?.secureEncryption,
      description: translations?.secureEncryptionDesc
    },
    {
      icon: 'CheckBadgeIcon',
      title: translations?.verifiedSellers,
      description: translations?.verifiedSellersDesc
    },
    {
      icon: 'LockClosedIcon',
      title: translations?.dataProtection,
      description: translations?.dataProtectionDesc
    },
    {
      icon: 'GlobeAltIcon',
      title: translations?.globalReach,
      description: translations?.globalReachDesc
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheckIcon" size={24} className="text-success" />
        <h3 className="text-lg font-semibold text-foreground">{translations?.whyChooseUs}</h3>
      </div>
      <div className="space-y-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">50K+</p>
            <p className="text-xs text-muted-foreground">{translations?.activeUsers}</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">10K+</p>
            <p className="text-xs text-muted-foreground">{translations?.verifiedSuppliers}</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">100+</p>
            <p className="text-xs text-muted-foreground">{translations?.countries}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

TrustSignals.propTypes = {
  translations: PropTypes?.shape({
    whyChooseUs: PropTypes?.string?.isRequired,
    secureEncryption: PropTypes?.string?.isRequired,
    secureEncryptionDesc: PropTypes?.string?.isRequired,
    verifiedSellers: PropTypes?.string?.isRequired,
    verifiedSellersDesc: PropTypes?.string?.isRequired,
    dataProtection: PropTypes?.string?.isRequired,
    dataProtectionDesc: PropTypes?.string?.isRequired,
    globalReach: PropTypes?.string?.isRequired,
    globalReachDesc: PropTypes?.string?.isRequired,
    activeUsers: PropTypes?.string?.isRequired,
    verifiedSuppliers: PropTypes?.string?.isRequired,
    countries: PropTypes?.string?.isRequired
  })?.isRequired
};