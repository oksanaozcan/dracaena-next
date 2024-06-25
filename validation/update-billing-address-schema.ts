import * as Yup from 'yup';

export const UpdateBillingAddressSchema = {
  address_line: Yup.string()
    .required()
    .max(200, 'Must be 200 characters or less'), 
  city: Yup.string()
    .nullable()
    .max(100, 'Must be 100 characters or less'),
  state: Yup.string()
    .nullable()
    .max(100, 'Must be 100 characters or less'),
  postal_code: Yup.string()
    .required()
    .max(20, 'Must be 20 characters or less'),
  country: Yup.string()
    .required()
    .max(100, 'Must be 100 characters or less'),
};