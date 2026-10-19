import AddToCartButton from "./AddToCartButton.jsx";

export default function ProductDetails({ product, onBack, onAddToCart }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <button onClick={onBack} className="mb-4 text-sm font-medium text-indigo-600 hover:underline">
        &larr; Back to products
      </button>
      <div className="grid gap-6 md:grid-cols-2">
        <img src={product.image} alt={product.name} className="w-full rounded-lg object-cover"/>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-2xl font-semibold text-indigo-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700">{product.fullDescription}</p>
          <AddToCartButton product={product} onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
}
