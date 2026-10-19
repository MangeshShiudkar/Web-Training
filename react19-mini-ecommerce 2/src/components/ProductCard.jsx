export default function ProductCard({ product, onSelect }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover"/>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="w-fit rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {product.category}
        </span>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.shortDescription}</p>
        <p className="mt-auto pt-2 text-lg font-bold">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => onSelect(product)}
          className="mt-2 rounded-md border border-indigo-600 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
