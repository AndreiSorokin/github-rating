import { gql } from '@apollo/client';

export const GET_REVIEWS = gql`
   query ($id: ID!) {
  repository(id: $id) {
    id
    fullName
    reviews {
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
      }
    }
  }
}
`

export const GET_USER = gql`
   query getCurrentUser($includeReviews: Boolean = false) {
      me 
      {
         id
         username
         reviews @include(if: $includeReviews) {
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