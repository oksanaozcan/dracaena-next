import { UpdateBillingAddressForm } from "../../_components/billing-address-form";

export const revalidate = 0;

interface UpdateBillingPageProps {
  params: {}
}

const UpdateBillingPage: React.FC<UpdateBillingPageProps> = async ({
  params,
}) => {   

  return (
    <>    
    <h1>Add billing address</h1>       
    <UpdateBillingAddressForm/>             
    </>
  )
}

export default UpdateBillingPage;