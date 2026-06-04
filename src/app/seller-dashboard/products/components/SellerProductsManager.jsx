'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const CATEGORIES = ['Électronique','Alimentation','Textile & Mode','Bâtiment & Construction','Agriculture','Cosmétiques','Mobilier','Automobile','Informatique','Santé & Beauté','Sport & Loisirs','Jouets & Enfants','Autre'];
const UNITS = ['unité','kg','tonne','litre','m²','mètre','carton','sac','palette','boîte'];

const emptyProduct = {
  id: null, name: '', nameFr: '', category: '', price: '', priceWholesale: '',
  moq: '1', unit: 'unité', stock: '', description: '', descriptionFr: '',
  available: true, images: [], tags: '', weight: '', origin: ''
};

export default function SellerProductsManager() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('list'); // list | form | detail
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [filterAvail, setFilterAvail] = useState('all');
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem('bimark_seller_products');
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  const persist = (list) => {
    setProducts(list);
    localStorage.setItem('bimark_seller_products', JSON.stringify(list));
  };

  const openNew = () => {
    setForm({ ...emptyProduct, id: Date.now() });
    setErrors({});
    setEditing(null);
    setView('form');
  };

  const openEdit = (p) => {
    setForm({ ...p });
    setEditing(p.id);
    setErrors({});
    setView('form');
  };

  const openDetail = (p) => {
    setForm({ ...p });
    setEditing(p.id);
    setView('detail');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!form.category) e.category = 'Catégorie requise';
    if (!form.price || isNaN(form.price)) e.price = 'Prix valide requis';
    if (!form.stock || isNaN(form.stock)) e.stock = 'Stock valide requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const updated = editing
      ? products.map(p => p.id === editing ? { ...form } : p)
      : [...products, { ...form }];
    persist(updated);
    setSaved(true);
    setTimeout(() => { setSaved(false); setView('list'); }, 1200);
  };

  const handleDelete = (id) => {
    persist(products.filter(p => p.id !== id));
    setDeleteConfirm(null);
    setView('list');
  };

  const toggleAvailability = (id) => {
    persist(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm(prev => ({
          ...prev,
          images: [...(prev.images || []), { url: ev.target.result, name: file.name }].slice(0, 8)
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) => setForm(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchAvail = filterAvail === 'all' || (filterAvail === 'active' ? p.available : !p.available);
    return matchSearch && matchAvail;
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ── LIST VIEW ──
  if (view === 'list') return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mes Produits</h1>
            <p className="text-sm text-muted-foreground">{products.length} produit(s) dans votre catalogue</p>
          </div>
          <button onClick={openNew}
            className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
            <Icon name="PlusIcon" size={18} />
            <span>Ajouter un produit</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={filterAvail} onChange={e => setFilterAvail(e.target.value)}
            className="px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
            <option value="all">Tous les statuts</option>
            <option value="active">Disponibles</option>
            <option value="inactive">Non disponibles</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-14 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CubeIcon" size={30} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {products.length === 0 ? 'Aucun produit listé' : 'Aucun résultat'}
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              {products.length === 0 ? 'Ajoutez votre premier produit pour commencer à vendre.' : 'Modifiez votre recherche.'}
            </p>
            {products.length === 0 && (
              <button onClick={openNew} className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth">
                <Icon name="PlusIcon" size={16} /><span>Ajouter un produit</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-smooth">
                {/* Image */}
                <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {p.images?.[0]
                    ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                    : <Icon name="PhotoIcon" size={22} className="text-muted-foreground" />}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                    <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${p.available ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                      {p.available ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{p.category} · Stock: {p.stock} {p.unit}</p>
                  <p className="text-sm font-bold text-primary">{parseInt(p.price).toLocaleString()} FCFA/{p.unit}</p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleAvailability(p.id)}
                    title={p.available ? 'Marquer indisponible' : 'Marquer disponible'}
                    className={`p-2 rounded-lg border transition-smooth ${p.available ? 'border-success/30 text-success hover:bg-success/10' : 'border-error/30 text-error hover:bg-error/10'}`}>
                    <Icon name={p.available ? 'EyeIcon' : 'EyeSlashIcon'} size={16} />
                  </button>
                  <button onClick={() => openEdit(p)} title="Modifier"
                    className="p-2 rounded-lg border border-border text-foreground hover:bg-muted hover:text-primary transition-smooth">
                    <Icon name="PencilIcon" size={16} />
                  </button>
                  <button onClick={() => openDetail(p)} title="Voir"
                    className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-smooth">
                    <Icon name="EyeIcon" size={16} />
                  </button>
                  <button onClick={() => setDeleteConfirm(p.id)} title="Supprimer"
                    className="p-2 rounded-lg border border-error/20 text-error hover:bg-error/10 transition-smooth">
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full animate-slide-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="TrashIcon" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Supprimer le produit</h3>
                <p className="text-sm text-muted-foreground">Cette action est irréversible.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-smooth">
                Annuler
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-error text-white rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );

  // ── DETAIL VIEW ──
  if (view === 'detail') return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button onClick={() => setView('list')} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-smooth">
          <Icon name="ArrowLeftIcon" size={16} /><span>Retour</span>
        </button>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Images */}
          <div className="flex gap-2 p-4 bg-muted/30 overflow-x-auto">
            {form.images?.length > 0
              ? form.images.map((img, i) => (
                <img key={i} src={img.url} alt={img.name} className="h-40 w-40 object-cover rounded-lg flex-shrink-0 border border-border" />
              ))
              : <div className="h-40 w-full flex items-center justify-center text-muted-foreground"><Icon name="PhotoIcon" size={40} /></div>
            }
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
                {form.nameFr && <p className="text-sm text-muted-foreground italic">{form.nameFr}</p>}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${form.available ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                {form.available ? 'Disponible' : 'Indisponible'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {[
                { l: 'Catégorie', v: form.category },
                { l: 'Prix détail', v: `${parseInt(form.price || 0).toLocaleString()} FCFA` },
                { l: 'Prix gros', v: form.priceWholesale ? `${parseInt(form.priceWholesale).toLocaleString()} FCFA` : '—' },
                { l: 'Stock', v: `${form.stock} ${form.unit}` },
                { l: 'MOQ', v: `${form.moq} ${form.unit}` },
                { l: 'Origine', v: form.origin || '—' },
              ].map((r, i) => (
                <div key={i} className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{r.l}</p>
                  <p className="text-sm font-semibold text-foreground">{r.v}</p>
                </div>
              ))}
            </div>
            {form.description && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Description</p>
                <p className="text-sm text-foreground">{form.description}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => openEdit(products.find(p => p.id === editing))}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth">
                <Icon name="PencilIcon" size={16} /><span>Modifier</span>
              </button>
              <button onClick={() => toggleAvailability(editing)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 border rounded-lg font-medium transition-smooth ${form.available ? 'border-error/30 text-error hover:bg-error/10' : 'border-success/30 text-success hover:bg-success/10'}`}>
                <Icon name={form.available ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                <span>{form.available ? 'Marquer indisponible' : 'Marquer disponible'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  // ── FORM VIEW (add/edit) ──
  return (
    <main className="lg:ml-64 pt-16 min-h-screen bg-background pb-20 lg:pb-6">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button onClick={() => setView('list')} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-smooth">
          <Icon name="ArrowLeftIcon" size={16} /><span>Retour à mes produits</span>
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={editing ? 'PencilIcon' : 'PlusCircleIcon'} size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{editing ? 'Modifier le produit' : 'Ajouter un produit'}</h1>
            <p className="text-sm text-muted-foreground">Remplissez les informations pour {editing ? 'mettre à jour' : 'créer'} votre produit</p>
          </div>
        </div>

        {saved && (
          <div className="mb-4 flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm animate-slide-in">
            <Icon name="CheckCircleIcon" size={16} /><span>Produit sauvegardé avec succès !</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Images */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="PhotoIcon" size={16} className="text-primary" />
              <span>Photos du produit <span className="text-muted-foreground font-normal">(max 8)</span></span>
            </h2>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.images?.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                    <Icon name="XMarkIcon" size={10} className="text-white" />
                  </button>
                  {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-primary text-white py-0.5">Principale</span>}
                </div>
              ))}
              {(!form.images || form.images.length < 8) && (
                <button onClick={() => fileRef.current?.click()}
                  className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-smooth">
                  <Icon name="PlusIcon" size={20} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground mt-1">Ajouter</span>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            <p className="text-xs text-muted-foreground">JPG, PNG, WebP · Max 5MB par image · La 1ère photo sera l'image principale</p>
          </div>

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Icon name="InformationCircleIcon" size={16} className="text-primary" />
              <span>Informations générales</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom du produit (FR) <span className="text-error">*</span></label>
                <input value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Ex: Chaise de bureau ergonomique"
                  className={`w-full px-3 py-2.5 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.name ? 'border-error' : 'border-border'}`} />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nom en anglais <span className="text-muted-foreground font-normal">(optionnel)</span></label>
                <input value={form.nameFr} onChange={e => set('nameFr', e.target.value)}
                  placeholder="Ex: Ergonomic office chair"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Catégorie <span className="text-error">*</span></label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.category ? 'border-error' : 'border-border'}`}>
                  <option value="">Sélectionner...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Pays d'origine</label>
                <input value={form.origin} onChange={e => set('origin', e.target.value)}
                  placeholder="Ex: Bénin, Chine, France..."
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description (FR) <span className="text-error">*</span></label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4}
                placeholder="Décrivez votre produit en détail : caractéristiques, utilisation, avantages..."
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description en anglais <span className="text-muted-foreground font-normal">(optionnel)</span></label>
              <textarea value={form.descriptionFr} onChange={e => set('descriptionFr', e.target.value)} rows={3}
                placeholder="Describe your product in English..."
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Mots-clés / Tags</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)}
                placeholder="bureau, ergonomique, noir, tissu... (séparés par des virgules)"
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Icon name="CurrencyDollarIcon" size={16} className="text-primary" />
              <span>Prix & Stock</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-1">Unité <span className="text-error">*</span></label>
                <select value={form.unit} onChange={e => set('unit', e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none">
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Prix détail (FCFA) <span className="text-error">*</span></label>
                <input type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)}
                  placeholder="15000"
                  className={`w-full px-3 py-2.5 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.price ? 'border-error' : 'border-border'}`} />
                {errors.price && <p className="text-xs text-error mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Prix gros (FCFA)</label>
                <input type="number" min="0" value={form.priceWholesale} onChange={e => set('priceWholesale', e.target.value)}
                  placeholder="12000"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Stock disponible <span className="text-error">*</span></label>
                <input type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)}
                  placeholder="100"
                  className={`w-full px-3 py-2.5 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.stock ? 'border-error' : 'border-border'}`} />
                {errors.stock && <p className="text-xs text-error mt-1">{errors.stock}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Quantité minimale (MOQ)</label>
                <input type="number" min="1" value={form.moq} onChange={e => set('moq', e.target.value)}
                  placeholder="1"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Poids / Dimensions</label>
                <input value={form.weight} onChange={e => set('weight', e.target.value)}
                  placeholder="Ex: 2.5 kg / 60x60x90 cm"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Disponibilité</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {form.available ? 'Le produit est visible et commendable' : 'Le produit est masqué aux acheteurs'}
                </p>
              </div>
              <button type="button" onClick={() => set('available', !form.available)}
                className={`relative w-12 h-6 rounded-full transition-smooth focus:outline-none ${form.available ? 'bg-success' : 'bg-border'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.available ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button type="button" onClick={() => setView('list')}
              className="flex-1 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-smooth">
              Annuler
            </button>
            <button type="button" onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
              <Icon name="CheckIcon" size={18} />
              <span>{editing ? 'Enregistrer les modifications' : 'Publier le produit'}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
