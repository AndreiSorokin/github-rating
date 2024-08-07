import React from 'react'
import { Pressable, Text, TextInput, View, StyleSheet, Platform } from "react-native";

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

import { useSignIn } from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "username should be at least 5 characters long")
    .required("username is required"),
  password: yup
    .string()
    .min(5, "password should be at least 5 characters long")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Password confirmation is required"),
})

const SignUp = () => {
  const styles = StyleSheet.create({
    container: {
       backgroundColor: '#F8F8F8',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
    },
    input: {
       height: 50,
       marginTop: 20,
       width: '90%',
       borderWidth: 1,
       borderColor: '#000',
       borderRadius: 5,
       fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Roboto',
          default: 'System'
       })
    },
    button: {
       height: 50,
       marginTop: 20,
       width: '90%',
       backgroundColor: '#0366d6',
       borderRadius: 5,
       justifyContent: 'center',
       alignItems: 'center',
       fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Roboto',
          default: 'System'
       })
    },
    signin: {
       color: 'white',
       fontSize: 18,
       fontWeight: 'bold',
       fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Roboto',
          default: 'System'
       })
    },
    errorMessage: {
       color: 'red',
       marginTop: 5,
       fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Roboto',
          default: 'System'
       })
    }
  })

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const { username, password } = createUser;


  const onSubmit = async () => {
  try {
    await createUser({
      variables: {
        user: {
          username: formik.values.username,
          password: formik.values.password,
        }
      }
    });
    const { username, password } = formik.values;
    await signIn({ username, password });
    navigate(`/`);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema
  })
  return (
    <View style={styles.container}>
      {formik.touched.username && formik.errors.username ? (
        <View style={{ width: '90%' }}>
          <TextInput
            style={{ ...styles.input, borderColor: 'red', color: 'red' }}
            placeholder="username"
            onChangeText={formik.handleChange('username')}
            value={formik.values.username}
          />
          <Text style={styles.errorMessage}>{formik.errors.username}</Text>
      </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={formik.handleChange('username')}
          value={formik.values.username}
        />
      )}
      {formik.touched.password && formik.errors.password ? (
        <View style={{ width: '90%' }}>
          <TextInput
            style={{ ...styles.input, borderColor: 'red', color: 'red' }}
            placeholder="password"
            onChangeText={formik.handleChange('password')}
            value={formik.values.password}
          />
          <Text style={styles.errorMessage}>{formik.errors.password}</Text>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={formik.handleChange('password')}
          value={formik.values.password}
        />
      )}
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <View style={{ width: '90%' }}>
          <TextInput
            style={{ ...styles.input, borderColor: 'red', color: 'red' }}
            placeholder="confirm password"
            secureTextEntry
            onChangeText={formik.handleChange('confirmPassword')}
            value={formik.values.confirmPassword}
          />
          <Text style={styles.errorMessage}>{formik.errors.confirmPassword}</Text>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry
          onChangeText={formik.handleChange('confirmPassword')}
          value={formik.values.confirmPassword}
        />
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.signin}>Sign up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp
