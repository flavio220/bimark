'use client';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function NotificationCenter({ notifications = [] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Notifications</h3>
        <Icon name="BellIcon" size={18} className="text-primary" />
      </div>
      {(!notifications || notifications.length === 0) ? (
        <div className="p-8 text-center">
          <Icon name="BellIcon" size={28} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-foreground font-medium mb-1">Aucune notification</p>
          <p className="text-xs text-muted-foreground">Vous serez notifié des mises à jour importantes ici</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {notifications.map((n, i) => (
            <div key={i} className="p-4 flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="BellIcon" size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
NotificationCenter.propTypes = { notifications: PropTypes.array };
