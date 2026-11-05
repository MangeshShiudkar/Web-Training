import { useFormContext, type FieldPath } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'

type RadioGroupFieldProps = {
  name: FieldPath<ApplicationFormInput>
  label: string
  options: readonly { value: string; label: string }[]
  onValueChange?: (value: string) => void
}

function RadioGroupField({ name, label, options, onValueChange }: RadioGroupFieldProps) {
  const { register, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const error = getFieldState(name, formState).error
  const id = name.replaceAll('.', '-')
  const registration = register(name)

  return (
    <fieldset aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-3 text-sm font-medium text-[#27372f]">{label} <span aria-hidden="true">*</span></legend>
      <div className="flex gap-6">
        {options.map((option) => (
          <label className="flex items-center gap-2 text-sm" htmlFor={`${id}-${option.value}`} key={option.value}>
            <input id={`${id}-${option.value}`} className="accent-[#315e4b]" type="radio" value={option.value} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...registration} onChange={(event) => {
              const selectedValue = event.currentTarget.value
              void registration.onChange(event)
              onValueChange?.(selectedValue)
            }} />
            {option.label}
          </label>
        ))}
      </div>
      {error?.message && <p className="mt-1 text-sm text-[#a12d28]" id={`${id}-error`} role="alert">{error.message}</p>}
    </fieldset>
  )
}

export default RadioGroupField