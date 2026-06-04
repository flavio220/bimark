'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ProfileContent() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: 'Bénin',
    city: '',
    address: '',
    bio: '',
    language: 'fr',
  });

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(auth);
    setUserRole(role);
    if (!auth) router.push('/user-login');
  }, [router]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = e => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const dashboardHref = userRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
  const settingsHref = userRole === 'buyer' ? '/buyer-dashboard/settings' : '/seller-dashboard/settings';

  const tabs = [
    { id: 'personal', label: 'Informations personnelles', icon: 'UserCircleIcon' },
    { id: 'company', label: 'Entreprise', icon: 'BuildingOfficeIcon' },
    { id: 'security', label: 'Sécurité', icon: 'LockClosedIcon' },
  ];

  return (
    <main className="pt-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/homepage" className="hover:text-primary transition-smooth">Accueil</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href={dashboardHref} className="hover:text-primary transition-smooth capitalize">{userRole || 'Dashboard'}</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground">Mon profil</span>
        </nav>

        {/* Profile header card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {form.firstName ? form.firstName.charAt(0).toUpperCase() : (userRole ? userRole.charAt(0).toUpperCase() : 'U')}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-subtle">
              <Icon name="PencilIcon" size={13} className="text-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              {form.firstName && form.lastName ? `${form.firstName} ${form.lastName}` : 'Votre nom'}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-muted-foreground capitalize">{userRole || 'Utilisateur'}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{form.country}</span>
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-xs text-muted-foreground">Compte actif</span>
            </div>
          </div>
          <Link href={settingsHref}
            className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth">
            <Icon name="Cog6ToothIcon" size={16} />
            <span>Paramètres</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <nav className="bg-card border border-border rounded-xl overflow-hidden">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 text-sm font-medium transition-smooth border-l-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-foreground hover:bg-muted'
                  }`}>
                  <Icon name={tab.icon} size={18} />
                  <span className="hidden lg:block">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form content */}
          <div className="lg:col-span-3">
            {saved && (
              <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
                <Icon name="CheckCircleIcon" size={18} />
                <span>Profil mis à jour avec succès !</span>
              </div>
            )}

            <form onSubmit={handleSave}>
              {activeTab === 'personal' && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                  <h2 className="text-base font-semibold text-foreground">Informations personnelles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Prénom</label>
                      <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
                        placeholder="Votre prénom"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Nom de famille</label>
                      <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
                        placeholder="Votre nom"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="votre@email.com"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Téléphone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+229 01 00 00 00 00"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Pays</label>
                      <select name="country" value={form.country} onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        {['Bénin','Togo','Sénégal','Côte d\'Ivoire','Ghana','Nigeria','Mali','Burkina Faso','Niger','Cameroun','France','Belgique','Canada'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Ville</label>
                      <input type="text" name="city" value={form.city} onChange={handleChange}
                        placeholder="Votre ville"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Adresse</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange}
                      placeholder="Votre adresse complète"
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Bio / Présentation</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={3}
                      placeholder="Décrivez brièvement votre activité..."
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Langue préférée</label>
                    <select name="language" value={form.language} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                  <h2 className="text-base font-semibold text-foreground">Informations entreprise</h2>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nom de l'entreprise</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Secteur d'activité</label>
                      <select className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        {['Commerce','Industrie','Agriculture','Technologie','Construction','Transport','Santé','Éducation','Autre'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Taille de l'entreprise</label>
                      <select className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        {['1-10 employés','11-50 employés','51-200 employés','201-500 employés','500+ employés'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Numéro RCCM / Registre</label>
                    <input type="text" placeholder="Ex: RCCM/BJ/COT/2024/B/12345"
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Site web</label>
                    <input type="url" placeholder="https://www.votreentreprise.com"
                      className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>

                  {/* Verification CTA */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="ShieldCheckIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Vérification entreprise</h4>
                        <p className="text-xs text-muted-foreground mb-2">Faites vérifier votre entreprise pour obtenir le badge de confiance Bimark et augmenter votre crédibilité.</p>
                        <button className="text-xs font-medium text-primary hover:underline">Démarrer la vérification →</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                  <h2 className="text-base font-semibold text-foreground">Sécurité du compte</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Mot de passe actuel</label>
                      <input type="password" placeholder="••••••••"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Nouveau mot de passe</label>
                      <input type="password" placeholder="••••••••"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Confirmer le nouveau mot de passe</label>
                      <input type="password" placeholder="••••••••"
                        className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>
                  </div>

                  <div className="border-t border-border pt-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Authentification à deux facteurs</h3>
                    <div className="flex items-start justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">2FA par SMS</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Recevez un code par SMS à chaque connexion</p>
                      </div>
                      <div className="w-10 h-6 bg-border rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full transition-smooth" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Sessions actives</h3>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="ComputerDesktopIcon" size={18} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Session actuelle</p>
                          <p className="text-xs text-muted-foreground">Navigateur Web · Maintenant</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button type="submit"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
                  <Icon name="CheckIcon" size={18} />
                  <span>Sauvegarder les modifications</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
