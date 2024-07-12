"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RegisterFormValidationSchema } from "@/validation/register-form-validation-schema";
import { AuthInput } from './auth-input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthCheckbox } from './auth-checkbox';
import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import { useCookieConsent } from '@/context/cookies';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/register`;

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  birthday: string;
  newsletter_confirmed: boolean;
  cookie_consent: boolean;
}

export const RegisterForm = () => {
  const { hasConsented } = useCookieConsent();
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
        cookie_consent: hasConsented
      }}
      enableReinitialize
      validationSchema={Yup.object(RegisterFormValidationSchema)}
      onSubmit={async (values: RegisterFormValues, actions) => {
        try {
          const response = await axios.post(URL, values);

          if (response.status === 201) {
            router.push('/auth/login');
          }

          // TODO: email verification implementation
          // TODO: register with SMM (Google account) implementation

        } catch (error) {
          console.error('Registration failed', error);
          actions.setFieldError('general', 'Registration failed. Please try again.');
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className='text-center'>Required fields:</div>
          <AuthInput
            label="Name"
            name="name"
            type="text"
            placeholder="Oksana Ozcan"
            id='name'
          />

          <AuthInput
            label="Email"
            name="email"
            type="email"
            placeholder="oksanaozcan@example.com"
            id='email'
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            id='password'
          />

          <AuthInput
            label="Confirm password"
            name="confirm_password"
            type="password"
            id='confirm_password'
          />

          <AuthCheckbox name='cookie_consent' checked={values.cookie_consent} onChange={() => setFieldValue('cookie_consent', !values.cookie_consent)}> &nbsp;
            I consent to cookies.
          </AuthCheckbox>

          <Link href={'/cookies-policy'} className='text-blue-700'>
            <div className='flex items-center justify-start py-2'>Cookies Policy&nbsp;<LinkIcon size={15} /></div>
          </Link>

          <div className='text-center'>Not required fields:</div>

          <AuthInput
            label="Birthday"
            name="birthday"
            type="date"
            id='birthday'
          />

          <AuthCheckbox name='newsletter_confirmed'>
            &nbsp; I agree to receive newsletters.
          </AuthCheckbox>

          <div className='w-full h-4 border-b-2 mb-4'></div>

          <div className='flex justify-between align-middle mt-4'>
            <button type='submit' className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
              Submit
            </button>

            <button type='reset' className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">
              Reset Form
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}