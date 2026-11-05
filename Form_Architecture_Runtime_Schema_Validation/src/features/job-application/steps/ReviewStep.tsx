import { useFormContext } from 'react-hook-form'
import { inputClass, labelClass } from '../../../components/form/fieldStyles.ts'
import type { ApplicationFormInput } from '../../../schemas/applicationSchema'
import type { MockScenario } from '../../../services/mockApplicationApi'

function SummaryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="grid gap-1 border-b border-[#e5eae6] py-2 sm:grid-cols-[12rem_1fr]">
      <dt className="text-sm text-[#68756d]">{label}</dt>
      <dd className="wrap-break-word text-sm font-medium text-[#17231f]">{value || 'Not provided'}</dd>
    </div>
  )
}

type ReviewStepProps = {
  scenario: MockScenario
  onScenarioChange: (value: MockScenario) => void
}

function ReviewStep({ scenario, onScenarioChange }: ReviewStepProps) {
  const { getValues, getFieldState, formState } = useFormContext<ApplicationFormInput>()
  const values = getValues()
  const positionError = getFieldState('application.position', formState).error

  return (
    <div className="space-y-7">
      <section aria-labelledby="review-personal">
        <h3 className="mb-2 font-semibold text-[#315e4b]" id="review-personal">Personal details</h3>
        <dl>
          <SummaryRow label="Full name" value={values.personal.fullName} />
          <SummaryRow label="Email" value={values.personal.email} />
          <SummaryRow label="Phone" value={values.personal.phone} />
          <SummaryRow label="Date of birth" value={values.personal.dateOfBirth} />
          <SummaryRow label="Current city" value={values.personal.city} />
        </dl>
      </section>
      <section aria-labelledby="review-education">
        <h3 className="mb-2 font-semibold text-[#315e4b]" id="review-education">Education</h3>
        <div className="space-y-3">
          {values.qualifications.map((qualification, index) => (
            <dl className="rounded border border-[#e5eae6] px-3" key={`${qualification.degree}-${index}`}>
              <SummaryRow label="Degree" value={qualification.degree} />
              <SummaryRow label="Institution" value={qualification.institution} />
              <SummaryRow label="Year / percentage" value={`${qualification.year} / ${qualification.percentage}%`} />
            </dl>
          ))}
        </div>
      </section>
      <section aria-labelledby="review-experience">
        <h3 className="mb-2 font-semibold text-[#315e4b]" id="review-experience">Experience</h3>
        <dl>
          <SummaryRow label="Candidate type" value={values.experience.experienceType} />
          {values.experience.experienceType === 'fresher' ? (
            <SummaryRow label="Available from" value={values.experience.availableFrom} />
          ) : (
            <>
              <SummaryRow label="Total experience" value={`${values.experience.totalYears} years`} />
              <SummaryRow label="Notice period" value={values.experience.noticePeriod} />
              {values.experience.previousCompanies.map((company, index) => (
                <SummaryRow key={`${company.company}-${index}`} label={`Company ${index + 1}`} value={`${company.company}, ${company.role} (${company.fromDate} to ${company.toDate})`} />
              ))}
            </>
          )}
        </dl>
      </section>
      <section aria-labelledby="review-application">
        <h3 className="mb-2 font-semibold text-[#315e4b]" id="review-application">Application</h3>
        <dl>
          <SummaryRow label="Position" value={values.application.position} />
          <SummaryRow label="Expected joining date" value={values.application.expectedJoiningDate} />
          <SummaryRow label="Portfolio" value={values.application.portfolioUrl} />
          <SummaryRow label="Cover note" value={values.application.coverNote} />
        </dl>
        {positionError?.message && <p className="mt-2 text-sm text-[#a12d28]" role="alert">Position: {positionError.message}</p>}
      </section>
      <div className="max-w-sm">
        <label className={labelClass} htmlFor="mock-scenario">Mock API response</label>
        <select id="mock-scenario" className={inputClass} value={scenario} onChange={(event) => onScenarioChange(event.target.value as MockScenario)}>
          <option value="success">Success</option>
          <option value="validation">Field validation error</option>
          <option value="server-error">Server error</option>
        </select>
      </div>
    </div>
  )
}

export default ReviewStep