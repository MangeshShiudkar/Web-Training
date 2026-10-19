import { use } from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ productsPromise, onSelectProduct }) {
  // use() reads the Promise. While it is pending, React "suspends" this
  // component and the nearest <Suspense> shows its fallback.
  // If the Promise rejects, the nearest Error Boundary shows the error.
  const products = use(productsPromise);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelectProduct}/>
      ))}
    </div>
  );
}
