import { gql } from '@apollo/client';

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
               lang
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
`