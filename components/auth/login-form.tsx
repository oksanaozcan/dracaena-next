"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginFormValidationSchema } from '@/validation/login-form-validation-schema';
import { AuthInput } from './auth-input';
import { useAuth } from '@/context/auth-contex';
import { useProtectedRoute } from '@/hooks/use-protected-route';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  useProtectedRoute();
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object(LoginFormValidationSchema)}
      onSubmit={async (values: LoginFormValues, actions) => {
        try {
          await login(values.email, values.password);
        } catch (error) {
          console.error('Login failed', error);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit }) => ( // Use handleSubmit provided by Formik
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
      )}
    </Formik>
  );
};
