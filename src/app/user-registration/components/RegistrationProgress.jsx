import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function RegistrationProgress({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, label: 'Account Type', icon: 'UserCircleIcon' },
    { number: 2, label: 'Basic Info', icon: 'IdentificationIcon' },
    { number: 3, label: 'Business Details', icon: 'BuildingOfficeIcon' },
    { number: 4, label: 'Verification', icon: 'CheckBadgeIcon' }
  ];

  const visibleSteps = steps?.slice(0, totalSteps);

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {visibleSteps?.map((step, index) => (
          <div key={step?.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  currentStep > step?.number
                    ? 'bg-success border-success text-white'
                    : currentStep === step?.number
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                {currentStep > step?.number ? (
                  <Icon name="CheckIcon" size={24} />
                ) : (
                  <Icon name={step?.icon} size={24} />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>
            {index < visibleSteps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-6">
                <div
                  className={`h-full transition-smooth ${
                    currentStep > step?.number ? 'bg-success' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

RegistrationProgress.propTypes = {
  currentStep: PropTypes?.number?.isRequired,
  totalSteps: PropTypes?.number?.isRequired
};