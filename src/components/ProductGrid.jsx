import ProductCard from "./ProductCard";

function ProductGrid({ products, onAddToCart, onBuyNow }) {
  return (
    /* grid-cols-2: Force 2 columns on mobile
       gap-3: Slightly smaller gap for mobile so cards have more room
       md:gap-6: Restore larger gap on bigger screens
       md:grid-cols-2: Keep 2 columns on tablets
       xl:grid-cols-3: Go to 3 columns on desktop
    */
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
