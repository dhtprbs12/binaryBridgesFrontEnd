import gql from "graphql-tag";

export const createFeedbackGql = gql`
  mutation createFeedback($email: String!, $videoId: String!, $rating: String!, $comment: String!) {
    createFeedback(email: $email, videoId: $videoId, rating: $rating, comment: $comment) {
      success
    }
  }
`;