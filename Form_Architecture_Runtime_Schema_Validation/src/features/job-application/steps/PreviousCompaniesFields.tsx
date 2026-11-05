import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form'
import NumberField from '../../../components/form/NumberField'
import SelectField from '../../../components/form/SelectField'
import TextField from '../../../components/form/TextField'
import type { ApplicationFormInput } from '../../../schemas/applicationSchema'
import { noticePeriodOptions } from '../../../schemas/applicationSchema'

function PreviousCompaniesFields() {
  const { control, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const { fields, append, remove } = useFieldArray({ control, name: 'experience.previousCompanies' })
  const listError = getFieldState('experience.previousCompanies', formState).error

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField name="experience.totalYears" label="Total experience (years)" />
        <SelectField name="experience.noticePeriod" label="Notice period" options={noticePeriodOptions} />
      </div>
      <fieldset
        className="space-y-5"
        aria-invalid={Boolean(listError)}
        aria-describedby={listError ? 'previous-companies-error' : undefined}
      >
        <legend className="text-sm font-semibold text-[#27372f]">Previous companies</legend>
        {fields.map((field, index) => (
          <fieldset className="grid gap-4 rounded border border-[#dce3dd] p-4 sm:grid-cols-2" key={field.id}>
            <legend className="px-1 text-sm font-semibold text-[#315e4b]">Company {index + 1}</legend>
            <TextField name={`experience.previousCompanies.${index}.company` as FieldPath<ApplicationFormInput>} label="Company" />
            <TextField name={`experience.previousCompanies.${index}.role` as FieldPath<ApplicationFormInput>} label="Role" />
            <TextField name={`experience.previousCompanies.${index}.fromDate` as FieldPath<ApplicationFormInput>} label="From" type="date" />
            <TextField name={`experience.previousCompanies.${index}.toDate` as FieldPath<ApplicationFormInput>} label="To" type="date" />
            <button className="justify-self-start text-sm font-medium text-[#a12d28] underline disabled:opacity-40" type="button" disabled={fields.length === 1} onClick={() => remove(index)}>
              Remove company {index + 1}
            </button>
          </fieldset>
        ))}
        {listError?.message && <p className="text-sm text-[#a12d28]" id="previous-companies-error" role="alert">{listError.message}</p>}
        <button className="rounded border border-[#315e4b] px-4 py-2 text-sm font-semibold text-[#315e4b] hover:bg-[#eaf0eb]" type="button" onClick={() => append({ company: '', role: '', fromDate: '', toDate: '' })}>
          Add company
        </button>
      </fieldset>
    </div>
  )
}

export default PreviousCompaniesFields