import { gql } from '@apollo/client';

export const GET_REVIEWS = gql`
   query ($id: ID!, $after: String) {
      repository(id: $id) {
         id
         fullName
         reviews(
            first: 2,
            after: $after
         ) {
            edges {
               node {
                  id
                  text
                  rating
                  createdAt
                  user {
                     id
                     username
                  }
               }
               cursor
            }
            pageInfo {
               endCursor
               startCursor
               hasNextPage
            }
         }
      }
}
`

export const GET_USER = gql`
   query getCurrentUser($includeReviews: Boolean = false, $first: Int, $after: String) {
      me {
         id
         username
         reviews(first: $first, after: $after) @include(if: $includeReviews) {
            edges {
               node {
                  id
                  text
                  rating
                  createdAt
                  repositoryId
                  user {
                     id
                     username
                  }
               }
               cursor
            }
            pageInfo {
               endCursor
               hasNextPage
            }
         }
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
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, first: 10, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
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