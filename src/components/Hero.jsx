const heroImage =
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80'

function Hero({ onShopNow }) {
  return (
    <section className="px-4 pt-6 sm:px-6 lg:px-8">
      <div
        className="relative min-h-[58vh] overflow-hidden rounded-[32px] border border-white/60 sm:min-h-[66vh] lg:min-h-[76vh]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(40, 27, 20, 0.68) 0%, rgba(40, 27, 20, 0.38) 36%, rgba(40, 27, 20, 0.12) 100%), url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_30%)]" />
        <div className="relative flex min-h-[58vh] items-end px-6 py-8 sm:min-h-[66vh] sm:px-10 sm:py-10 lg:min-h-[76vh] lg:px-16 lg:py-16">
          <div className="fade-up max-w-2xl text-white">
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-white/75 sm:text-sm">
              Minimal essentials for her
            </p>
            <h1 className="font-brand text-5xl leading-none sm:text-6xl lg:text-7xl">
              A softer way to dress beautifully every day.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/82 sm:text-base">
              Curated silhouettes, warm neutrals, and polished layers shaped for
              easy mornings, thoughtful gifting, and effortless confidence.
            </p>
            <button
              type="button"
              onClick={onShopNow}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-7 text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
