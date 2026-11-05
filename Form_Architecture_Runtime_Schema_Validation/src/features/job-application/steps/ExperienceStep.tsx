import { useFormContext } from 'react-hook-form'
import RadioGroupField from '../../../components/form/RadioGroupField'
import type { ApplicationFormInput } from '../../../schemas/applicationSchema'
import ExperienceFieldsByType from './ExperienceFieldsByType'

function ExperienceStep() {
  const { getValues, setValue } = useFormContext<ApplicationFormInput>()

  return (
    <div className="space-y-5">
      <RadioGroupField
        name="experience.experienceType"
        label="Experience level"
        options={[
          { value: 'fresher', label: 'Fresher' },
          { value: 'experienced', label: 'Experienced' },
        ]}
        onValueChange={(selectedValue) => {
          if (selectedValue === 'experienced' && !getValues('experience.previousCompanies')?.length) {
            setValue('experience.totalYears', 1)
            setValue('experience.noticePeriod', 'Immediate')
            setValue('experience.previousCompanies', [{ company: '', role: '', fromDate: '', toDate: '' }])
          }
        }}
      />
      <ExperienceFieldsByType />
    </div>
  )
}

export default ExperienceStep