import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const { apolloUri } = Constants.expoConfig.extra;
const httpLink = createHttpLink({
   uri: apolloUri,
   headers: {
      'Content-Type': 'application/json'
    }
})

const createApolloClient = (authStorage) => {
   const authLink = setContext(async(_, { headers }) => {
      try {
         const accessToken = await authStorage.getAccessToken();
         return {
            headers: {
               ...headers,
               authorization: accessToken? `Bearer ${accessToken}` : '',
            },
         };
      } catch (e) {
         console.log('createApolloClient: ', e)
         return { headers };
      }
   });

   const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            repositories: relayStylePagination(),
          },
        },
    
        Repository: {
          fields: {
            reviews: relayStylePagination(),
          },
        },
      },
    });

   return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: cache,
   });
};

export default createApolloClient;