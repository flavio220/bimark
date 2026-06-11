import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AccountTypeSelection({ selectedType, onTypeSelect, translations }) {
  const accountTypes = [
    {
      type: 'buyer',
      icon: 'ShoppingCartIcon',
      title: translations?.buyer?.title,
      description: translations?.buyer?.description,
      features: translations?.buyer?.features
    },
    {
      type: 'seller',
      icon: 'BuildingStorefrontIcon',
      title: translations?.seller?.title,
      description: translations?.seller?.description,
      features: translations?.seller?.features
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{translations?.selectAccountType}</h2>
        <p className="text-muted-foreground">{translations?.chooseRole}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {accountTypes?.map((account) => (
          <button
            key={account?.type}
            onClick={() => onTypeSelect(account?.type)}
            className={`p-6 rounded-lg border-2 transition-smooth text-left hover:shadow-card ${
              selectedType === account?.type
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedType === account?.type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon name={account?.icon} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{account?.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{account?.description}</p>
                <ul className="space-y-2">
                  {account?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-foreground">
                      <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {selectedType === account?.type && (
              <div className="mt-4 flex items-center justify-end">
                <span className="text-sm font-medium text-primary flex items-center space-x-1">
                  <Icon name="CheckCircleIcon" size={18} />
                  <span>{translations?.selected}</span>
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

AccountTypeSelection.propTypes = {
  selectedType: PropTypes?.string,
  onTypeSelect: PropTypes?.func?.isRequired,
  translations: PropTypes?.shape({
    selectAccountType: PropTypes?.string?.isRequired,
    chooseRole: PropTypes?.string?.isRequired,
    selected: PropTypes?.string?.isRequired,
    buyer: PropTypes?.shape({
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired
    })?.isRequired,
    seller: PropTypes?.shape({
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired
    })?.isRequired
  })?.isRequired
};