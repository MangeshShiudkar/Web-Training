import { useActionState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext.jsx";
import FocusInput from "./FocusInput.jsx";
import SubmitButton from "./SubmitButton.jsx";

const initialState = {
  status: "idle",
  errors: {},
  values: { name: "", email: "" },
};

export default function RegistrationForm() {
  const { setUser } = useContext(UserContext);

  // Refs so we can focus the first field that has an error
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // The action receives the previous state and the form data.
  // Whatever it returns becomes the new "state".
  async function registerAction(previousState, formData) {
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");

    // Basic validation
    const errors = {};
    if (name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (Object.keys(errors).length > 0) {
      // Send the typed values back so the inputs keep them
      // (React clears uncontrolled fields after a form action).
      return { status: "error", errors, values: { name, email } };
    }

    // Simulated API request (no real registration or password storage)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return the new user. It is saved in Context when the user clicks
    // "Continue to Store", so the success message stays visible first.
    return {
      status: "success",
      errors: {},
      values: { name: "", email: "" },
      user: { name, email },
    };
  }

  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  // After a validation error, focus the first invalid field (uses the refs)
  useEffect(() => {
    if (state.status !== "error") return;
    if (state.errors.name) nameRef.current.focus();
    else if (state.errors.email) emailRef.current.focus();
    else if (state.errors.password) passwordRef.current.focus();
  }, [state]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-xl font-semibold">Register</h2>
      <form action={formAction} className="space-y-3">
        <FocusInput
          ref={nameRef}
          label="Name"
          name="name"
          type="text"
          defaultValue={state.values.name}
          error={state.errors.name}
        />
        <FocusInput
          ref={emailRef}
          label="Email"
          name="email"
          type="text"
          defaultValue={state.values.email}
          error={state.errors.email}
        />
        <FocusInput
          ref={passwordRef}
          label="Password"
          name="password"
          type="password"
          error={state.errors.password}
        />
        <SubmitButton text="Register" pendingText="Registering..." />
        {isPending && (
          <p className="text-sm text-gray-600">Submitting your details...</p>
        )}
        {state.status === "success" && !isPending && (
          <div className="space-y-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
            <p>Registration successful! Welcome, {state.user.name}.</p>
            <button
              type="button"
              onClick={() => setUser(state.user)}
              className="rounded-md bg-green-600 px-3 py-2 font-medium text-white hover:bg-green-700"
            >
              Continue to Store
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
