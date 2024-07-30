import { gql } from '@apollo/client';

export const GET_USER = gql`
   query {
      me 
      {
         id
         username
      }
   }
`

export const GET_SINGLE_REPOSITORY = gql`
   query ($id: ID!) {
      repository(id: $id) {
         id
         fullName
         url
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