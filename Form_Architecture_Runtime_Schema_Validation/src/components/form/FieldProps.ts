import type { FieldPath } from 'react-hook-form'
import type { ApplicationFormInput } from '../../schemas/applicationSchema'

export type FieldProps = {
  name: FieldPath<ApplicationFormInput>
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}