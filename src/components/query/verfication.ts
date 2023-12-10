import gql from "graphql-tag";

export const verificationGql = gql`
  query verification($email: String!, $token: String!) {
    verification(email: $email, token: $token) {
      res
    }
  }
`;