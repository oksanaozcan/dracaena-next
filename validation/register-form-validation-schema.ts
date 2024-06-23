import * as Yup from 'yup';

export const RegisterFormValidationSchema = {
  name: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Required'),     
  email: Yup.string()
    .email('Invalid email address')
    .required('Required')
    .test(
    "Validate Email",         
    (value) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(value).toLowerCase())
    }),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .required('Required'),  
    // .matches(/[a-z]/, 'Password requires a lowercase letter')
    // .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Must match "password" field value')
    .required('Required'),
  birthday: Yup.date()
    .nullable()
    .max(new Date(), 'Birthday cannot be in the future'),
  newsletter_confirmed: Yup.boolean()
    .default(false),
}