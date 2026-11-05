import { useFormContext } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'
import type { FieldProps } from './FieldProps'
import { inputClass, labelClass } from './fieldStyles.ts'

type SelectFieldProps = FieldProps & { options: readonly string[] }

function SelectField({ name, label, options }: SelectFieldProps) {
  const { register, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const error = getFieldState(name, formState).error
  const id = name.replaceAll('.', '-')

  return (
    <div>
      <label className={labelClass} htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
      <select id={id} className={inputClass} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...register(name)}>
        <option value="">Choose an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error?.message && <p className="mt-1 text-sm text-[#a12d28]" id={`${id}-error`} role="alert">{error.message}</p>}
    </div>
  )
}

export default SelectField