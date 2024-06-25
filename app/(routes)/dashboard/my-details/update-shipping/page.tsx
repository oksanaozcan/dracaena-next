import { UpdateShippingAddressForm } from "../../_components/shipping-address-form";

export const revalidate = 0;

interface UpdateShippingPageProps {
  params: {}
}

const UpdateShippingPage: React.FC<UpdateShippingPageProps> = async ({
  params,
}) => {  

  return (
    <>
     <h1>Add shipping address</h1>
     <UpdateShippingAddressForm/>
    </>
  )
}

export default UpdateShippingPage;