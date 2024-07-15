import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { useFormik } from 'formik';


const SignIn = () => {
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
         borderRadius: 5
      },
      password: {
         height: 50,
         marginTop: 20,
         width: '90%',
         borderWidth: 1,
         borderColor: '#000',
         borderRadius: 5
      },
      button: {
         height: 50,
         marginTop: 20,
         width: '90%',
         backgroundColor: '#0366d6',
         borderRadius: 5,
         justifyContent: 'center',
         alignItems: 'center',
      },
      signin: {
         color: 'white',
         fontSize: 18,
         fontWeight: 'bold'
      }
   })
   const formik = useFormik({
      initialValues: {
         username: '',
         password: ''
      },
      onSubmit: values => {
         console.log('Sign-in', values);
      }
   })

   return (
      <View style={styles.container}>
         <TextInput style={styles.username} placeholder="username" onChange={formik.handleChange('username')} value={formik.values.username}></TextInput>
         <TextInput style={styles.password} placeholder="password" onChange={formik.handleChange('password')} value={formik.values.password} secureTextEntry></TextInput>
         <Pressable style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.signin}>Sign in</Text>
         </Pressable>
      </View>
   );
};

export default SignIn;