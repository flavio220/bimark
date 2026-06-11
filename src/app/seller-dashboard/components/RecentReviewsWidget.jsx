'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function RecentReviewsWidget({ reviews = [], onRespondToReview }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Avis récents</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{reviews?.length || 0} avis</p>
        </div>
        <Icon name="ChatBubbleBottomCenterTextIcon" size={20} className="text-primary" />
      </div>

      {(!reviews || reviews.length === 0) ? (
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="StarIcon" size={22} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Aucun avis</p>
          <p className="text-xs text-muted-foreground">Les avis de vos clients apparaîtront ici</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {reviews.map((review) => (
            <div key={review?.id} className="p-4">
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">{review?.customerName}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="StarIcon" size={12} className={i < review?.rating ? "text-accent" : "text-muted"} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{review?.productName}</p>
              <p className="text-xs text-foreground mb-2 line-clamp-2">{review?.comment}</p>
              {!review?.responded && (
                <button
                  onClick={() => onRespondToReview?.(review?.id)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Répondre
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

RecentReviewsWidget.propTypes = {
  reviews: PropTypes.array,
  onRespondToReview: PropTypes.func,
};
