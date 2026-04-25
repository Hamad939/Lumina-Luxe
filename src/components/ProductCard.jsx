function ProductCard({ product, onAddToCart, onBuyNow }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/70 bg-white shadow-[0_10px_30px_rgba(88,66,44,0.05)] sm:shadow-[0_24px_60px_rgba(88,66,44,0.07)]">
      {/* Fixed Aspect Ratio Image */}
      <div className="aspect-[4/5] overflow-hidden bg-[var(--color-cream-deep)]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>

      {/* Content Area - flex-1 pushes buttons to bottom */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[var(--color-ink)] sm:text-lg line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-[10px] leading-4 text-[var(--color-muted)] sm:text-sm sm:leading-6 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Category */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-brand text-base text-[var(--color-ink)] sm:text-2xl">
            Rs. {product.price}
          </span>
          {/* Hide category on very small screens to save space, or keep it tiny */}
          <span className="hidden sm:inline-block rounded-full bg-[var(--color-blush)] px-2 py-0.5 text-[8px] uppercase tracking-[0.15em] text-[var(--color-muted)] sm:px-3 sm:py-1 sm:text-xs">
            {product.category}
          </span>
        </div>

        {/* Buttons - Stacked on mobile, side-by-side on desktop */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="h-9 sm:h-11 rounded-full border border-[var(--color-line)] text-[10px] sm:text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-blush)]"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            className="h-9 sm:h-11 rounded-full bg-[var(--color-accent)] text-[10px] sm:text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
