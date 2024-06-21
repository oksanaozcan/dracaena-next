import { redirect } from "next/navigation";
import { ChangePersonalDetailsForm } from "../../_components/change-personal-details-form";

export const revalidate = 0;

interface UpdateDetailsPageProps {
  params: {}
}
const UpdateDetailsPage: React.FC<UpdateDetailsPageProps> = async ({
  params,
}) => {   

  return (
    <>
      <ChangePersonalDetailsForm/>   
    </>
  )
}

export default UpdateDetailsPage;