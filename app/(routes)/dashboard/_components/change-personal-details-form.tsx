"use client";

import { AuthCheckbox } from "@/components/auth/auth-checkbox";
import { AuthInput } from "@/components/auth/auth-input";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-contex";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { getCookie } from "cookies-next";
import { UpdateFormValidationSchema } from "@/validation/update-personal-details-schema";
import { useProtectedRoute } from "@/hooks/use-protected-route";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-personal-details`;

interface UpdatePersDetailsFormValues {  
  birthday: string;
  newsletter_confirmed: boolean;
}

export const ChangePersonalDetailsForm = () => {
  const router = useRouter();
  useProtectedRoute();
  const { customer, setCustomer } = useAuth();

  const initialValues: UpdatePersDetailsFormValues = {
    birthday: customer.birthday ? customer.birthday : '',
    newsletter_confirmed: customer.newsletter_confirmed === 1,
  };

  return (
    <>
      <h1>Change your personal details</h1>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object(UpdateFormValidationSchema)}
        onSubmit={async (values, actions) => {
          try {
            const response = await axios.put(URL, values, {
              headers: {
                Authorization: `Bearer ${getCookie("dracaena_access_token")}`,
              },
            });
            if (response.status === 200) {
              setCustomer({
                ...customer,
                birthday: values.birthday,
                newsletter_confirmed: values.newsletter_confirmed ? 1 : 0,
              });
              router.push('/dashboard/my-details')
            }
          } catch (error) {
            console.error('Update failed', error);
            actions.setFieldError('general', 'Update failed. Please try again.');
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">      
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
    </>
  )
}