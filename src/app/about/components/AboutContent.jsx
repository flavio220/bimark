'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const values = [
  { icon: "ShieldCheckIcon", title: "Confiance & Sécurité", desc: "Tous nos fournisseurs sont vérifiés et certifiés. Transactions sécurisées garanties." },
  { icon: "LanguageIcon", title: "Bilingue", desc: "Plateforme entièrement disponible en français et en anglais pour une portée internationale." },
  { icon: "GlobeAltIcon", title: "Connectivité globale", desc: "Reliez acheteurs et vendeurs à travers le monde avec des outils B2B et B2C performants." },
  { icon: "CurrencyDollarIcon", title: "Prix compétitifs", desc: "Accédez aux meilleurs prix grâce aux achats en gros et aux offres directes fournisseurs." },
];

const stats = [
  { label: "Pays couverts", value: "15+" },
  { label: "Fournisseurs vérifiés", value: "500+" },
  { label: "Catégories de produits", value: "50+" },
  { label: "Transactions sécurisées", value: "100%" },
];

export default function AboutContent() {
  return (
    <main className="pt-16 min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon name="ShoppingBagIcon" size={30} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold">Bimark</h1>
          </div>
          <p className="text-xl text-white/90 mb-4">La marketplace B2B & B2C bilingue franco-anglophone</p>
          <p className="text-white/70 max-w-2xl mx-auto">
            Bimark connecte acheteurs et vendeurs à travers le monde francophone et anglophone, 
            offrant une plateforme sécurisée pour le commerce international.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 flex space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={v.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-4 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Notre mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Bimark a pour mission de simplifier le commerce international en offrant une plateforme 
            intuitive, sécurisée et bilingue qui rapproche les acheteurs et vendeurs des marchés 
            francophones et anglophones. Nous croyons que la technologie peut éliminer les barrières 
            linguistiques et géographiques pour créer des opportunités d'affaires sans frontières.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Rejoignez Bimark aujourd'hui</h2>
          <p className="text-muted-foreground mb-6">Créez votre compte gratuitement et commencez à acheter ou vendre sur notre plateforme.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/user-registration" className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:opacity-90 transition-smooth">
              Créer un compte
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-border text-foreground rounded-md font-semibold hover:bg-muted transition-smooth">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
