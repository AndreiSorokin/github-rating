import { useNavigate } from 'react-router-native';
import React from 'react';
import { useSignIn } from "../hooks/useSignIn";
import SignInContainer from "./SignInContainer";

const SignIn = () => {
   const [signIn] = useSignIn();
   const navigate = useNavigate()

   const onSubmit = async (values, { setSubmitting, setErrors }) => {
      const { username, password } = values;
    
      try {
        const result = await signIn({ username, password });
        if (result && result.data) {
          navigate('/repositories');
        } else {
          setErrors({ submit: 'Invalid username or password' });
        }
      } catch (e) {
        console.log(e);
        setErrors({ submit: 'Invalid username or password' });
      } finally {
        setSubmitting(false);
      }
    };

   return (
      <SignInContainer onSubmit={onSubmit}/>
   );
};

export default SignIn;