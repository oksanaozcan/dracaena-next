"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValidationSchema } from "@/validation/register-form-validation-schema";
import { AuthInput } from './auth-input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthCheckbox } from './auth-checkbox';
import { useProtectedRoute } from '@/hooks/use-protected-route';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/register`;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  birthday: string;
  newsletter_confirmed: boolean;
}

export const RegisterForm = () => {
  // useProtectedRoute();
  const router = useRouter(); 

  return ( 
    <Formik 
      initialValues={{
        name: '', 
        email: '',
        password: '',
        confirm_password: '',
        birthday: '',
        newsletter_confirmed: false,
      }}   
      validationSchema={ Yup.object(RegisterFormValidationSchema)}
      onSubmit={ async (values: RegisterFormValues, actions) => {        
        try {
          const response = await axios.post(URL, values);        

          if (response.status === 201) {
            router.push('/auth/login');
          }

          //TODO: email verification implemeting

          console.log('Registration successful', response);
        } catch (error) {
          console.error('Registration failed', error);
          actions.setFieldError('general', 'Registration failed. Please try again.');
        } finally {
          actions.setSubmitting(false);
          console.log("finally block");
        }        
        }
      }     
    >     
      <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <AuthInput
          obligatory={true}
          label="Name"
          name="name"
          type="text"
          placeholder="Oksana Ozcan"
        />

        <AuthInput
          obligatory={true}
          label="Email"
          name="email"
          type="email"
          placeholder="oksanaozcan@example.com"
        />      

        <AuthInput
          obligatory={true}
          label="Password"
          name="password"
          type="password"
        />      

        <AuthInput
          obligatory={true}
          label="Confirm password"
          name="confirm_password"
          type="password"
        /> 

        <AuthInput
          label="Birthday"
          name="birthday"
          type="date"
        /> 

        <AuthCheckbox name='newsletter_confirmed'> &nbsp;
          I agree to receive newsletters.
        </AuthCheckbox>

        <div className='flex justify-between align-middle mt-4'>
          <button type='submit' className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
            Submit
          </button>

          <button type='reset' className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">
            Reset Form
          </button>
        </div>       

      </Form>     
    </Formik>      
  )
} 