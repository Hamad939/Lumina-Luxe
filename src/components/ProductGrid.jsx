import ProductCard from './ProductCard'

function ProductGrid({ products, onAddToCart, onBuyNow }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  )
}

export default ProductGrid
