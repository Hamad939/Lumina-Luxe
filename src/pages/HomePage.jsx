import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'

function HomePage({ products, onAddToCart, onBuyNow, onShopNow }) {
  return (
    <main id="top">
      <Hero onShopNow={onShopNow} />

      <section
        id="collections"
        className="px-4 pb-16 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured pieces"
            title="Everyday favorites with a refined finish."
            description="A light, modern edit of wardrobe staples designed to move from morning errands to evening plans without losing their softness."
          />
          <div className="mt-10">
            <ProductGrid
              products={products}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
