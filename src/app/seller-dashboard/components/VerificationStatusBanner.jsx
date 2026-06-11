'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function VerificationStatusBanner({ status, expiryDate }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          bgColor: 'bg-success/10 border-success/20',
          textColor: 'text-success',
          icon: 'CheckBadgeIcon',
          title: 'Vendeur vérifié',
          message: expiryDate ? `Votre vérification est active jusqu'au ${expiryDate}` : 'Votre compte est vérifié et actif.',
        };
      case 'pending':
        return {
          bgColor: 'bg-warning/10 border-warning/20',
          textColor: 'text-warning',
          icon: 'ClockIcon',
          title: 'Vérification en cours',
          message: 'Vos documents de vérification sont en cours d\'examen. Vous serez notifié sous 24-48h.',
        };
      case 'expired':
        return {
          bgColor: 'bg-error/10 border-error/20',
          textColor: 'text-error',
          icon: 'ExclamationTriangleIcon',
          title: 'Vérification expirée',
          message: 'Veuillez renouveler votre vérification pour continuer à vendre.',
        };
      default:
        return {
          bgColor: 'bg-muted border-border',
          textColor: 'text-muted-foreground',
          icon: 'InformationCircleIcon',
          title: 'Non vérifié',
          message: 'Complétez la vérification pour débloquer toutes les fonctionnalités vendeur.',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config?.bgColor} border rounded-lg p-4`}>
      <div className="flex items-start space-x-3">
        <Icon name={config?.icon} size={22} className={config?.textColor} />
        <div className="flex-1">
          <h4 className={`text-sm font-semibold ${config?.textColor} mb-1`}>{config?.title}</h4>
          <p className="text-sm text-foreground">{config?.message}</p>
          {status !== 'verified' && (
            <button className="mt-2 text-sm font-medium text-primary hover:underline">
              {status === 'expired' ? 'Renouveler la vérification' : 'Compléter la vérification'} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

VerificationStatusBanner.propTypes = {
  status: PropTypes.string.isRequired,
  expiryDate: PropTypes.string,
};
