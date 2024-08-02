import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
   mutation CreateReview () {
      createReview() {
         
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