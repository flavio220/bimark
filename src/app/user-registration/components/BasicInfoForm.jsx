'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function BasicInfoForm({ formData, onFormChange, translations }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (password?.match(/[a-z]/) && password?.match(/[A-Z]/)) strength += 25;
    if (password?.match(/[0-9]/)) strength += 25;
    if (password?.match(/[^a-zA-Z0-9]/)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e?.target?.value;
    onFormChange('password', newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-error';
    if (passwordStrength <= 50) return 'bg-warning';
    if (passwordStrength <= 75) return 'bg-accent';
    return 'bg-success';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return translations?.passwordStrength?.weak;
    if (passwordStrength <= 50) return translations?.passwordStrength?.fair;
    if (passwordStrength <= 75) return translations?.passwordStrength?.good;
    return translations?.passwordStrength?.strong;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{translations?.basicInfo}</h2>
        <p className="text-muted-foreground">{translations?.enterDetails}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {translations?.firstName} <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Icon
              name="UserIcon"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={formData?.firstName || ''}
              onChange={(e) => onFormChange('firstName', e?.target?.value)}
              placeholder={translations?.firstNamePlaceholder}
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {translations?.lastName} <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Icon
              name="UserIcon"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={formData?.lastName || ''}
              onChange={(e) => onFormChange('lastName', e?.target?.value)}
              placeholder={translations?.lastNamePlaceholder}
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.email} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="EnvelopeIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="email"
            value={formData?.email || ''}
            onChange={(e) => onFormChange('email', e?.target?.value)}
            placeholder={translations?.emailPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.phone} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="PhoneIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="tel"
            value={formData?.phone || ''}
            onChange={(e) => onFormChange('phone', e?.target?.value)}
            placeholder={translations?.phonePlaceholder}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.password} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="LockClosedIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData?.password || ''}
            onChange={handlePasswordChange}
            placeholder={translations?.passwordPlaceholder}
            className="w-full pl-10 pr-12 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
          </button>
        </div>
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{translations?.passwordStrength?.label}</span>
              <span className="text-xs font-medium text-foreground">{getStrengthLabel()}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${getStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.confirmPassword} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="LockClosedIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData?.confirmPassword || ''}
            onChange={(e) => onFormChange('confirmPassword', e?.target?.value)}
            placeholder={translations?.confirmPasswordPlaceholder}
            className="w-full pl-10 pr-12 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
          </button>
        </div>
        {formData?.confirmPassword && formData?.password !== formData?.confirmPassword && (
          <p className="mt-1 text-xs text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={14} />
            <span>{translations?.passwordMismatch}</span>
          </p>
        )}
      </div>
    </div>
  );
}

BasicInfoForm.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string,
    lastName: PropTypes?.string,
    email: PropTypes?.string,
    phone: PropTypes?.string,
    password: PropTypes?.string,
    confirmPassword: PropTypes?.string
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  translations: PropTypes?.shape({
    basicInfo: PropTypes?.string?.isRequired,
    enterDetails: PropTypes?.string?.isRequired,
    firstName: PropTypes?.string?.isRequired,
    firstNamePlaceholder: PropTypes?.string?.isRequired,
    lastName: PropTypes?.string?.isRequired,
    lastNamePlaceholder: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    emailPlaceholder: PropTypes?.string?.isRequired,
    phone: PropTypes?.string?.isRequired,
    phonePlaceholder: PropTypes?.string?.isRequired,
    password: PropTypes?.string?.isRequired,
    passwordPlaceholder: PropTypes?.string?.isRequired,
    confirmPassword: PropTypes?.string?.isRequired,
    confirmPasswordPlaceholder: PropTypes?.string?.isRequired,
    passwordMismatch: PropTypes?.string?.isRequired,
    passwordStrength: PropTypes?.shape({
      label: PropTypes?.string?.isRequired,
      weak: PropTypes?.string?.isRequired,
      fair: PropTypes?.string?.isRequired,
      good: PropTypes?.string?.isRequired,
      strong: PropTypes?.string?.isRequired
    })?.isRequired
  })?.isRequired
};