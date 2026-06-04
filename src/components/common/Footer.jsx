'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
                <Icon name="ShoppingBagIcon" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary">Bimark</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              La marketplace B2B & B2C bilingue franco-anglophone. Connectez-vous avec des fournisseurs vérifiés du monde entier.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link></li>
              <li><Link href="/product-search-results" className="hover:text-primary transition-smooth">Produits</Link></li>
              <li><Link href="/user-registration" className="hover:text-primary transition-smooth">S'inscrire</Link></li>
              <li><Link href="/user-login" className="hover:text-primary transition-smooth">Connexion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Plateformes</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/buyer-dashboard" className="hover:text-primary transition-smooth">Espace Acheteur</Link></li>
              <li><Link href="/seller-dashboard" className="hover:text-primary transition-smooth">Espace Vendeur</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-smooth">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Assistance</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+2290150882676" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Icon name="PhoneIcon" size={14} />
                  <span>+229 01 50 88 26 76</span>
                </a>
              </li>
              <li>
                <a href="tel:+2290140903261" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Icon name="PhoneIcon" size={14} />
                  <span>+229 01 40 90 32 61</span>
                </a>
              </li>
              <li>
                <a href="mailto:flavioadantchede@gmail.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Icon name="EnvelopeIcon" size={14} />
                  <span>flavioadantchede@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Bimark. Tous droits réservés.
          </p>
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-smooth">Politique de confidentialité</Link>
            <Link href="/about" className="hover:text-primary transition-smooth">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
