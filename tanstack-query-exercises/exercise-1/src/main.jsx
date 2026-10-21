import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {QueryClient, QueryClientProvider, useQuery,} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles.css";
import { fetchProducts } from "./api/product";

const queryClient = new QueryClient();

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  // Keep each search in its own cache.
  const { data: products, isPending, isFetching, isError, error, isSuccess, refetch,} = useQuery({
    queryKey: searchTerm.trim() ? ["products", { search: searchTerm.trim() }] : ["products"],
    queryFn: () => fetchProducts(searchTerm),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  })

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Exercise 1: Product Listing
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="mb-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFetching ? "Refreshing..." : "Refresh Products"}
        </button>
        {isPending && <p className="mb-4 text-gray-600">Loading products...</p>}
        {isError && (
          <p role="alert" className="mb-4 text-red-600">
            Failed to load products: {error.message}
          </p>
        )}
        {isSuccess && (
          <>
            {isFetching && (
              <p className="mb-4 text-sm text-blue-600">Updating products...</p>
            )}

            {products.length === 0 ? (
              <p className="rounded-lg bg-white p-6 text-gray-600">
                No products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="rounded-xl bg-white p-4 shadow-sm">
                    <img src={product.thumbnail} alt={product.title} className="mb-3 h-40 w-full object-contain"/>
                    <h2 className="mb-2 font-semibold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="mb-2 text-sm text-gray-500">
                      {product.category}
                    </p>
                    <p className="font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)
