"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValidationSchema } from "@/validation/register-form-validation-schema";
import { AuthInput } from './auth-input';

interface RegisterFormValues {
  name: string;
  email: string;
}

export const RegisterForm = () => {
  return ( 
    <Formik 
      initialValues={{
        name: '', 
        email: '',
      }}   
      validationSchema={ Yup.object(RegisterFormValidationSchema)}
      onSubmit={
        (values: RegisterFormValues) => {
          alert(JSON.stringify(values, null, 2));
        }
      }
    >
      <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <AuthInput
          label="Name"
          name="name"
          type="text"
          placeholder="Oksana Ozcan"
        />

        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="oksanaozcan@example.com"
        />      

        <button 
          type="submit"       
        >Submit</button>    

        <button 
          type="reset"        
        >Reset Form</button>

      </Form>     
    </Formik>
  )
} 