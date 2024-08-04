import { gql } from '@apollo/client';

// export const CREATE_USER = gql`
//    mutation CreateUser($user: CreateUserInput!) {
//       createUser(user: $user) {

//       }
//    }
// `

export const CREATE_REVIEW = gql`
   mutation CreateReview($review: CreateReviewInput!) {
      createReview(review: $review) {
         id
         createdAt
         rating
         repository {
            id
            name
            ownerName
         }
         repositoryId
         text
         user {
            id
            username
         }
         userId
      }
   }
`;

export const USER_LOGIN = gql`
   mutation Authenticate($credentials: AuthenticateInput!) {
      authenticate(credentials: $credentials) {
         accessToken
         user {
            id
            username
         }
      }
   }
`