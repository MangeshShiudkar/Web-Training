const statusStyles = {
  'In stock': 'bg-emerald-50 text-success',
  'Low stock': 'bg-amber-50 text-warning',
  'Out of stock': 'bg-rose-50 text-danger',
}

function ProductCard({ product }) {
  const isOutOfStock = product.status === 'Out of stock'

  return (
    <article className="overflow-hidden rounded-panel border border-line bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 overflow-hidden bg-canvas">
        <img
          className="h-full w-full object-cover"
          src={product.image}
          alt={product.name}
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[product.status]}`}
        >
          {product.status}
        </span>
      </div>
      <div className="p-5">
        <p className="text-sm font-medium text-muted">{product.category}</p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold leading-6">{product.name}</h2>
          <p className="shrink-0 text-base font-semibold">{product.price}</p>
        </div>
        <button
          className="mt-5 w-full rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink"
          type="button"
          disabled={isOutOfStock}
        >
          Edit product
        </button>
      </div>
    </article>
  )
}

export default ProductCard