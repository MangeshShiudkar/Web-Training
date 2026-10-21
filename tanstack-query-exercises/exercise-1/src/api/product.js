
const API_URL = 'https://dummyjson.com/products'

export async function fetchProducts(searchTerm = '') {
  const trimmedSearch = searchTerm.trim()
  // Search the API when a search term is entered.
  const url = trimmedSearch ? `${API_URL}/search?q=${encodeURIComponent(trimmedSearch)}&limit=20` : `${API_URL}?limit=20`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  const result = await response.json()
  return result.products
}
