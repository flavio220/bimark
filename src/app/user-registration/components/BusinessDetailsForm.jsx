'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';

const T = {
  fr: {
    businessName: 'Nom de l\'entreprise / boutique', businessType: 'Type d\'entreprise',
    industry: 'Secteur d\'activité', employees: 'Taille de l\'entreprise',
    businessPhone: 'Téléphone professionnel', businessCountry: 'Pays de l\'entreprise',
    businessCity: 'Ville', businessAddress: 'Adresse professionnelle',
    website: 'Site web (optionnel)', rccm: 'N° RCCM / Registre de commerce (optionnel)',
    bNamePh: 'Ex: TechSupply Bénin', cityPh: 'Ex: Cotonou', addressPh: 'Quartier, rue...',
    websitePh: 'https://votresite.com', rccmPh: 'Ex: RCCM/BJ/COT/2024/B/12345',
    types: ['Entreprise individuelle', 'SARL', 'SA', 'SAS', 'Association', 'Autre'],
    industries: ['Commerce & Distribution', 'Industrie & Fabrication', 'Agriculture & Alimentaire', 'Électronique & High-tech',
      'Bâtiment & Construction', 'Textile & Mode', 'Cosmétiques & Beauté', 'Mobilier & Décoration',
      'Informatique & Logiciels', 'Transport & Logistique', 'Santé & Pharmaceutique', 'Éducation', 'Finance', 'Autre'],
    sizes: ['1–5 employés', '6–20 employés', '21–50 employés', '51–200 employés', '200+ employés'],
  },
  en: {
    businessName: 'Business / shop name', businessType: 'Business type',
    industry: 'Industry', employees: 'Company size',
    businessPhone: 'Business phone', businessCountry: 'Business country',
    businessCity: 'City', businessAddress: 'Business address',
    website: 'Website (optional)', rccm: 'Registration number (optional)',
    bNamePh: 'Ex: TechSupply Benin', cityPh: 'Ex: Cotonou', addressPh: 'Street, district...',
    websitePh: 'https://yoursite.com', rccmPh: 'Ex: REG-2024-12345',
    types: ['Sole proprietorship', 'LLC', 'Corporation', 'SAS', 'Association', 'Other'],
    industries: ['Trade & Distribution', 'Manufacturing & Industry', 'Agriculture & Food', 'Electronics & Tech',
      'Building & Construction', 'Textile & Fashion', 'Cosmetics & Beauty', 'Furniture & Decor',
      'IT & Software', 'Transport & Logistics', 'Health & Pharma', 'Education', 'Finance', 'Other'],
    sizes: ['1–5 employees', '6–20 employees', '21–50 employees', '51–200 employees', '200+ employees'],
  },
  es: {
    businessName: 'Nombre de empresa / tienda', businessType: 'Tipo de empresa',
    industry: 'Sector', employees: 'Tamaño de empresa',
    businessPhone: 'Teléfono profesional', businessCountry: 'País de la empresa',
    businessCity: 'Ciudad', businessAddress: 'Dirección profesional',
    website: 'Sitio web (opcional)', rccm: 'N° de registro (opcional)',
    bNamePh: 'Ej: TechSupply Benín', cityPh: 'Ej: Cotonou', addressPh: 'Calle, barrio...',
    websitePh: 'https://tusitio.com', rccmPh: 'Ej: REG-2024-12345',
    types: ['Empresa individual', 'SRL', 'SA', 'SAS', 'Asociación', 'Otro'],
    industries: ['Comercio y Distribución', 'Industria y Fabricación', 'Agricultura y Alimentos', 'Electrónica y Tecnología',
      'Construcción', 'Textil y Moda', 'Cosméticos y Belleza', 'Muebles y Decoración',
      'Informática y Software', 'Transporte y Logística', 'Salud y Farmacia', 'Educación', 'Finanzas', 'Otro'],
    sizes: ['1–5 empleados', '6–20 empleados', '21–50 empleados', '51–200 empleados', '200+ empleados'],
  },
  pt: {
    businessName: 'Nome da empresa / loja', businessType: 'Tipo de empresa',
    industry: 'Setor', employees: 'Tamanho da empresa',
    businessPhone: 'Telefone profissional', businessCountry: 'País da empresa',
    businessCity: 'Cidade', businessAddress: 'Endereço profissional',
    website: 'Site (opcional)', rccm: 'N° de registro (opcional)',
    bNamePh: 'Ex: TechSupply Benin', cityPh: 'Ex: Cotonou', addressPh: 'Rua, bairro...',
    websitePh: 'https://seusite.com', rccmPh: 'Ex: REG-2024-12345',
    types: ['Empresário individual', 'Ltda', 'SA', 'SAS', 'Associação', 'Outro'],
    industries: ['Comércio e Distribuição', 'Indústria e Fabricação', 'Agricultura e Alimentos', 'Eletrônicos e Tecnologia',
      'Construção Civil', 'Têxtil e Moda', 'Cosméticos e Beleza', 'Móveis e Decoração',
      'TI e Software', 'Transporte e Logística', 'Saúde e Farmácia', 'Educação', 'Finanças', 'Outro'],
    sizes: ['1–5 funcionários', '6–20 funcionários', '21–50 funcionários', '51–200 funcionários', '200+ funcionários'],
  },
  ar: {
    businessName: 'اسم الشركة / المتجر', businessType: 'نوع الشركة',
    industry: 'قطاع النشاط', employees: 'حجم الشركة',
    businessPhone: 'هاتف العمل', businessCountry: 'بلد الشركة',
    businessCity: 'المدينة', businessAddress: 'عنوان العمل',
    website: 'الموقع الإلكتروني (اختياري)', rccm: 'رقم التسجيل (اختياري)',
    bNamePh: 'مثال: تك سبلاي بنين', cityPh: 'مثال: كوتونو', addressPh: 'الشارع، الحي...',
    websitePh: 'https://موقعك.com', rccmPh: 'مثال: REG-2024-12345',
    types: ['مؤسسة فردية', 'ش.م.م', 'شركة مساهمة', 'SAS', 'جمعية', 'أخرى'],
    industries: ['التجارة والتوزيع', 'الصناعة والتصنيع', 'الزراعة والأغذية', 'الإلكترونيات والتقنية',
      'البناء والتشييد', 'الملابس والأزياء', 'مستحضرات التجميل', 'الأثاث والديكور',
      'تكنولوجيا المعلومات', 'النقل والخدمات اللوجستية', 'الصحة والأدوية', 'التعليم', 'المالية', 'أخرى'],
    sizes: ['1–5 موظفين', '6–20 موظفاً', '21–50 موظفاً', '51–200 موظف', '200+ موظف'],
  },
  zh: {
    businessName: '公司/店铺名称', businessType: '企业类型',
    industry: '行业', employees: '公司规模',
    businessPhone: '商务电话', businessCountry: '企业所在国',
    businessCity: '城市', businessAddress: '商务地址',
    website: '网站（选填）', rccm: '注册号（选填）',
    bNamePh: '例：TechSupply 贝宁', cityPh: '例：科托努', addressPh: '街道、区域...',
    websitePh: 'https://yoursite.com', rccmPh: '例：REG-2024-12345',
    types: ['个体经营', '有限责任公司', '股份有限公司', 'SAS', '协会', '其他'],
    industries: ['贸易与分销', '制造业', '农业与食品', '电子与科技',
      '建筑业', '纺织与时尚', '美容化妆品', '家具与装饰',
      'IT与软件', '运输与物流', '医疗与制药', '教育', '金融', '其他'],
    sizes: ['1–5人', '6–20人', '21–50人', '51–200人', '200人以上'],
  },
};

export default function BusinessDetailsForm({ formData = {}, onFormDataChange, errors = {}, language = 'fr' }) {
  const tl = T[language] || T.fr;
  const set = (k, v) => onFormDataChange?.({ ...formData, [k]: v });

  const inputCls = (err) =>
    `w-full px-3 py-2.5 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${err ? 'border-error' : 'border-border'}`;

  const Field = ({ label, required, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon name="ExclamationCircleIcon" size={12} />{error}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      <Field label={tl.businessName} required error={errors.businessName}>
        <input value={formData.businessName || ''} onChange={e => set('businessName', e.target.value)}
          placeholder={tl.bNamePh} className={inputCls(errors.businessName)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tl.businessType} required error={errors.businessType}>
          <select value={formData.businessType || ''} onChange={e => set('businessType', e.target.value)}
            className={inputCls(errors.businessType)}>
            <option value="">—</option>
            {tl.types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label={tl.industry} required error={errors.industry}>
          <select value={formData.industry || ''} onChange={e => set('industry', e.target.value)}
            className={inputCls(errors.industry)}>
            <option value="">—</option>
            {tl.industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tl.employees} error={errors.employees}>
          <select value={formData.employees || ''} onChange={e => set('employees', e.target.value)}
            className={inputCls(errors.employees)}>
            <option value="">—</option>
            {tl.sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <div>
          <PhoneInput label={tl.businessPhone} value={formData.businessPhone || ''} onChange={v => set('businessPhone', v)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <CountrySelect label={tl.businessCountry} required value={formData.businessCountry || ''}
            onChange={v => set('businessCountry', v)} />
          {errors.businessCountry && <p className="text-xs text-error mt-1">{errors.businessCountry}</p>}
        </div>
        <Field label={tl.businessCity} error={errors.businessCity}>
          <input value={formData.businessCity || ''} onChange={e => set('businessCity', e.target.value)}
            placeholder={tl.cityPh} className={inputCls(errors.businessCity)} />
        </Field>
      </div>

      <Field label={tl.businessAddress} error={errors.businessAddress}>
        <input value={formData.businessAddress || ''} onChange={e => set('businessAddress', e.target.value)}
          placeholder={tl.addressPh} className={inputCls(errors.businessAddress)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tl.website} error={errors.website}>
          <input type="url" value={formData.website || ''} onChange={e => set('website', e.target.value)}
            placeholder={tl.websitePh} className={inputCls(errors.website)} />
        </Field>
        <Field label={tl.rccm} error={errors.rccm}>
          <input value={formData.rccm || ''} onChange={e => set('rccm', e.target.value)}
            placeholder={tl.rccmPh} className={inputCls(errors.rccm)} />
        </Field>
      </div>
    </div>
  );
}

BusinessDetailsForm.propTypes = { formData: PropTypes.object, onFormDataChange: PropTypes.func, errors: PropTypes.object, language: PropTypes.string };
