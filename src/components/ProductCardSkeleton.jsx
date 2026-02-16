export default function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton skeleton-stars" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}
