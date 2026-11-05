import type { FieldPath } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'

export const stepTitles = ['Personal details', 'Education', 'Experience', 'Application', 'Review & submit']

export function getStepFields(values: ApplicationFormInput): FieldPath<ApplicationFormInput>[][] {
  const qualificationFields = values.qualifications.flatMap((_, index) => [
    `qualifications.${index}.degree`,
    `qualifications.${index}.institution`,
    `qualifications.${index}.year`,
    `qualifications.${index}.percentage`,
  ] as FieldPath<ApplicationFormInput>[])
  const experienceFields: FieldPath<ApplicationFormInput>[] = values.experience.experienceType === 'fresher'
    ? ['experience.experienceType', 'experience.availableFrom']
    : [
        'experience.experienceType',
        'experience.totalYears',
        'experience.noticePeriod',
        ...values.experience.previousCompanies.flatMap((_, index) => [
          `experience.previousCompanies.${index}.company`,
          `experience.previousCompanies.${index}.role`,
          `experience.previousCompanies.${index}.fromDate`,
          `experience.previousCompanies.${index}.toDate`,
        ] as FieldPath<ApplicationFormInput>[]),
      ]

  return [
    ['personal.fullName', 'personal.email', 'personal.phone', 'personal.dateOfBirth', 'personal.city'],
    qualificationFields,
    experienceFields,
    ['application.position', 'application.expectedJoiningDate', 'application.portfolioUrl', 'application.coverNote', 'application.acceptTerms'],
  ]
}