"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValidationSchema } from "@/validation/register-form-validation-schema";
import { AuthInput } from './auth-input';
import axios from 'axios';
import { hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { env } from 'process';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/register`;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const RegisterForm = () => {
  const router = useRouter();

  return ( 
    <Formik 
      initialValues={{
        name: '', 
        email: '',
        password: '',
        confirm_password: '',
      }}   
      validationSchema={ Yup.object(RegisterFormValidationSchema)}
      onSubmit={ async (values: RegisterFormValues, actions) => {        
        try {
          const response = await axios.post(URL, values);
          const { access_token } = response.data;

          const expireDate = new Date(new Date().setDate(new Date().getDate() + 7));

          setCookie('dracaena_access_token', access_token, {expires: expireDate,
            // secure: true ///////////////// uncomment for production https
          });        
          
          if (hasCookie('dracaena_access_token')) {
            router.push('/')
          }

          console.log('Registration successful', response);
        } catch (error) {
          console.error('Registration failed', error);
        } finally {
          actions.setSubmitting(false);
          console.log("finally block");
        }        
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

        <AuthInput
          label="Password"
          name="password"
          type="password"
        />      

        <AuthInput
          label="Confirm password"
          name="confirm_password"
          type="password"
        /> 

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