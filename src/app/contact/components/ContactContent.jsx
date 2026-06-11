'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useT } from '@/i18n/useTranslation';

export default function ContactContent() {
  const { t } = useT();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={40} className="text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t('contact.sent')}</h1>
        <p className="text-muted-foreground mb-8">{t('contact.sentDesc')}</p>
        <button onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth">
          {t('contact.newMessage')}
        </button>
      </div>
    </main>
  );

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('contact.title')}</h1>
          <p className="text-muted-foreground">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: 'PhoneIcon', label: t('common.phone'), content: [{ href: 'tel:+2290150882676', text: '+229 01 50 88 26 76' }, { href: 'tel:+2290140903261', text: '+229 01 40 90 32 61' }] },
              { icon: 'EnvelopeIcon', label: t('common.email'), content: [{ href: 'mailto:flavioadantchede@gmail.com', text: 'flavioadantchede@gmail.com' }] },
              { icon: 'ClockIcon', label: t('contact.hours'), content: [{ text: t('contact.hoursVal') }] },
            ].map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={card.icon} size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{card.label}</h3>
                </div>
                <div className="space-y-1 pl-1">
                  {card.content.map((c, j) => (
                    c.href
                      ? <a key={j} href={c.href} className="block text-sm text-primary hover:underline">{c.text}</a>
                      : <p key={j} className="text-sm text-muted-foreground">{c.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-card border border-border rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">{t('contact.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t('contact.fullName')} *</label>
                  <input type="text" required value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))}
                    placeholder={t('contact.fullName')}
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t('common.email')} *</label>
                  <input type="email" required value={form.email} onChange={e => setForm(p => ({...p,email:e.target.value}))}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t('contact.subject')} *</label>
                <input type="text" required value={form.subject} onChange={e => setForm(p => ({...p,subject:e.target.value}))}
                  placeholder={t('contact.subject')}
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t('contact.yourMessage')} *</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))}
                  placeholder={t('contact.yourMessage')}
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <button type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center space-x-2">
                <Icon name="PaperAirplaneIcon" size={18} />
                <span>{t('contact.send')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
