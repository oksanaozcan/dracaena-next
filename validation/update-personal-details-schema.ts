import * as Yup from 'yup';

export const UpdateFormValidationSchema = {
  birthday: Yup.date()
    .nullable()
    .max(new Date(), 'Birthday cannot be in the future'),
  newsletter_confirmed: Yup.boolean()
    .default(false),
};