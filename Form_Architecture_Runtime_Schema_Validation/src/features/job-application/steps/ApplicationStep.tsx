import CheckboxField from '../../../components/form/CheckboxField'
import SelectField from '../../../components/form/SelectField'
import TextAreaField from '../../../components/form/TextAreaField'
import TextField from '../../../components/form/TextField'
import { positionOptions } from '../../../schemas/applicationSchema'

function ApplicationStep() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="application.position" label="Position applied for" options={positionOptions} />
        <TextField name="application.expectedJoiningDate" label="Expected joining date" type="date" />
        <TextField name="application.portfolioUrl" label="Portfolio link" type="url" required={false} />
      </div>
      <TextAreaField name="application.coverNote" label="Cover note" required={false} />
      <CheckboxField name="application.acceptTerms" label="I confirm that the information provided is accurate and agree to the application terms." />
    </div>
  )
}

export default ApplicationStep