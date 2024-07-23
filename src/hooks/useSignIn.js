import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../graphql/mutations';

export const useSignIn = () => {
   const [mutate, result] = useMutation(USER_LOGIN);

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
         console.log(response)
         return response;
      } catch (error) {
         console.error(error);
      }
   };

   return [ signIn, result ];
}