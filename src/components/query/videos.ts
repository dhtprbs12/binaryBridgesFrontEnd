import gql from "graphql-tag";

export const videosGql = gql`
  query videos {
    videos {
      id
      videoName
      fileName
      takeaways
      duration
      sequence
    }
  }
`;