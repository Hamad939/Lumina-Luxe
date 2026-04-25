function ProductCard({ product, onAddToCart, onBuyNow }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_60px_rgba(88,66,44,0.07)]">
      <div className="aspect-[4/5] overflow-hidden bg-[var(--color-cream-deep)]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="space-y-4 px-5 py-5">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-ink)]">
            {product.name}
          </h3>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-brand text-2xl text-[var(--color-ink)]">
            ${product.price}
          </span>
          <span className="rounded-full bg-[var(--color-blush)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
            {product.category}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="h-11 rounded-full border border-[var(--color-line)] text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-blush)]"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            className="h-11 rounded-full bg-[var(--color-accent)] text-sm font-medium text-white transition hover:bg-[var(--color-accent-strong)]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
