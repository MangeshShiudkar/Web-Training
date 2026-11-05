import { useFormContext, useWatch } from 'react-hook-form'
import TextField from '../../../components/form/TextField'
import type { ApplicationFormInput } from '../../../schemas/applicationSchema'
import PreviousCompaniesFields from './PreviousCompaniesFields'

function ExperienceFieldsByType() {
  const { control } = useFormContext<ApplicationFormInput>()
  const experienceType = useWatch({ control, name: 'experience.experienceType' })

  return experienceType === 'fresher' ? (
    <TextField name="experience.availableFrom" label="Available to join from" type="date" />
  ) : (
    <PreviousCompaniesFields />
  )
}

export default ExperienceFieldsByType