// Mock product data (the images are simple SVG files in /public/images).
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    image: "/images/headphones.svg",
    shortDescription: "Comfortable over-ear headphones.",
    fullDescription: "Over-ear Bluetooth headphones with soft ear cushions, clear sound and up to 30 hours of battery life. Great for music, calls and travel.",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 59.99,
    category: "Footwear",
    image: "/images/shoes.svg",
    shortDescription: "Lightweight shoes for daily runs.",
    fullDescription: "Lightweight running shoes with a breathable mesh top and a cushioned sole. Designed for daily runs, walks and gym sessions.",
  },
  {
    id: 3,
    name: "Coffee Mug",
    price: 12.5,
    category: "Kitchen",
    image: "/images/mug.svg",
    shortDescription: "Ceramic mug for hot drinks.",
    fullDescription: "A 350 ml ceramic mug with a comfortable handle. Dishwasher safe and microwave safe, perfect for coffee or tea.",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 129.0,
    category: "Electronics",
    image: "/images/watch.svg",
    shortDescription: "Track steps, time and notifications.",
    fullDescription: "A smart watch with a bright display, step counter, sleep tracker and phone notifications. Water resistant for everyday use.",
  },
  {
    id: 5,
    name: "Backpack",
    price: 44.0,
    category: "Accessories",
    image: "/images/backpack.svg",
    shortDescription: "Roomy backpack for work or school.",
    fullDescription: "A durable 25 litre backpack with a padded laptop pocket, water bottle holder and comfortable shoulder straps.",
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 24.99,
    category: "Home",
    image: "/images/lamp.svg",
    shortDescription: "Adjustable LED lamp for your desk.",
    fullDescription: "An adjustable LED desk lamp with three brightness levels and a flexible neck. Gentle on the eyes for late-night work.",
  },
];

// Simulates an API call. It resolves after 2 seconds.
// If shouldFail is true it rejects, so we can test the error state.
export function fetchProducts(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Could not load the products. Please try again."));
      } else {
        resolve(products);
      }
    }, 2000);
  });
}

// TEST SCENARIO: "Add to Cart" always fails for this product,
// so we can reliably test the rollback of the optimistic cart count.
export const FAILING_PRODUCT_ID = 4;

// Simulates the "add to cart" API call (1.5 seconds).
export function addToCartRequest(product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product.id === FAILING_PRODUCT_ID) {
        reject(new Error(`Could not add "${product.name}" to the cart.`));
      } else {
        resolve({ success: true });
      }
    }, 1500);
  });
}
