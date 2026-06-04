'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function LoginForm({ translations }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);

  const mockCredentials = {
    buyer: { email: 'buyer@bimark.com', password: 'Buyer@123' },
    seller: { email: 'seller@bimark.com', password: 'Seller@123' }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = translations?.errors?.emailRequired;
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = translations?.errors?.emailInvalid;
    }
    
    if (!formData?.password) {
      newErrors.password = translations?.errors?.passwordRequired;
    } else if (formData?.password?.length < 6) {
      newErrors.password = translations?.errors?.passwordLength;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const isBuyer = formData?.email === mockCredentials?.buyer?.email && 
                      formData?.password === mockCredentials?.buyer?.password;
      const isSeller = formData?.email === mockCredentials?.seller?.email && 
                       formData?.password === mockCredentials?.seller?.password;
      
      if (isBuyer || isSeller) {
        const userRole = isBuyer ? 'buyer' : 'seller';
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userEmail', formData?.email);
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        router?.push(isBuyer ? '/buyer-dashboard' : '/seller-dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        setErrors({
          submit: `${translations?.errors?.invalidCredentials}\n\n${translations?.errors?.credentialsHint}`
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setErrors({ submit: translations?.errors?.socialLoginUnavailable });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {translations?.form?.email}
          </label>
          <div className="relative">
            <Icon 
              name="EnvelopeIcon" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${
                errors?.email ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
              }`}
              placeholder={translations?.form?.emailPlaceholder}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          {errors?.email && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors?.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            {translations?.form?.password}
          </label>
          <div className="relative">
            <Icon 
              name="LockClosedIcon" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${
                errors?.password ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
              }`}
              placeholder={translations?.form?.passwordPlaceholder}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
            </button>
          </div>
          {errors?.password && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors?.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 border-input rounded text-primary focus:ring-2 focus:ring-ring transition-smooth"
              disabled={isLoading}
            />
            <span className="text-sm text-foreground">{translations?.form?.rememberMe}</span>
          </label>
          <button
            type="button"
            className="text-sm text-primary hover:underline transition-smooth"
            disabled={isLoading}
          >
            {translations?.form?.forgotPassword}
          </button>
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error whitespace-pre-line">{errors?.submit}</p>
            </div>
          </div>
        )}

        {/* Login Attempts Warning */}
        {loginAttempts >= 3 && (
          <div className="p-4 bg-warning/10 border border-warning rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="ShieldExclamationIcon" size={20} className="text-warning mt-0.5" />
              <p className="text-sm text-warning">{translations?.errors?.tooManyAttempts}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>{translations?.form?.signingIn}</span>
            </>
          ) : (
            <>
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span>{translations?.form?.signIn}</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">{translations?.form?.orContinueWith}</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-3 border border-input rounded-md hover:bg-muted transition-smooth disabled:opacity-50"
          >
            <Icon name="GlobeAltIcon" size={20} className="text-foreground" />
            <span className="text-sm font-medium text-foreground">Google</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('microsoft')}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-3 border border-input rounded-md hover:bg-muted transition-smooth disabled:opacity-50"
          >
            <Icon name="WindowIcon" size={20} className="text-foreground" />
            <span className="text-sm font-medium text-foreground">Microsoft</span>
          </button>
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  translations: PropTypes?.shape({
    form: PropTypes?.shape({
      email: PropTypes?.string?.isRequired,
      emailPlaceholder: PropTypes?.string?.isRequired,
      password: PropTypes?.string?.isRequired,
      passwordPlaceholder: PropTypes?.string?.isRequired,
      rememberMe: PropTypes?.string?.isRequired,
      forgotPassword: PropTypes?.string?.isRequired,
      signIn: PropTypes?.string?.isRequired,
      signingIn: PropTypes?.string?.isRequired,
      orContinueWith: PropTypes?.string?.isRequired
    })?.isRequired,
    errors: PropTypes?.shape({
      emailRequired: PropTypes?.string?.isRequired,
      emailInvalid: PropTypes?.string?.isRequired,
      passwordRequired: PropTypes?.string?.isRequired,
      passwordLength: PropTypes?.string?.isRequired,
      invalidCredentials: PropTypes?.string?.isRequired,
      credentialsHint: PropTypes?.string?.isRequired,
      tooManyAttempts: PropTypes?.string?.isRequired,
      socialLoginUnavailable: PropTypes?.string?.isRequired
    })?.isRequired
  })?.isRequired
};