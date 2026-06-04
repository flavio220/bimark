'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactContent() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-3">Contactez-nous / Contact Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions. Nous vous répondrons dans les 24 heures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="PhoneIcon" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Téléphone</h3>
              </div>
              <div className="space-y-2 pl-1">
                <a href="tel:+2290150882676" className="block text-sm text-primary hover:underline">+229 01 50 88 26 76</a>
                <a href="tel:+2290140903261" className="block text-sm text-primary hover:underline">+229 01 40 90 32 61</a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="EnvelopeIcon" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Email</h3>
              </div>
              <a href="mailto:flavioadantchede@gmail.com" className="text-sm text-primary hover:underline break-all">
                flavioadantchede@gmail.com
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="ClockIcon" size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Horaires</h3>
              </div>
              <p className="text-sm text-muted-foreground">Lun – Ven : 8h00 – 18h00</p>
              <p className="text-sm text-muted-foreground">Sam : 9h00 – 14h00</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-card border border-border rounded-lg p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircleIcon" size={32} className="text-success" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Message envoyé !</h2>
                <p className="text-muted-foreground mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-1">Envoyer un message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nom complet *</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm(p => ({...p, name: e.target.value}))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm(p => ({...p, email: e.target.value}))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Sujet *</label>
                  <input
                    type="text" required
                    value={form.subject}
                    onChange={e => setForm(p => ({...p, subject: e.target.value}))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Objet de votre message"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:opacity-90 transition-smooth flex items-center justify-center space-x-2"
                >
                  <Icon name="PaperAirplaneIcon" size={18} />
                  <span>Envoyer le message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
