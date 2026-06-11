import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function OrderStatusCard({ order }) {
  const getStatusColor = (status) => {
    const colors = {
      'Processing': 'bg-warning/10 text-warning border-warning/20',
      'Shipped': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'Delivered': 'bg-success/10 text-success border-success/20',
      'Cancelled': 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Processing': 'ClockIcon',
      'Shipped': 'TruckIcon',
      'Delivered': 'CheckCircleIcon',
      'Cancelled': 'XCircleIcon'
    };
    return icons?.[status] || 'ClockIcon';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
            <AppImage
              src={order?.productImage}
              alt={order?.productAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">{order?.productName}</h3>
            <p className="text-sm text-muted-foreground mb-2">Order #{order?.orderNumber}</p>
            <p className="text-sm text-foreground">Quantity: {order?.quantity}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
          {order?.status}
        </span>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name={getStatusIcon(order?.status)} size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">{order?.statusMessage}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="CalendarIcon" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Expected: {order?.expectedDelivery}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="BuildingStorefrontIcon" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Supplier: {order?.supplierName}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-lg font-semibold text-primary">{order?.totalPrice}</span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary border border-border rounded-md hover:bg-muted transition-smooth">
            Track Order
          </button>
          {order?.status === 'Delivered' && (
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth">
              Reorder
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

OrderStatusCard.propTypes = {
  order: PropTypes?.shape({
    orderNumber: PropTypes?.string?.isRequired,
    productName: PropTypes?.string?.isRequired,
    productImage: PropTypes?.string?.isRequired,
    productAlt: PropTypes?.string?.isRequired,
    quantity: PropTypes?.number?.isRequired,
    status: PropTypes?.string?.isRequired,
    statusMessage: PropTypes?.string?.isRequired,
    expectedDelivery: PropTypes?.string?.isRequired,
    supplierName: PropTypes?.string?.isRequired,
    totalPrice: PropTypes?.string?.isRequired
  })?.isRequired
};