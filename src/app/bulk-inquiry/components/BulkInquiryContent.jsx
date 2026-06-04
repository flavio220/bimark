'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function BulkInquiryContent() {
  const [form, setForm] = useState({
    productName: '',
    quantity: '',
    unit: 'unités',
    targetPrice: '',
    currency: 'FCFA',
    deliveryDate: '',
    destination: '',
    description: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    attachments: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-16 min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircleIcon" size={40} className="text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Demande envoyée avec succès !</h1>
          <p className="text-muted-foreground mb-2">Votre demande de devis en gros a été transmise aux fournisseurs correspondants.</p>
          <p className="text-muted-foreground mb-8">Vous recevrez des réponses sous <strong>24 à 48 heures</strong> à l'adresse <strong>{form.email}</strong>.</p>
          <div className="bg-card border border-border rounded-lg p-5 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-3">Récapitulatif de votre demande</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Produit</span><span className="font-medium text-foreground">{form.productName || 'Non spécifié'}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Quantité</span><span className="font-medium text-foreground">{form.quantity} {form.unit}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Prix cible</span><span className="font-medium text-foreground">{form.targetPrice} {form.currency}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Livraison souhaitée</span><span className="font-medium text-foreground">{form.deliveryDate || 'Flexible'}</span></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setStep(1); setForm(p => ({...p, productName:'',quantity:'',description:''})); }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth">
              Nouvelle demande
            </button>
            <Link href="/product-search-results" className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-smooth text-center">
              Retour aux produits
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/product-search-results" className="hover:text-primary transition-smooth">Produits</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">Demande en gros</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Demande de devis en gros</h1>
          <p className="text-muted-foreground">Remplissez ce formulaire pour recevoir des offres personnalisées de nos fournisseurs vérifiés.</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center mb-8">
          {[{ n: 1, label: 'Produit' }, { n: 2, label: 'Coordonnées' }].map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className={`flex items-center space-x-2 ${i > 0 ? 'flex-1 justify-end' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${
                  step >= s.n ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>{s.n}</div>
                <span className={`text-sm font-medium hidden sm:block ${step >= s.n ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
              </div>
              {i === 0 && <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Informations sur le produit</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom du produit / Description *</label>
                <input type="text" name="productName" required value={form.productName} onChange={handleChange}
                  placeholder="Ex: Chaises de bureau ergonomiques, ciment 50kg, etc."
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Quantité requise *</label>
                  <input type="number" name="quantity" required min="1" value={form.quantity} onChange={handleChange}
                    placeholder="500"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Unité</label>
                  <select name="unit" value={form.unit} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {['unités', 'kg', 'tonnes', 'litres', 'cartons', 'palettes', 'mètres', 'boîtes'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Prix cible (par unité)</label>
                  <input type="text" name="targetPrice" value={form.targetPrice} onChange={handleChange}
                    placeholder="Ex: 5 000"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Devise</label>
                  <select name="currency" value={form.currency} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                    {['FCFA', 'EUR', 'USD', 'GBP'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Date de livraison souhaitée</label>
                  <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Destination / Port</label>
                  <input type="text" name="destination" value={form.destination} onChange={handleChange}
                    placeholder="Ex: Cotonou, Bénin"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Exigences supplémentaires</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                  placeholder="Spécifications techniques, certifications requises, conditionnement, couleur, taille, etc."
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>

              <button type="button" onClick={() => setStep(2)}
                disabled={!form.productName || !form.quantity}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                <span>Continuer</span>
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Vos coordonnées</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nom complet *</label>
                  <input type="text" name="contactName" required value={form.contactName} onChange={handleChange}
                    placeholder="Votre nom et prénom"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Entreprise</label>
                  <input type="text" name="companyName" value={form.companyName} onChange={handleChange}
                    placeholder="Nom de votre entreprise"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Téléphone *</label>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                    placeholder="+229 01 00 00 00 00"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Récapitulatif</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Produit</span><span className="text-foreground font-medium">{form.productName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Quantité</span><span className="text-foreground font-medium">{form.quantity} {form.unit}</span></div>
                  {form.targetPrice && <div className="flex justify-between"><span className="text-muted-foreground">Prix cible</span><span className="text-foreground font-medium">{form.targetPrice} {form.currency}/unité</span></div>}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-smooth flex items-center justify-center space-x-2">
                  <Icon name="ArrowLeftIcon" size={16} />
                  <span>Retour</span>
                </button>
                <button type="submit"
                  disabled={!form.contactName || !form.email || !form.phone}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                  <Icon name="PaperAirplaneIcon" size={16} />
                  <span>Envoyer la demande</span>
                </button>
              </div>

              <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                <Icon name="ShieldCheckIcon" size={14} className="text-success flex-shrink-0 mt-0.5" />
                <span>Vos informations sont protégées et ne seront partagées qu'avec les fournisseurs concernés par votre demande.</span>
              </div>
            </div>
          )}
        </form>

        {/* Support */}
        <div className="mt-6 p-4 bg-card border border-border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">Besoin d'aide pour votre demande ?</p>
            <p className="text-xs text-muted-foreground">Notre équipe vous accompagne dans vos achats en gros</p>
          </div>
          <div className="flex gap-3 text-sm">
            <a href="tel:+2290150882676" className="flex items-center space-x-1 text-primary hover:underline">
              <Icon name="PhoneIcon" size={14} />
              <span>+229 01 50 88 26 76</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
