import gql from "graphql-tag";

export const createContactGql = gql`
  mutation createContact($name: String!, $email: String!, $message: String!) {
    createContact(name: $name, email: $email, message: $message) {
      success
    }
  }
`;