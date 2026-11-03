import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

function ProductGrid() {
  return (
    <section className="pt-7" id="products" aria-labelledby="products-heading">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold" id="products-heading">
          Products
        </h2>
        <p className="text-sm text-muted">{products.length} items</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid