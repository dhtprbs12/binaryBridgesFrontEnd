import gql from "graphql-tag";

export const startSubscribeGql = gql`
  mutation startSubscribe($email: String!) {
    startSubscribe(email: $email) {
      success
    }
  }
`;