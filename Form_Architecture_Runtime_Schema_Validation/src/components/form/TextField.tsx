import { useFormContext } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'
import type { FieldProps } from './FieldProps'
import { inputClass, labelClass } from './fieldStyles.ts'

function TextField({ name, label, type = 'text', placeholder, required = true }: FieldProps) {
  const { register, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const error = getFieldState(name, formState).error
  const id = name.replaceAll('.', '-')

  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input id={id} className={inputClass} type={type} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...register(name)} />
      {error?.message && <p className="mt-1 text-sm text-[#a12d28]" id={`${id}-error`} role="alert">{error.message}</p>}
    </div>
  )
}

export default TextField