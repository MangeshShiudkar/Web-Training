import TextField from '../../../components/form/TextField'

function PersonalStep() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField name="personal.fullName" label="Full name" />
      <TextField name="personal.email" label="Email" type="email" />
      <TextField name="personal.phone" label="Phone" type="tel" />
      <TextField name="personal.dateOfBirth" label="Date of birth" type="date" />
      <TextField name="personal.city" label="Current city" />
    </div>
  )
}

export default PersonalStep