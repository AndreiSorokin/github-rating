import { useMutation } from '@apollo/client';

import { USER_LOGIN } from '../graphql/mutations';
import AuthStorage from "../utils/authStorage"

export const useSignIn = () => {
   const [mutate, result] = useMutation(USER_LOGIN);
   const authStorage = new AuthStorage();

   const signIn = async ({ username, password }) => {
      try {
         const response = await mutate({
            variables: {
               credentials: {
                  username,
                  password
               }
            }
         })
         await authStorage.setAccessToken(response.data.authenticate.accessToken)
         return response;
      } catch (error) {
         console.error(error);
      }
   };

   return [ signIn, result ];
}