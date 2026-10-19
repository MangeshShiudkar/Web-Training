// React 19: "ref" is a normal prop, so we do not need forwardRef().
export default function FocusInput({ ref, label, error, ...inputProps }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium" htmlFor={inputProps.name}>
        {label}
      </label>
      <input
        ref={ref}
        id={inputProps.name}
        className={`w-full rounded-md border px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...inputProps}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
