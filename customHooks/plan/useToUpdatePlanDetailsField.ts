import client from "../../gqlLib/client";
import { GET_PLAN } from "../../graphql/Planner";
import { useAppSelector } from "../../redux/hooks";

type Props = (id: string, obj: object) => void;

const useToUpdatePlanDetailsField = () => {
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
  const handleUpdatePlanDetailsField: Props = (id = "", obj = {}) => {
    const { getAPlan } = client.readQuery({
      query: GET_PLAN,
      variables: { planId: id, token: "", memberId },
    });

    client.writeQuery({
      query: GET_PLAN,
      variables: { planId: id },
      data: {
        getAPlan: {
          ...getAPlan,
          plan: { ...getAPlan?.plan, ...obj },
        },
      },
    });
  };

  return handleUpdatePlanDetailsField;
};

export default useToUpdatePlanDetailsField;
