import { useFormContext } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'
import type { FieldProps } from './FieldProps'
import { inputClass, labelClass } from './fieldStyles.ts'

function NumberField({ name, label }: FieldProps) {
  const { register, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const error = getFieldState(name, formState).error
  const id = name.replaceAll('.', '-')

  return (
    <div>
      <label className={labelClass} htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
      <input id={id} className={inputClass} type="number" step="any" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...register(name, { valueAsNumber: true })} />
      {error?.message && <p className="mt-1 text-sm text-[#a12d28]" id={`${id}-error`} role="alert">{error.message}</p>}
    </div>
  )
}

export default NumberField