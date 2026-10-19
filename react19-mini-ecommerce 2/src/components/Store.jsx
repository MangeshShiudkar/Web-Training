import { Suspense, useOptimistic, useState } from "react";
import { addToCartRequest, fetchProducts } from "../data/products.js";
import ErrorBoundary from "./ErrorBoundary.jsx";
import ProductList from "./ProductList.jsx";
import ProductDetails from "./ProductDetails.jsx";
import UserInfo from "./UserInfo.jsx";

// Open the store with ?error=true to test the error state.
const shouldFail = new URLSearchParams(window.location.search).get("error") === "true";

// Shown only after the user has registered.
export default function Store() {
  // The Promise is created ONCE (when the store first appears), not on every
  // render. The function inside useState only runs on the first render.
  const [productsPromise] = useState(() => fetchProducts(shouldFail));

  const [selectedProduct, setSelectedProduct] = useState(null);
  // the real cart count
  const [cartCount, setCartCount] = useState(0); 
  // optimisticCartCount shows the new value immediately. When the action
  // finishes, React switches back to the real cartCount (rollback on failure).
  const [optimisticCartCount, setOptimisticCartCount] = useOptimistic(cartCount);
  const cartIsUpdating = optimisticCartCount !== cartCount;

  async function handleAddToCart(product) {
    // 1. update the count immediately
    setOptimisticCartCount(cartCount + 1); 
    try {
      // 2. simulated API request
      await addToCartRequest(product); 
      // 3. save the real count
      setCartCount((current) => current + 1); 
      return { success: true, message: `${product.name} was added to your cart.` };
    } catch (error) {
      // 4. On failure the real cartCount is unchanged, so the UI goes back.
      return { success: false, message:`${error.message} Your cart count was restored.`,};
    }
  }

  // Document Metadata: React moves these into <head> automatically.
  const pageTitle = selectedProduct ? `${selectedProduct.name} – Mini E-Commerce Store` : "Mini E-Commerce Store – Products";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content="Browse products in the Mini E-Commerce Store."/>
      <header className="bg-indigo-600 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Mini E-Commerce Store</h1>
          <p className="rounded-full bg-white px-4 py-1 font-semibold text-indigo-700">
            Cart: {optimisticCartCount}
            {cartIsUpdating && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                (updating...)
              </span>
            )}
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-8 p-4 lg:grid-cols-3">
        <section className="lg:col-span-2">
          {selectedProduct ? (
            <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={handleAddToCart}/>
          ) : (
            <>
              <h2 className="mb-4 text-xl font-semibold">Products</h2>
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <p className="animate-pulse rounded-lg bg-white p-6 text-center text-gray-600">
                      Loading products...
                    </p>
                  }
                >
                  <ProductList productsPromise={productsPromise} onSelectProduct={setSelectedProduct}/>
                </Suspense>
              </ErrorBoundary>
            </>
          )}
        </section>
        <aside>
          <UserInfo />
        </aside>
      </main>
    </>
  );
}
