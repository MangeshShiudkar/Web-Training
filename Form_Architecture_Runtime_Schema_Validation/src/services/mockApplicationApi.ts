import type { ApplicationFormValues } from '../schemas/applicationSchema'

export type MockScenario = 'success' | 'validation' | 'server-error'

type SubmissionResult =
  | { status: 'success'; message: string }
  | { status: 'validation-error'; field: 'application.position'; message: string }
  | { status: 'server-error'; message: string }

export async function submitApplication(
  _application: ApplicationFormValues,
  scenario: MockScenario,
): Promise<SubmissionResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 1500))

  if (scenario === 'validation') {
    return {
      status: 'validation-error',
      field: 'application.position',
      message: 'This position is no longer accepting applications. Choose another position.',
    }
  }

  if (scenario === 'server-error') {
    return { status: 'server-error', message: 'The application service is unavailable. Please try again.' }
  }

  return { status: 'success', message: 'Application submitted successfully. Thank you for applying.' }
}