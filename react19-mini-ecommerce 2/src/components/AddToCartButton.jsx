import { useActionState } from "react";
import SubmitButton from "./SubmitButton.jsx";

// Callback ref WITH a cleanup function (React 19).
// Setup: add a focus listener when the form appears.
// Cleanup: React calls the returned function when the form is removed.
// It is defined outside the component so its identity never changes.
function logFocusEvents(formElement) {
  function handleFocus(event) {
    console.log("Focus event inside the Add to Cart form:", event.target.tagName);
  }
  formElement.addEventListener("focusin", handleFocus);
  console.log("Ref setup: focus listener added");

  return () => {
    formElement.removeEventListener("focusin", handleFocus);
    console.log("Ref cleanup: focus listener removed");
  };
}

export default function AddToCartButton({ product, onAddToCart }) {
  // The result ({ success, message }) is shown under the button.
  const [result, formAction] = useActionState(async () => await onAddToCart(product),null);

  return (
    <form ref={logFocusEvents} action={formAction} className="space-y-2">
      <SubmitButton text="Add to Cart" pendingText="Adding..." />
      {result && (
        <p
          role="status"
          className={`rounded-md p-2 text-sm ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {result.message}
        </p>
      )}
    </form>
  );
}
