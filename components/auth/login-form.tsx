"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginFormValidationSchema } from '@/validation/login-form-validation-schema';
import { AuthInput } from './auth-input';
import axios from 'axios';
import { setCookie,  hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/login`;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object(LoginFormValidationSchema)}
      onSubmit={async (values: LoginFormValues, actions) => {
        try {
          const response = await axios.post(URL, values);
          const { access_token } = response.data;

          const accessExpireDate = new Date(new Date().setDate(new Date().getDate() + 15));        

          setCookie('dracaena_access_token', access_token, {
            expires: accessExpireDate,
            // secure: true // uncomment for production https
          });
          
          if (hasCookie('dracaena_access_token')) {
            router.push('/') //TODO: after implementing middleware redirect to dashboard
          }

          console.log('Login successful', response);          
        } catch (error) {
          console.error('Login failed', error);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
        />

        <div className='flex justify-between align-middle mt-4'>
          <button type='submit' className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
