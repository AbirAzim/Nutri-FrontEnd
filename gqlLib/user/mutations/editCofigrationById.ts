import { gql } from "@apollo/client";

const EDIT_CONFIGRATION_BY_ID = gql`
  mutation Mutation($data: EditConfiguiration!) {
    editConfifuirationById(data: $data)
  }
`;
export default EDIT_CONFIGRATION_BY_ID;
