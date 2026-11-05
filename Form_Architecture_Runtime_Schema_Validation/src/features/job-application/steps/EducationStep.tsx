import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form'
import NumberField from '../../../components/form/NumberField'
import TextField from '../../../components/form/TextField'
import type { ApplicationFormInput } from '../../../schemas/applicationSchema'

function EducationStep() {
  const { control, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const { fields, append, remove } = useFieldArray({ control, name: 'qualifications' })
  const listError = getFieldState('qualifications', formState).error

  return (
    <fieldset
      className="space-y-5"
      aria-invalid={Boolean(listError)}
      aria-describedby={listError ? 'qualifications-error' : undefined}
    >
      <legend className="mb-2 text-sm font-semibold text-[#315e4b]">Qualifications</legend>
      {fields.map((field, index) => (
        <fieldset className="grid gap-4 rounded border border-[#dce3dd] p-4 sm:grid-cols-2" key={field.id}>
          <legend className="px-1 text-sm font-semibold text-[#315e4b]">Qualification {index + 1}</legend>
          <TextField name={`qualifications.${index}.degree` as FieldPath<ApplicationFormInput>} label="Degree" />
          <TextField name={`qualifications.${index}.institution` as FieldPath<ApplicationFormInput>} label="Institution" />
          <NumberField name={`qualifications.${index}.year` as FieldPath<ApplicationFormInput>} label="Year of passing" />
          <NumberField name={`qualifications.${index}.percentage` as FieldPath<ApplicationFormInput>} label="Percentage" />
          <button className="justify-self-start text-sm font-medium text-[#a12d28] underline disabled:opacity-40" type="button" disabled={fields.length === 1} onClick={() => remove(index)}>
            Remove qualification {index + 1}
          </button>
        </fieldset>
      ))}
      {listError?.message && <p className="text-sm text-[#a12d28]" id="qualifications-error" role="alert">{listError.message}</p>}
      <button className="rounded border border-[#315e4b] px-4 py-2 text-sm font-semibold text-[#315e4b] hover:bg-[#eaf0eb]" type="button" onClick={() => append({ degree: '', institution: '', year: new Date().getFullYear(), percentage: 0 })}>
        Add qualification
      </button>
    </fieldset>
  )
}

export default EducationStep