# Mini E-Commerce Store

This project uses React 19 features for product browsing, registration, and adding products to a cart.

## Task 1: Products and Registration

### Product data, `use()`, and Suspense

The product data is returned by a simulated Promise. `Store` creates the Promise once and passes it to `ProductList`. `ProductList` reads it with React's `use()` function. While the data is loading, `<Suspense>` shows a loading message. If loading fails, an Error Boundary displays an error message.

### Registration form actions

The registration form uses `<form action={formAction}>` and `useActionState()`. The action checks the name, email, and password, then simulates a server request with `setTimeout()`. It returns validation errors or a success result. The form shows its pending, error, and success states.

`SubmitButton` uses `useFormStatus()` to read the form's pending state. It disables the button and changes its label while the form action is running.

### Context

`UserContext` stores the registered user's name and email. It uses React 19 provider syntax: `<UserContext value={...}>`. After registration, `UserInfo` reads the user from Context and displays the information.

### Document metadata

The app renders `<title>` and `<meta name="description">` in its components. The title reflects the registration page, product list, or selected product. React places this metadata in the document head.

### Asset loading APIs

The app uses these React DOM APIs:

- `preconnect()` prepares connections to `fonts.googleapis.com` and `fonts.gstatic.com`, which provide the app's Inter font.
- `preinit()` starts loading the Inter font stylesheet early.
- `preload()` starts loading the headphones image early because it is the first product image.

These APIs are useful for resources the app expects to need. The assignment requires at least two; this project uses three.

## Task 2: Product Details and Cart

### Product details and optimistic cart

Selecting a product shows its name, price, full description, and image. The Add to Cart form uses `useActionState()` to run a simulated request. `useOptimistic()` updates the cart count immediately while the request is pending. If the request succeeds, the real count is updated. The Smart Watch request is set to fail for testing, and the count returns to its previous value.

### Ref as a prop and ref cleanup

`FocusInput` accepts `ref` as a regular prop and uses it to focus the first field with a validation error. The Add to Cart form also uses a callback ref to add a focus event listener. The callback returns a cleanup function that removes the listener when the form is removed.

### Server and Client Components

This project uses Vite, so it does not implement React Server Components. In a framework that supports them, product details could be a Server Component because the product information can be fetched and rendered on the server. Add to Cart needs to be a Client Component because it uses state, event handling, `useOptimistic()`, and refs. They can work together: the server can render product information and include a client-side Add to Cart control.

### React Compiler

React Compiler is a build-time tool that can optimize React components and reduce the need for manual memoization. For example, it could avoid some unnecessary work when a product card's props have not changed. The compiler is not enabled in this Vite project; this section describes how it could help.