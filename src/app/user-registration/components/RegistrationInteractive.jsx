'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import RegistrationProgress from './RegistrationProgress';
import AccountTypeSelection from './AccountTypeSelection';
import BasicInfoForm from './BasicInfoForm';
import BusinessDetailsForm from './BusinessDetailsForm';
import VerificationStep from './VerificationStep';
import TrustSignals from './TrustSignals';
import MarketplaceBenefits from './MarketplaceBenefits';

export default function RegistrationInteractive({ translations }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessCategory: '',
    registrationNumber: '',
    businessAddress: '',
    city: '',
    postalCode: '',
    country: '',
    businessLicense: '',
    taxDocument: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = accountType === 'seller' ? 4 : 3;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (!savedLanguage) {
      localStorage.setItem('language', 'en');
    }
  }, []);

  const handleTypeSelect = (type) => {
    setAccountType(type);
    setCurrentStep(2);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 2) {
      if (!formData?.firstName?.trim()) newErrors.firstName = translations?.errors?.firstNameRequired;
      if (!formData?.lastName?.trim()) newErrors.lastName = translations?.errors?.lastNameRequired;
      if (!formData?.email?.trim()) {
        newErrors.email = translations?.errors?.emailRequired;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = translations?.errors?.emailInvalid;
      }
      if (!formData?.phone?.trim()) newErrors.phone = translations?.errors?.phoneRequired;
      if (!formData?.password) {
        newErrors.password = translations?.errors?.passwordRequired;
      } else if (formData?.password?.length < 8) {
        newErrors.password = translations?.errors?.passwordLength;
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = translations?.errors?.passwordMismatch;
      }
    }

    if (currentStep === 3 && accountType === 'seller') {
      if (!formData?.companyName?.trim()) newErrors.companyName = translations?.errors?.companyNameRequired;
      if (!formData?.businessCategory) newErrors.businessCategory = translations?.errors?.categoryRequired;
      if (!formData?.registrationNumber?.trim()) newErrors.registrationNumber = translations?.errors?.registrationRequired;
      if (!formData?.businessAddress?.trim()) newErrors.businessAddress = translations?.errors?.addressRequired;
      if (!formData?.city?.trim()) newErrors.city = translations?.errors?.cityRequired;
      if (!formData?.postalCode?.trim()) newErrors.postalCode = translations?.errors?.postalCodeRequired;
      if (!formData?.country) newErrors.country = translations?.errors?.countryRequired;
      if (!formData?.businessLicense) newErrors.businessLicense = translations?.errors?.licenseRequired;
      if (!formData?.taxDocument) newErrors.taxDocument = translations?.errors?.taxDocRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', accountType);
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', `${formData?.firstName} ${formData?.lastName}`);

      const dashboardRoute = accountType === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
      router?.push(dashboardRoute);
    } catch (error) {
      setErrors({ submit: translations?.errors?.registrationFailed });
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <AccountTypeSelection
          selectedType={accountType}
          onTypeSelect={handleTypeSelect}
          translations={translations?.accountType}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <BasicInfoForm
          formData={formData}
          onFormChange={handleFormChange}
          translations={translations?.basicInfo}
        />
      );
    }

    if (currentStep === 3 && accountType === 'seller') {
      return (
        <BusinessDetailsForm
          formData={formData}
          onFormChange={handleFormChange}
          translations={translations?.businessDetails}
        />
      );
    }

    if ((currentStep === 3 && accountType === 'buyer') || (currentStep === 4 && accountType === 'seller')) {
      return (
        <VerificationStep
          formData={formData}
          accountType={accountType}
          translations={translations?.verification}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Registration Form */}
          <div className="lg:col-span-2">
            {currentStep > 1 && (
              <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} />
            )}

            <div className="bg-card border border-border rounded-lg shadow-card p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {errors?.submit && (
                  <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-md flex items-start space-x-3">
                    <Icon name="ExclamationCircleIcon" size={20} className="text-error mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-error">{errors?.submit}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep > 1 && (
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center space-x-2 px-6 py-2.5 border border-border rounded-md text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="ArrowLeftIcon" size={20} />
                      <span>{translations?.buttons?.back}</span>
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth"
                      >
                        <span>{translations?.buttons?.next}</span>
                        <Icon name="ArrowRightIcon" size={20} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-success text-white rounded-md hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                            <span>{translations?.buttons?.submitting}</span>
                          </>
                        ) : (
                          <>
                            <span>{translations?.buttons?.complete}</span>
                            <Icon name="CheckIcon" size={20} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </form>

              {/* Login Link */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  {translations?.alreadyHaveAccount}{' '}
                  <Link href="/user-login" className="text-primary font-medium hover:underline">
                    {translations?.signIn}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TrustSignals translations={translations?.trustSignals} />
            {accountType && (
              <MarketplaceBenefits accountType={accountType} translations={translations?.benefits} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

RegistrationInteractive.propTypes = {
  translations: PropTypes?.shape({
    accountType: PropTypes?.object?.isRequired,
    basicInfo: PropTypes?.object?.isRequired,
    businessDetails: PropTypes?.object?.isRequired,
    verification: PropTypes?.object?.isRequired,
    trustSignals: PropTypes?.object?.isRequired,
    benefits: PropTypes?.object?.isRequired,
    buttons: PropTypes?.object?.isRequired,
    errors: PropTypes?.object?.isRequired,
    alreadyHaveAccount: PropTypes?.string?.isRequired,
    signIn: PropTypes?.string?.isRequired
  })?.isRequired
};