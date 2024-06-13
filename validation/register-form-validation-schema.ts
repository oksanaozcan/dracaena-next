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
}