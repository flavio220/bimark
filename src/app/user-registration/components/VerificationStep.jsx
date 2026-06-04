import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function VerificationStep({ formData, accountType, translations }) {
  const summaryItems = [
    {
      icon: 'UserCircleIcon',
      label: translations?.accountType,
      value: accountType === 'buyer' ? translations?.buyer : translations?.seller
    },
    {
      icon: 'UserIcon',
      label: translations?.fullName,
      value: `${formData?.firstName || ''} ${formData?.lastName || ''}`
    },
    {
      icon: 'EnvelopeIcon',
      label: translations?.email,
      value: formData?.email || ''
    },
    {
      icon: 'PhoneIcon',
      label: translations?.phone,
      value: formData?.phone || ''
    }
  ];

  if (accountType === 'seller') {
    summaryItems?.push(
      {
        icon: 'BuildingOfficeIcon',
        label: translations?.companyName,
        value: formData?.companyName || ''
      },
      {
        icon: 'MapPinIcon',
        label: translations?.location,
        value: `${formData?.city || ''}, ${formData?.country || ''}`
      }
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckBadgeIcon" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{translations?.reviewInformation}</h2>
        <p className="text-muted-foreground">{translations?.verifyDetails}</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        {summaryItems?.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={item?.icon} size={20} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">{item?.label}</p>
              <p className="text-base text-foreground">{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{translations?.nextSteps}</h4>
            <p className="text-sm text-muted-foreground">{translations?.verificationMessage}</p>
          </div>
        </div>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-success" />
          <h4 className="text-sm font-semibold text-foreground">{translations?.securityFeatures}</h4>
        </div>
        <ul className="space-y-2">
          {translations?.securityList?.map((item, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
              <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

VerificationStep.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string,
    lastName: PropTypes?.string,
    email: PropTypes?.string,
    phone: PropTypes?.string,
    companyName: PropTypes?.string,
    city: PropTypes?.string,
    country: PropTypes?.string
  })?.isRequired,
  accountType: PropTypes?.string?.isRequired,
  translations: PropTypes?.shape({
    reviewInformation: PropTypes?.string?.isRequired,
    verifyDetails: PropTypes?.string?.isRequired,
    accountType: PropTypes?.string?.isRequired,
    buyer: PropTypes?.string?.isRequired,
    seller: PropTypes?.string?.isRequired,
    fullName: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    phone: PropTypes?.string?.isRequired,
    companyName: PropTypes?.string?.isRequired,
    location: PropTypes?.string?.isRequired,
    nextSteps: PropTypes?.string?.isRequired,
    verificationMessage: PropTypes?.string?.isRequired,
    securityFeatures: PropTypes?.string?.isRequired,
    securityList: PropTypes?.arrayOf(PropTypes?.string)?.isRequired
  })?.isRequired
};