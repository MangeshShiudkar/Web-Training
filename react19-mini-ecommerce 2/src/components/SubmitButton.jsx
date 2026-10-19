import { useFormStatus } from "react-dom";

// Reusable submit button. useFormStatus() reads the status of the
// parent <form>, so this component must be rendered INSIDE a form.
export default function SubmitButton({ text, pendingText }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingText : text}
    </button>
  );
}
