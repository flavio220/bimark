'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function BusinessDetailsForm({ formData, onFormChange, translations }) {
  const [uploadedFiles, setUploadedFiles] = useState({
    businessLicense: null,
    taxDocument: null
  });

  const businessCategories = [
    'Electronics & Technology',
    'Fashion & Apparel',
    'Home & Garden',
    'Industrial Equipment',
    'Food & Beverage',
    'Health & Beauty',
    'Automotive',
    'Sports & Outdoors',
    'Office Supplies',
    'Other'
  ];

  const handleFileUpload = (fileType, e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: file?.name
      }));
      onFormChange(fileType, file?.name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{translations?.businessDetails}</h2>
        <p className="text-muted-foreground">{translations?.provideBusinessInfo}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.companyName} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="BuildingOfficeIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={formData?.companyName || ''}
            onChange={(e) => onFormChange('companyName', e?.target?.value)}
            placeholder={translations?.companyNamePlaceholder}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.businessCategory} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="TagIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <select
            value={formData?.businessCategory || ''}
            onChange={(e) => onFormChange('businessCategory', e?.target?.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth appearance-none"
            required
          >
            <option value="">{translations?.selectCategory}</option>
            {businessCategories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.registrationNumber} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="IdentificationIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={formData?.registrationNumber || ''}
            onChange={(e) => onFormChange('registrationNumber', e?.target?.value)}
            placeholder={translations?.registrationNumberPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.businessAddress} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="MapPinIcon"
            size={20}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <textarea
            value={formData?.businessAddress || ''}
            onChange={(e) => onFormChange('businessAddress', e?.target?.value)}
            placeholder={translations?.businessAddressPlaceholder}
            rows={3}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
            required
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {translations?.city} <span className="text-error">*</span>
          </label>
          <input
            type="text"
            value={formData?.city || ''}
            onChange={(e) => onFormChange('city', e?.target?.value)}
            placeholder={translations?.cityPlaceholder}
            className="w-full px-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {translations?.postalCode} <span className="text-error">*</span>
          </label>
          <input
            type="text"
            value={formData?.postalCode || ''}
            onChange={(e) => onFormChange('postalCode', e?.target?.value)}
            placeholder={translations?.postalCodePlaceholder}
            className="w-full px-4 py-2.5 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {translations?.country} <span className="text-error">*</span>
        </label>
        <div className="relative">
          <Icon
            name="GlobeAltIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <select
            value={formData?.country || ''}
            onChange={(e) => onFormChange('country', e?.target?.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth appearance-none"
            required
          >
            <option value="">{translations?.selectCountry}</option>
            <option value="Canada">Canada</option>
            <option value="France">France</option>
            <option value="United States">United States</option>
            <option value="Belgium">Belgium</option>
            <option value="Switzerland">Switzerland</option>
          </select>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{translations?.verificationDocuments}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {translations?.businessLicense} <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileUpload('businessLicense', e)}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="businessLicense"
                required
              />
              <label
                htmlFor="businessLicense"
                className="flex items-center justify-between px-4 py-3 border-2 border-dashed border-border rounded-md bg-muted hover:bg-muted/80 cursor-pointer transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="DocumentIcon" size={20} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {uploadedFiles?.businessLicense || translations?.uploadDocument}
                  </span>
                </div>
                <Icon name="ArrowUpTrayIcon" size={20} className="text-muted-foreground" />
              </label>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{translations?.acceptedFormats}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {translations?.taxDocument} <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileUpload('taxDocument', e)}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="taxDocument"
                required
              />
              <label
                htmlFor="taxDocument"
                className="flex items-center justify-between px-4 py-3 border-2 border-dashed border-border rounded-md bg-muted hover:bg-muted/80 cursor-pointer transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="DocumentIcon" size={20} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {uploadedFiles?.taxDocument || translations?.uploadDocument}
                  </span>
                </div>
                <Icon name="ArrowUpTrayIcon" size={20} className="text-muted-foreground" />
              </label>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{translations?.acceptedFormats}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

BusinessDetailsForm.propTypes = {
  formData: PropTypes?.shape({
    companyName: PropTypes?.string,
    businessCategory: PropTypes?.string,
    registrationNumber: PropTypes?.string,
    businessAddress: PropTypes?.string,
    city: PropTypes?.string,
    postalCode: PropTypes?.string,
    country: PropTypes?.string,
    businessLicense: PropTypes?.string,
    taxDocument: PropTypes?.string
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  translations: PropTypes?.shape({
    businessDetails: PropTypes?.string?.isRequired,
    provideBusinessInfo: PropTypes?.string?.isRequired,
    companyName: PropTypes?.string?.isRequired,
    companyNamePlaceholder: PropTypes?.string?.isRequired,
    businessCategory: PropTypes?.string?.isRequired,
    selectCategory: PropTypes?.string?.isRequired,
    registrationNumber: PropTypes?.string?.isRequired,
    registrationNumberPlaceholder: PropTypes?.string?.isRequired,
    businessAddress: PropTypes?.string?.isRequired,
    businessAddressPlaceholder: PropTypes?.string?.isRequired,
    city: PropTypes?.string?.isRequired,
    cityPlaceholder: PropTypes?.string?.isRequired,
    postalCode: PropTypes?.string?.isRequired,
    postalCodePlaceholder: PropTypes?.string?.isRequired,
    country: PropTypes?.string?.isRequired,
    selectCountry: PropTypes?.string?.isRequired,
    verificationDocuments: PropTypes?.string?.isRequired,
    businessLicense: PropTypes?.string?.isRequired,
    taxDocument: PropTypes?.string?.isRequired,
    uploadDocument: PropTypes?.string?.isRequired,
    acceptedFormats: PropTypes?.string?.isRequired
  })?.isRequired
};