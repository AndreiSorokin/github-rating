import { Pressable, Text, TextInput, View, StyleSheet, Platform } from "react-native";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSignIn } from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
   username: yup
      .string()
      .min(3, 'Username must be at least 1 character long')
      .required('Username is required'),
   password: yup
      .string()
      .min(3, 'Password must be at least 3 characters long')
      .required('Password is required')
})

const SignIn = () => {
   const [signIn] = useSignIn();
   const styles = StyleSheet.create({
      container: {
         backgroundColor: '#F8F8F8',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
      },
      username: {
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
      password: {
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
         color: '#d73a4a',
         marginTop: 5,
         fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
         })
      }
   })

   const onSubmit = async (values) => {
      const { username, password } = values;

      try {
         const { data } = await signIn({ username, password });
      } catch (e) {
         console.log(e);
      }
   };

   const formik = useFormik({
      initialValues: {
         username: '',
         password: ''
      },
      onSubmit,
      validationSchema
   })

   return (
      <View style={styles.container}>
         {formik.touched.username && formik.errors.username ? (
            <View style={{ width: '90%' }}>
               <TextInput style={{...styles.username, borderColor: '#d73a4a', color: '#d73a4a'}} placeholder="username" onChange={formik.handleChange('username')} value={formik.values.username}></TextInput>
               <Text style={styles.errorMessage}>{formik.errors.username}</Text>
            </View>
         ) : (
            <TextInput style={styles.username} placeholder="username" onChange={formik.handleChange('username')} value={formik.values.username}></TextInput>
         )}
         {formik.touched.password && formik.errors.password ? (
            <View style={{width: "90%"}}>
               <TextInput style={{...styles.password, borderColor: '#d73a4a', color: "'#d73a4a'"}} placeholder="password" onChange={formik.handleChange('password')} value={formik.values.password} secureTextEntry></TextInput>
               <Text style={styles.errorMessage}>{formik.errors.password}</Text>
            </View>
         ) : (
            <TextInput style={styles.password} placeholder="password" onChange={formik.handleChange('password')} value={formik.values.password} secureTextEntry></TextInput>
         )}
         <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.signin}>Sign in</Text>
         </Pressable>
      </View>
   );
};

export default SignIn;