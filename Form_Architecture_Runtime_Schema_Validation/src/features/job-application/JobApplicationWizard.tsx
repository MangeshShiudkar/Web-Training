import { useEffect, useState, type FormEvent } from 'react'
import { get, FormProvider, useForm, type FieldPath } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, type ApplicationFormInput, type ApplicationFormValues } from '../../schemas/applicationSchema'
import { submitApplication, type MockScenario } from '../../services/mockApplicationApi'
import { getStepFields, stepTitles } from './formSteps'
import ApplicationStep from './steps/ApplicationStep'
import EducationStep from './steps/EducationStep'
import ExperienceStep from './steps/ExperienceStep'
import PersonalStep from './steps/PersonalStep'
import ReviewStep from './steps/ReviewStep'

const currentYear = new Date().getFullYear()

function JobApplicationWizard() {
  const [step, setStep] = useState(0)
  const [scenario, setScenario] = useState<MockScenario>('success')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [focusRequest, setFocusRequest] = useState<{ field: FieldPath<ApplicationFormInput>; step: number } | null>(null)
  const methods = useForm<ApplicationFormInput, unknown, ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    mode: 'onTouched',
    shouldUnregister: false,
    defaultValues: {
      personal: { fullName: '', email: '', phone: '', dateOfBirth: '', city: '' },
      qualifications: [{ degree: '', institution: '', year: currentYear, percentage: 0 }],
      experience: { experienceType: 'fresher', availableFrom: '' },
      application: { position: '', expectedJoiningDate: '', portfolioUrl: '', coverNote: '', acceptTerms: false },
    },
  })

  useEffect(() => {
    if (focusRequest && focusRequest.step === step) {
      methods.setFocus(focusRequest.field)
    }
  }, [focusRequest, methods, step])

  const nextStep = async () => {
    setSubmissionMessage('')
    setFocusRequest(null)
    const fields = getStepFields(methods.getValues())[step]
    const valid = await methods.trigger(fields, { shouldFocus: true })
    if (valid) setStep((current) => Math.min(current + 1, stepTitles.length - 1))
  }

  const onSubmit = methods.handleSubmit(
    async (values) => {
      setSubmissionMessage('')
      const result = await submitApplication(values, scenario)
      if (result.status === 'validation-error') {
        methods.setError(result.field, { type: 'server', message: result.message })
        setSubmissionMessage('The server found an issue with this field. Review the message below and try again.')
        setFocusRequest({ field: result.field, step: 3 })
        setStep(3)
      } else {
        setSubmissionMessage(result.message)
      }
    },
    (errors) => {
      const values = methods.getValues()
      const candidates = getStepFields(values).flat()
      const firstInvalid = candidates.find((name) => get(errors, name) !== undefined)

      if (firstInvalid) {
        const targetStep = firstInvalid.startsWith('personal.') ? 0
          : firstInvalid.startsWith('qualifications') ? 1
            : firstInvalid.startsWith('experience.') ? 2 : 3
        setSubmissionMessage('Please correct the highlighted field before submitting.')
        setFocusRequest({ field: firstInvalid, step: targetStep })
        setStep(targetStep)
      }
    },
  )

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (step !== stepTitles.length - 1) {
      event.preventDefault()
      return
    }

    void onSubmit(event)
  }

  const handleScenarioChange = (nextScenario: MockScenario) => {
    setScenario(nextScenario)
    setSubmissionMessage('')
  }

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 border-b border-[#dce3dd] pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#52715f]">Careers portal</p>
            <h1 className="mt-2 text-2xl font-semibold text-[#17231f] sm:text-3xl">Job application</h1>
            <p className="mt-2 text-sm text-[#68756d]">Complete each section, then review your application before submitting.</p>
          </header>

          <nav aria-label="Application steps" className="mb-7 overflow-x-auto">
            <ol className="grid min-w-xl grid-cols-5 gap-2">
              {stepTitles.map((label, index) => (
                <li className={`border-t-4 pt-2 text-xs font-medium sm:text-sm ${index === step ? 'border-[#315e4b] text-[#17231f]' : index < step ? 'border-[#8ea99a] text-[#52715f]' : 'border-[#dce3dd] text-[#89938d]'}`} key={label} aria-current={index === step ? 'step' : undefined}>
                  <span className="mr-1">{index + 1}.</span>{label}
                </li>
              ))}
            </ol>
          </nav>

          <form className="rounded border border-[#dce3dd] bg-white p-5 shadow-sm sm:p-8" noValidate onSubmit={handleFormSubmit}>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#718078]">Step {step + 1} of {stepTitles.length}</p>
              <h2 className="mt-1 text-xl font-semibold text-[#17231f]">{stepTitles[step]}</h2>
            </div>

            {step === 0 && <PersonalStep />}
            {step === 1 && <EducationStep />}
            {step === 2 && <ExperienceStep />}
            {step === 3 && <ApplicationStep />}
            {step === 4 && <ReviewStep scenario={scenario} onScenarioChange={handleScenarioChange} />}

            {submissionMessage && (
              <p className={`mt-6 rounded border px-4 py-3 text-sm ${submissionMessage.startsWith('Application submitted') ? 'border-[#a9c5b2] bg-[#edf6ef] text-[#245537]' : 'border-[#e8b5a8] bg-[#fff3ef] text-[#8d2e25]'}`} role="status" aria-live="polite">
                {submissionMessage}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5eae6] pt-5">
              <button
                className="rounded border border-[#aebbb2] px-4 py-2 text-sm font-semibold text-[#34473b] hover:bg-[#f3f6f3] disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                disabled={step === 0 || methods.formState.isSubmitting}
                onClick={() => { setSubmissionMessage(''); setFocusRequest(null); setStep((current) => current - 1) }}
              >
                Back
              </button>
              {step < stepTitles.length - 1 ? (
                <button className="rounded bg-[#315e4b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#244b39]" type="button" onClick={() => void nextStep()}>
                  Continue
                </button>
              ) : (
                <button className="rounded bg-[#315e4b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#244b39] disabled:cursor-wait disabled:opacity-60" type="submit" disabled={methods.formState.isSubmitting}>
                  {methods.formState.isSubmitting ? 'Submitting…' : 'Submit application'}
                </button>
              )}
            </div>
          </form>
          <p className="mt-4 text-xs text-[#718078]">Your information is kept in this form session and sent to a mock service for this exercise.</p>
        </div>
      </main>
    </FormProvider>
  )
}

export default JobApplicationWizard