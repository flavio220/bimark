'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-md">
            <Icon name="ShoppingBagIcon" size={26} className="text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-primary">Bimark</span>
        </div>

        <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page introuvable</h1>
        <p className="text-muted-foreground mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
          <br />
          <span className="text-sm">The page you're looking for doesn't exist or has been moved.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/homepage"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-smooth"
          >
            <Icon name="HomeIcon" size={18} />
            <span>Retour à l'accueil</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-border text-foreground rounded-md font-medium hover:bg-muted transition-smooth"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={18} />
            <span>Nous contacter</span>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Assistance disponible :</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <a href="tel:+2290150882676" className="flex items-center justify-center space-x-1 text-primary hover:underline">
              <Icon name="PhoneIcon" size={14} />
              <span>+229 01 50 88 26 76</span>
            </a>
            <a href="tel:+2290140903261" className="flex items-center justify-center space-x-1 text-primary hover:underline">
              <Icon name="PhoneIcon" size={14} />
              <span>+229 01 40 90 32 61</span>
            </a>
            <a href="mailto:flavioadantchede@gmail.com" className="flex items-center justify-center space-x-1 text-primary hover:underline">
              <Icon name="EnvelopeIcon" size={14} />
              <span>Email support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
