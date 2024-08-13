import { gql } from '@apollo/client';

export const CREATE_USER = gql`
   mutation CreateUser($user: CreateUserInput!) {
      createUser(user: $user) {
         createdAt
         id
         reviewCount
         reviews(first: 10) {
            edges {
               node {
                  id
                  text
                  rating
                  createdAt
               }
            }
         }
         username
      }
   }
`

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

export const DELETE_REVIEW = gql`
   mutation DeleteReview($id: ID!) {
      deleteReview(id: $id)
   }
`