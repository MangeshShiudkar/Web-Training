export function validateRequiredFields(name: string, id: string, dateOfBirth: string): void {
  if (!name.trim()) {
    throw new Error("Employee name is required.");
  }
  if (!id.trim()) {
    throw new Error("Employee ID is required.");
  }
  if (!dateOfBirth.trim()) {
    throw new Error("Date of birth is required.");
  }
}

export function validateDateOfBirth(dateOfBirth: string): void {
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!datePattern.test(dateOfBirth)) {
    throw new Error("Date of birth must be in mm/dd/yyyy format.");
  }
  const [month, day, year] = dateOfBirth
    .split("/")
    .map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error("Invalid date of birth.");
  }
}