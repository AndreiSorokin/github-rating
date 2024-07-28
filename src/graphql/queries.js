import { gql } from '@apollo/client';

export const GET_USER = gql`
   {
      me 
      {
         id
         username
      }
   }
`

export const GET_REPOSITORIES = gql`
   query {
      repositories {
         totalCount
         edges {
            node {
               id
               ownerAvatarUrl
               fullName
               description
               language
               forksCount
               stargazersCount
               ratingAverage
               reviewCount
            }
         }
            pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
         }
      }
   }
`;

export const GET_USERS = gql`
   {
      users {
         edges {
            node {
               username
            }
         }
      }
   }
`