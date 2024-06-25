"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-contex";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { getCookie } from "cookies-next";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { AuthTextarea } from "@/components/auth/auth-textarea";
import { AuthInput } from '@/components/auth/auth-input';
import { UpdateBillingAddressSchema } from '@/validation/update-billing-address-schema';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/update-billing-address`;

interface UpdateShippingAddressFormValues {  
  address_line: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  type: 'billing';
  specified_in_order: false;
}

export const UpdateBillingAddressForm = () => {
  const router = useRouter();
  useProtectedRoute();
  const { billingAddress, setBillingAddress } = useAuth();

  const initialValues: UpdateShippingAddressFormValues = {
    address_line: billingAddress.address_line ? billingAddress.address_line : '',
    city: billingAddress.city ? billingAddress.city : '',
    state: billingAddress.state ? billingAddress.state : '',
    postal_code: billingAddress.postal_code ? billingAddress.postal_code : '',
    country: billingAddress.country ? billingAddress.country : '',
    type: 'billing',
    specified_in_order: false,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object(UpdateBillingAddressSchema)}
      onSubmit={async (values, actions) => {
        try {
          const response = await axios.put(URL, values, {
            headers: {
              Authorization: `Bearer ${getCookie("dracaena_access_token")}`,
            },
          });
          if (response.status === 200) {
            setBillingAddress({
              ...billingAddress,
              address_line: values.address_line,
              city: values.city,
              state: values.state,
              postal_code: values.postal_code,
              country: values.country,       
              type: 'billing',
              specified_in_order: false,      
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
        <AuthTextarea
          label="Billing Address"
          name="address_line"          
          obligatory
        /> 

        <AuthInput
          label='City'
          name='city'
        />

        <AuthInput
          label='State'
          name='state'
        />

        <AuthInput
          obligatory
          label='Postal Code'
          name='postal_code'
        />

        <AuthInput
          obligatory
          label='Country'
          name='country'
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