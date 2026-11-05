# Job Application Form

This project is a five-step job application form. It uses React, TypeScript, React Hook Form, Zod, and Tailwind CSS.

## Run the project

You need Node.js and npm installed.

```bash
npm install
npm run dev
```

To check the code and create a production build, run:

```bash
npm run lint
npm run build
```

TypeScript strict mode is enabled in `tsconfig.app.json`.

## Schema files

All application rules are in `src/schemas/applicationSchema.ts`. This file has schemas for personal details, education, experience, and application details. The main schema combines them.

The form data type is made from the schema with `z.infer`. The form input type uses `z.input` because the values entered before validation can differ from the validated values.

## Validation mode

The form uses `onTouched`. This means a field shows an error after the user has focused on it and left it. This avoids showing errors before the user has tried to fill in the field.

## Form state

One `useForm` instance is created in `src/features/job-application/JobApplicationWizard.tsx`. `FormProvider` shares its methods with the step components. The steps read and update the same form values, so values stay in the form when the user moves back or forward. `shouldUnregister: false` keeps values for fields that are temporarily hidden. Form values are not copied into another store.

## Avoiding extra renders

- Native inputs use React Hook Form's `register`, so typing does not update React state for every keystroke.
- `useWatch` is used only in `ExperienceFieldsByType` to watch the fresher or experienced choice. This keeps that subscription out of the whole step.
- Each reusable field checks its own error instead of making the wizard watch every field value.

## Mock submission

`src/services/mockApplicationApi.ts` waits about 1.5 seconds and returns one of three results: success, a Position field error, or a server error. Choose the result on the Review step to try each case.

## Not completed

- The GitHub upload, branch, and pull request have not been created.
- Screenshots or a screen recording of the complete flow have not been added.
- Email status updates have not been sent.
