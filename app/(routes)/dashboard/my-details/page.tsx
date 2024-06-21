import { PersonalDetailsCard } from "../_components/personal-details-card";

export const revalidate = 0;

interface MyDetailsPageProps {
  params: {}
}

const MyDetailsPage: React.FC<MyDetailsPageProps> = ({
  params,
}) => {
  return (
    <>
      <PersonalDetailsCard/>     
    </>
  )
}

export default MyDetailsPage;
