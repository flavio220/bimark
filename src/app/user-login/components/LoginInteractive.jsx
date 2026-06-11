'use client';

import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import TrustIndicators from './TrustIndicators';
import RegistrationPrompt from './RegistrationPrompt';

export default function LoginInteractive() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'fr';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your Bimark account',
      form: {
        email: 'Email Address',
        emailPlaceholder: 'Enter your email',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        signIn: 'Sign In',
        signingIn: 'Signing in...',
        orContinueWith: 'Or continue with'
      },
      errors: {
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordLength: 'Password must be at least 6 characters',
        invalidCredentials: 'Invalid email or password. Please try again.',
        credentialsHint: 'Test Credentials:\nBuyer: buyer@bimark.com / Buyer@123\nSeller: seller@bimark.com / Seller@123',
        tooManyAttempts: 'Multiple failed login attempts detected. Please wait a moment before trying again.',
        socialLoginUnavailable: 'Social login is currently unavailable. Please use email/password.'
      },
      indicators: {
        secureTitle: 'Secure Authentication',
        secureDesc: 'SSL encrypted connection with multi-factor authentication support',
        globalTitle: 'Global Marketplace',
        globalDesc: 'Connect with buyers and sellers across French and English markets',
        trustedTitle: 'Trusted Platform',
        trustedDesc: 'Join thousands of verified businesses trading internationally'
      },
      prompt: {
        newUser: "Don\'t have an account?",
        createAccount: 'Create Account',
        backToHome: 'Back to Home',
        needHelp: 'Need Help?'
      }
    },
    fr: {
      title: 'Bon Retour',
      subtitle: 'Connectez-vous à votre compte Bimark',
      form: {
        email: 'Adresse Email',
        emailPlaceholder: 'Entrez votre email',
        password: 'Mot de Passe',
        passwordPlaceholder: 'Entrez votre mot de passe',
        rememberMe: 'Se souvenir de moi',
        forgotPassword: 'Mot de passe oublié?',
        signIn: 'Se Connecter',
        signingIn: 'Connexion en cours...',
        orContinueWith: 'Ou continuer avec'
      },
      errors: {
        emailRequired: "L\'email est requis",
        emailInvalid: 'Veuillez entrer une adresse email valide',
        passwordRequired: 'Le mot de passe est requis',
        passwordLength: 'Le mot de passe doit contenir au moins 6 caractères',
        invalidCredentials: 'Email ou mot de passe invalide. Veuillez réessayer.',
        credentialsHint: "Identifiants de Test:\nAcheteur: buyer@bimark.com / Buyer@123\nVendeur: seller@bimark.com / Seller@123",
        tooManyAttempts: 'Plusieurs tentatives de connexion échouées détectées. Veuillez patienter un moment avant de réessayer.',
        socialLoginUnavailable: 'La connexion sociale est actuellement indisponible. Veuillez utiliser email/mot de passe.'
      },
      indicators: {
        secureTitle: 'Authentification Sécurisée',
        secureDesc: 'Connexion cryptée SSL avec support d\'authentification multi-facteurs',
        globalTitle: 'Marché Mondial',
        globalDesc: 'Connectez-vous avec des acheteurs et vendeurs sur les marchés français et anglais',
        trustedTitle: 'Plateforme de Confiance',
        trustedDesc: 'Rejoignez des milliers d\'entreprises vérifiées qui commercent internationalement'
      },
      prompt: {
        newUser: "Vous n\'avez pas de compte?",
        createAccount: 'Créer un Compte',
        backToHome: "Retour à l\'Accueil",
        needHelp: "Besoin d\'Aide?"
      }
    }
  };

  const t = translations?.[currentLanguage];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t?.title}</h1>
            <p className="text-muted-foreground">{t?.subtitle}</p>
          </div>

          {/* Login Form */}
          <div className="bg-card border border-border rounded-lg shadow-card p-8">
            <LoginForm translations={t} />
          </div>

          {/* Registration Prompt */}
          <RegistrationPrompt translations={t} />
        </div>

        {/* Trust Indicators */}
        <TrustIndicators translations={t} />
      </div>
    </div>
  );
}