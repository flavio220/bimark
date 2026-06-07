'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import PhoneInput from '@/components/ui/PhoneInput';
import CountrySelect from '@/components/ui/CountrySelect';

const T = {
  fr: {
    firstName: 'Prénom', lastName: 'Nom de famille', email: 'Adresse email',
    password: 'Mot de passe', confirmPassword: 'Confirmer le mot de passe',
    phone: 'Numéro de téléphone', country: 'Pays de résidence',
    firstNamePh: 'Votre prénom', lastNamePh: 'Votre nom',
    emailPh: 'votre@email.com', passwordPh: 'Minimum 8 caractères',
    confirmPh: 'Répétez le mot de passe',
    req: 'obligatoire',
    strength: ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'],
    show: 'Afficher', hide: 'Masquer',
  },
  en: {
    firstName: 'First name', lastName: 'Last name', email: 'Email address',
    password: 'Password', confirmPassword: 'Confirm password',
    phone: 'Phone number', country: 'Country of residence',
    firstNamePh: 'Your first name', lastNamePh: 'Your last name',
    emailPh: 'your@email.com', passwordPh: 'Minimum 8 characters',
    confirmPh: 'Repeat your password',
    req: 'required',
    strength: ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'],
    show: 'Show', hide: 'Hide',
  },
  es: {
    firstName: 'Nombre', lastName: 'Apellido', email: 'Correo electrónico',
    password: 'Contraseña', confirmPassword: 'Confirmar contraseña',
    phone: 'Número de teléfono', country: 'País de residencia',
    firstNamePh: 'Tu nombre', lastNamePh: 'Tu apellido',
    emailPh: 'tu@email.com', passwordPh: 'Mínimo 8 caracteres',
    confirmPh: 'Repite tu contraseña',
    req: 'obligatorio',
    strength: ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'],
    show: 'Mostrar', hide: 'Ocultar',
  },
  pt: {
    firstName: 'Nome', lastName: 'Sobrenome', email: 'Endereço de email',
    password: 'Senha', confirmPassword: 'Confirmar senha',
    phone: 'Número de telefone', country: 'País de residência',
    firstNamePh: 'Seu nome', lastNamePh: 'Seu sobrenome',
    emailPh: 'seu@email.com', passwordPh: 'Mínimo 8 caracteres',
    confirmPh: 'Repita sua senha',
    req: 'obrigatório',
    strength: ['Muito fraca', 'Fraca', 'Razoável', 'Forte', 'Muito forte'],
    show: 'Mostrar', hide: 'Ocultar',
  },
  ar: {
    firstName: 'الاسم الأول', lastName: 'اسم العائلة', email: 'البريد الإلكتروني',
    password: 'كلمة المرور', confirmPassword: 'تأكيد كلمة المرور',
    phone: 'رقم الهاتف', country: 'بلد الإقامة',
    firstNamePh: 'اسمك الأول', lastNamePh: 'اسم عائلتك',
    emailPh: 'بريدك@الإلكتروني.com', passwordPh: '8 أحرف على الأقل',
    confirmPh: 'أعد كتابة كلمة المرور',
    req: 'مطلوب',
    strength: ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'قوية', 'قوية جداً'],
    show: 'إظهار', hide: 'إخفاء',
  },
  zh: {
    firstName: '名', lastName: '姓', email: '电子邮箱',
    password: '密码', confirmPassword: '确认密码',
    phone: '电话号码', country: '居住国家',
    firstNamePh: '您的名字', lastNamePh: '您的姓氏',
    emailPh: 'your@email.com', passwordPh: '至少8个字符',
    confirmPh: '重复输入密码',
    req: '必填',
    strength: ['非常弱', '弱', '一般', '强', '非常强'],
    show: '显示', hide: '隐藏',
  },
};

function pwStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

export default function BasicInfoForm({ formData = {}, onFormDataChange, errors = {}, language = 'fr' }) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const tl = T[language] || T.fr;
  const strength = pwStrength(formData.password || '');
  const strengthColors = ['bg-error', 'bg-error', 'bg-warning', 'bg-success', 'bg-success'];
  const set = (k, v) => onFormDataChange?.({ ...formData, [k]: v });

  const inputCls = (err) =>
    `w-full px-3 py-2.5 border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth ${err ? 'border-error' : 'border-border'}`;

  const Field = ({ label, error, children }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label} <span className="text-error">*</span></label>
      {children}
      {error && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon name="ExclamationCircleIcon" size={12} />{error}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tl.firstName} error={errors.firstName}>
          <input value={formData.firstName || ''} onChange={e => set('firstName', e.target.value)}
            placeholder={tl.firstNamePh} className={inputCls(errors.firstName)} />
        </Field>
        <Field label={tl.lastName} error={errors.lastName}>
          <input value={formData.lastName || ''} onChange={e => set('lastName', e.target.value)}
            placeholder={tl.lastNamePh} className={inputCls(errors.lastName)} />
        </Field>
      </div>

      {/* Email */}
      <Field label={tl.email} error={errors.email}>
        <input type="email" value={formData.email || ''} onChange={e => set('email', e.target.value)}
          placeholder={tl.emailPh} className={inputCls(errors.email)} />
      </Field>

      {/* Phone */}
      <div>
        <PhoneInput
          label={tl.phone}
          required
          value={formData.phone || ''}
          onChange={v => set('phone', v)}
        />
        {errors.phone && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon name="ExclamationCircleIcon" size={12} />{errors.phone}</p>}
      </div>

      {/* Country */}
      <div>
        <CountrySelect
          label={tl.country}
          required
          value={formData.country || ''}
          onChange={v => set('country', v)}
        />
        {errors.country && <p className="text-xs text-error mt-1 flex items-center gap-1"><Icon name="ExclamationCircleIcon" size={12} />{errors.country}</p>}
      </div>

      {/* Password */}
      <Field label={tl.password} error={errors.password}>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            value={formData.password || ''}
            onChange={e => set('password', e.target.value)}
            placeholder={tl.passwordPh}
            className={`${inputCls(errors.password)} pr-20`}
          />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline font-medium">
            {showPw ? tl.hide : tl.show}
          </button>
        </div>
        {formData.password && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[0,1,2,3,4].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-muted'}`} />
              ))}
            </div>
            <p className={`text-xs font-medium ${strength >= 3 ? 'text-success' : strength >= 2 ? 'text-warning' : 'text-error'}`}>
              {tl.strength[strength]}
            </p>
          </div>
        )}
      </Field>

      {/* Confirm Password */}
      <Field label={tl.confirmPassword} error={errors.confirmPassword}>
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={formData.confirmPassword || ''}
            onChange={e => set('confirmPassword', e.target.value)}
            placeholder={tl.confirmPh}
            className={`${inputCls(errors.confirmPassword)} pr-20`}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline font-medium">
            {showConfirm ? tl.hide : tl.show}
          </button>
        </div>
        {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
          <p className="text-xs text-success mt-1 flex items-center gap-1">
            <Icon name="CheckCircleIcon" size={12} />
            {language === 'fr' ? 'Mots de passe identiques' : language === 'es' ? 'Contraseñas iguales' : language === 'pt' ? 'Senhas iguais' : language === 'ar' ? 'كلمتا المرور متطابقتان' : language === 'zh' ? '密码匹配' : 'Passwords match'}
          </p>
        )}
      </Field>
    </div>
  );
}

BasicInfoForm.propTypes = { formData: PropTypes.object, onFormDataChange: PropTypes.func, errors: PropTypes.object, language: PropTypes.string };
