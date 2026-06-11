import Header from '@/components/common/Header';
import RegistrationInteractive from './components/RegistrationInteractive';

export const metadata = {
  title: 'User Registration - Bimark',
  description: 'Create your Bimark account as a buyer or seller. Join our global B2B and B2C marketplace connecting French and English-speaking markets.'
};

export default function UserRegistrationPage() {
  const translations = {
    en: {
      accountType: {
        selectAccountType: 'Select Your Account Type',
        chooseRole: 'Choose how you want to use Bimark',
        selected: 'Selected',
        buyer: {
          title: 'Buyer Account',
          description: 'Source products from verified suppliers worldwide',
          features: [
            'Access to thousands of verified suppliers',
            'Bulk ordering and wholesale pricing',
            'Secure payment processing',
            'Order tracking and management'
          ]
        },
        seller: {
          title: 'Seller Account',
          description: 'Expand your business to global markets',
          features: [
            'Reach international buyers',
            'Advanced analytics dashboard',
            'Secure payment collection',
            'Marketing and promotional tools'
          ]
        }
      },
      basicInfo: {
        basicInfo: 'Basic Information',
        enterDetails: 'Enter your personal details to create your account',
        firstName: 'First Name',
        firstNamePlaceholder: 'Enter your first name',
        lastName: 'Last Name',
        lastNamePlaceholder: 'Enter your last name',
        email: 'Email Address',
        emailPlaceholder: 'your.email@example.com',
        phone: 'Phone Number',
        phonePlaceholder: '+1 (555) 000-0000',
        password: 'Password',
        passwordPlaceholder: 'Create a strong password',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Re-enter your password',
        passwordMismatch: 'Passwords do not match',
        passwordStrength: {
          label: 'Password Strength',
          weak: 'Weak',
          fair: 'Fair',
          good: 'Good',
          strong: 'Strong'
        }
      },
      businessDetails: {
        businessDetails: 'Business Details',
        provideBusinessInfo: 'Provide your business information for verification',
        companyName: 'Company Name',
        companyNamePlaceholder: 'Enter your company name',
        businessCategory: 'Business Category',
        selectCategory: 'Select your business category',
        registrationNumber: 'Business Registration Number',
        registrationNumberPlaceholder: 'Enter registration number',
        businessAddress: 'Business Address',
        businessAddressPlaceholder: 'Enter complete business address',
        city: 'City',
        cityPlaceholder: 'Enter city',
        postalCode: 'Postal Code',
        postalCodePlaceholder: 'Enter postal code',
        country: 'Country',
        selectCountry: 'Select your country',
        verificationDocuments: 'Verification Documents',
        businessLicense: 'Business License',
        taxDocument: 'Tax Registration Document',
        uploadDocument: 'Click to upload document',
        acceptedFormats: 'Accepted formats: PDF, JPG, PNG (Max 5MB)'
      },
      verification: {
        reviewInformation: 'Review Your Information',
        verifyDetails: 'Please verify all details before submitting',
        accountType: 'Account Type',
        buyer: 'Buyer',
        seller: 'Seller',
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        companyName: 'Company Name',
        location: 'Location',
        nextSteps: 'Next Steps',
        verificationMessage: 'After registration, you will receive a verification email. Please verify your email address to activate your account and access all features.',
        securityFeatures: 'Security & Privacy',
        securityList: [
          'Your data is encrypted with industry-standard SSL',
          'We never share your information with third parties',
          'Two-factor authentication available',
          'Regular security audits and compliance checks'
        ]
      },
      trustSignals: {
        whyChooseUs: 'Why Choose Bimark?',
        secureEncryption: 'Secure Encryption',
        secureEncryptionDesc: 'Bank-level security protects your data',
        verifiedSellers: 'Verified Sellers',
        verifiedSellersDesc: 'All suppliers undergo strict verification',
        dataProtection: 'Data Protection',
        dataProtectionDesc: 'GDPR compliant data handling',
        globalReach: 'Global Reach',
        globalReachDesc: 'Connect with buyers and sellers worldwide',
        activeUsers: 'Active Users',
        verifiedSuppliers: 'Verified Suppliers',
        countries: 'Countries'
      },
      benefits: {
        buyerBenefitsTitle: 'Buyer Benefits',
        sellerBenefitsTitle: 'Seller Benefits',
        buyer: {
          benefit1Title: 'Wide Product Selection',
          benefit1Desc: 'Access millions of products across all categories',
          benefit2Title: 'Competitive Pricing',
          benefit2Desc: 'Get wholesale prices and bulk discounts',
          benefit3Title: 'Reliable Shipping',
          benefit3Desc: 'Track orders with integrated logistics',
          benefit4Title: 'Direct Communication',
          benefit4Desc: 'Chat directly with suppliers for custom orders'
        },
        seller: {
          benefit1Title: 'Global Market Access',
          benefit1Desc: 'Reach buyers in French and English-speaking markets',
          benefit2Title: 'Analytics Dashboard',
          benefit2Desc: 'Track sales, views, and customer behavior',
          benefit3Title: 'Secure Transactions',
          benefit3Desc: 'Protected payments with escrow services',
          benefit4Title: 'Easy Payment Collection',
          benefit4Desc: 'Multiple payment methods and currencies'
        }
      },
      buttons: {
        back: 'Back',
        next: 'Next Step',
        complete: 'Complete Registration',
        submitting: 'Submitting...'
      },
      errors: {
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        phoneRequired: 'Phone number is required',
        passwordRequired: 'Password is required',
        passwordLength: 'Password must be at least 8 characters',
        passwordMismatch: 'Passwords do not match',
        companyNameRequired: 'Company name is required',
        categoryRequired: 'Business category is required',
        registrationRequired: 'Registration number is required',
        addressRequired: 'Business address is required',
        cityRequired: 'City is required',
        postalCodeRequired: 'Postal code is required',
        countryRequired: 'Country is required',
        licenseRequired: 'Business license is required',
        taxDocRequired: 'Tax document is required',
        registrationFailed: 'Registration failed. Please try again.'
      },
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In'
    },
    fr: {
      accountType: {
        selectAccountType: 'Sélectionnez Votre Type de Compte',
        chooseRole: 'Choisissez comment vous souhaitez utiliser Bimark',
        selected: 'Sélectionné',
        buyer: {
          title: 'Compte Acheteur',
          description: 'Sourcez des produits auprès de fournisseurs vérifiés dans le monde entier',
          features: [
            'Accès à des milliers de fournisseurs vérifiés',
            'Commandes en gros et tarifs de gros',
            'Traitement sécurisé des paiements',
            'Suivi et gestion des commandes'
          ]
        },
        seller: {
          title: 'Compte Vendeur',
          description: 'Développez votre entreprise sur les marchés mondiaux',
          features: [
            'Atteignez des acheteurs internationaux',
            'Tableau de bord analytique avancé',
            'Collecte sécurisée des paiements',
            'Outils de marketing et de promotion'
          ]
        }
      },
      basicInfo: {
        basicInfo: 'Informations de Base',
        enterDetails: 'Entrez vos informations personnelles pour créer votre compte',
        firstName: 'Prénom',
        firstNamePlaceholder: 'Entrez votre prénom',
        lastName: 'Nom',
        lastNamePlaceholder: 'Entrez votre nom',
        email: 'Adresse E-mail',
        emailPlaceholder: 'votre.email@exemple.com',
        phone: 'Numéro de Téléphone',
        phonePlaceholder: '+33 6 00 00 00 00',
        password: 'Mot de Passe',
        passwordPlaceholder: 'Créez un mot de passe fort',
        confirmPassword: 'Confirmer le Mot de Passe',
        confirmPasswordPlaceholder: 'Ressaisissez votre mot de passe',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        passwordStrength: {
          label: 'Force du Mot de Passe',
          weak: 'Faible',
          fair: 'Moyen',
          good: 'Bon',
          strong: 'Fort'
        }
      },
      businessDetails: {
        businessDetails: 'Détails de l\'Entreprise',
        provideBusinessInfo: 'Fournissez les informations de votre entreprise pour vérification',
        companyName: 'Nom de l\'Entreprise',
        companyNamePlaceholder: 'Entrez le nom de votre entreprise',
        businessCategory: 'Catégorie d\'Entreprise',
        selectCategory: 'Sélectionnez votre catégorie d\'entreprise',
        registrationNumber: 'Numéro d\'Enregistrement',
        registrationNumberPlaceholder: 'Entrez le numéro d\'enregistrement',
        businessAddress: 'Adresse de l\'Entreprise',
        businessAddressPlaceholder: 'Entrez l\'adresse complète de l\'entreprise',
        city: 'Ville',
        cityPlaceholder: 'Entrez la ville',
        postalCode: 'Code Postal',
        postalCodePlaceholder: 'Entrez le code postal',
        country: 'Pays',
        selectCountry: 'Sélectionnez votre pays',
        verificationDocuments: 'Documents de Vérification',
        businessLicense: 'Licence Commerciale',
        taxDocument: 'Document d\'Enregistrement Fiscal',
        uploadDocument: 'Cliquez pour télécharger le document',
        acceptedFormats: 'Formats acceptés : PDF, JPG, PNG (Max 5 Mo)'
      },
      verification: {
        reviewInformation: 'Vérifiez Vos Informations',
        verifyDetails: 'Veuillez vérifier tous les détails avant de soumettre',
        accountType: 'Type de Compte',
        buyer: 'Acheteur',
        seller: 'Vendeur',
        fullName: 'Nom Complet',
        email: 'Adresse E-mail',
        phone: 'Numéro de Téléphone',
        companyName: 'Nom de l\'Entreprise',
        location: 'Localisation',
        nextSteps: 'Prochaines Étapes',
        verificationMessage: 'Après l\'inscription, vous recevrez un e-mail de vérification. Veuillez vérifier votre adresse e-mail pour activer votre compte et accéder à toutes les fonctionnalités.',
        securityFeatures: 'Sécurité et Confidentialité',
        securityList: [
          'Vos données sont cryptées avec SSL standard',
          'Nous ne partageons jamais vos informations avec des tiers',
          'Authentification à deux facteurs disponible',
          'Audits de sécurité et contrôles de conformité réguliers'
        ]
      },
      trustSignals: {
        whyChooseUs: 'Pourquoi Choisir Bimark ?',
        secureEncryption: 'Cryptage Sécurisé',
        secureEncryptionDesc: 'Sécurité bancaire protège vos données',
        verifiedSellers: 'Vendeurs Vérifiés',
        verifiedSellersDesc: 'Tous les fournisseurs subissent une vérification stricte',
        dataProtection: 'Protection des Données',
        dataProtectionDesc: 'Traitement des données conforme au RGPD',
        globalReach: 'Portée Mondiale',
        globalReachDesc: 'Connectez-vous avec des acheteurs et vendeurs du monde entier',
        activeUsers: 'Utilisateurs Actifs',
        verifiedSuppliers: 'Fournisseurs Vérifiés',
        countries: 'Pays'
      },
      benefits: {
        buyerBenefitsTitle: 'Avantages Acheteur',
        sellerBenefitsTitle: 'Avantages Vendeur',
        buyer: {
          benefit1Title: 'Large Sélection de Produits',
          benefit1Desc: 'Accédez à des millions de produits dans toutes les catégories',
          benefit2Title: 'Prix Compétitifs',
          benefit2Desc: 'Obtenez des prix de gros et des remises en volume',
          benefit3Title: 'Expédition Fiable',
          benefit3Desc: 'Suivez les commandes avec logistique intégrée',
          benefit4Title: 'Communication Directe',
          benefit4Desc: 'Chattez directement avec les fournisseurs pour des commandes personnalisées'
        },
        seller: {
          benefit1Title: 'Accès au Marché Mondial',
          benefit1Desc: 'Atteignez des acheteurs sur les marchés francophones et anglophones',
          benefit2Title: 'Tableau de Bord Analytique',
          benefit2Desc: 'Suivez les ventes, les vues et le comportement des clients',
          benefit3Title: 'Transactions Sécurisées',
          benefit3Desc: 'Paiements protégés avec services d\'entiercement',
          benefit4Title: 'Collecte de Paiement Facile',
          benefit4Desc: 'Plusieurs méthodes de paiement et devises'
        }
      },
      buttons: {
        back: 'Retour',
        next: 'Étape Suivante',
        complete: 'Terminer l\'Inscription',
        submitting: 'Envoi en cours...'
      },
      errors: {
        firstNameRequired: 'Le prénom est requis',
        lastNameRequired: 'Le nom est requis',
        emailRequired: 'L\'adresse e-mail est requise',
        emailInvalid: 'Veuillez entrer une adresse e-mail valide',
        phoneRequired: 'Le numéro de téléphone est requis',
        passwordRequired: 'Le mot de passe est requis',
        passwordLength: 'Le mot de passe doit contenir au moins 8 caractères',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        companyNameRequired: 'Le nom de l\'entreprise est requis',
        categoryRequired: 'La catégorie d\'entreprise est requise',
        registrationRequired: 'Le numéro d\'enregistrement est requis',
        addressRequired: 'L\'adresse de l\'entreprise est requise',
        cityRequired: 'La ville est requise',
        postalCodeRequired: 'Le code postal est requis',
        countryRequired: 'Le pays est requis',
        licenseRequired: 'La licence commerciale est requise',
        taxDocRequired: 'Le document fiscal est requis',
        registrationFailed: 'L\'inscription a échoué. Veuillez réessayer.'
      },
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      signIn: 'Se Connecter'
    }
  };

  const currentLanguage = typeof window !== 'undefined' ? (localStorage.getItem('language') || 'fr')
    : 'en';

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <>
      <Header />
      <RegistrationInteractive translations={t} />
    </>
  );
}