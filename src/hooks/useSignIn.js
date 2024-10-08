import { useMutation, useApolloClient } from '@apollo/client';


import { USER_LOGIN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

export const useSignIn = () => {
   const [mutate, result] = useMutation(USER_LOGIN);
   const authStorage = useAuthStorage();
   const apolloClient = useApolloClient();


   const signIn = async ({ username, password }) => {
      try {
         const data = await mutate({
            variables: {
               credentials: {
                  username,
                  password
               }
            }
         })
         await authStorage.setAccessToken(data.data.authenticate.accessToken)
         await apolloClient.resetStore();
         return data;
      } catch (error) {
         console.error(error);
      }
   };

   return [ signIn, result ];
}