import { useFormContext } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'
import type { FieldProps } from './FieldProps'

function CheckboxField({ name, label, required = true }: FieldProps) {
  const { register, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const error = getFieldState(name, formState).error
  const id = name.replaceAll('.', '-')

  return (
    <div>
      <label className="flex items-start gap-3 text-sm text-[#27372f]" htmlFor={id}>
        <input id={id} className="mt-1 accent-[#315e4b]" type="checkbox" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...register(name)} />
        <span>{label}{required && <span aria-hidden="true"> *</span>}</span>
      </label>
      {error?.message && <p className="mt-1 text-sm text-[#a12d28]" id={`${id}-error`} role="alert">{error.message}</p>}
    </div>
  )
}

export default CheckboxField