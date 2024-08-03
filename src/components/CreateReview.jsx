import React from 'react'
import { Pressable, TextInput, View, Text, StyleSheet, Platform } from 'react-native'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const validationSchema = yup.object().shape({
   username: yup
      .string()
      .required('Username is required'),
   repositoryName: yup
      .string()
      .required('Repository name is required'),
   rating: yup
      .number()
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100')
      .required('Rating is required'),
   review: yup
      .string()
})

const CreateReview = () => {
   const styles = StyleSheet.create({
      container: {
         backgroundColor: '#F8F8F8',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
      },
      inputs: {
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

   const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW)

   const onSubmit = async () => {
      try {
         const result = await createReview({
            variables: {
               review: {
                  username: formik.values.username,
                  repositoryName: formik.values.repositoryName,
                  rating: formik.values.rating,
                  review: formik.values.review
               }
            }
         })
         console.log('RESULT: ', result)
      } catch (error) {
         console.error('Error creating review:', error);
      }
   }

   const formik = useFormik({
      initialValues: {
         username: '',
         repositoryName: '',
         rating: '',
         review: ''
      },
      validationSchema,
      onSubmit
   })
  return (
    <View style={styles.container}>
      {formik.touched.username && formik.errors.username ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='repository owner name'
               onChangeText={formik.handleChange('username')}
               value={formik.values.username}
            />
            <Text style={styles.errorMessage}> {formik.errors.username} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='repository name'
            onChangeText={formik.handleChange('username')}
            value={formik.values.username}
         />
      )}
      {formik.touched.repositoryName && formik.errors.repositoryName ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='repositoryName'
               onChangeText={formik.handleChange('repositoryName')}
               value={formik.values.repositoryName}
            />
            <Text style={styles.errorMessage}> {formik.errors.repositoryName} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='repositoryName'
            onChangeText={formik.handleChange('repositoryName')}
            value={formik.values.repositoryName}
         />
      )}
      {formik.touched.rating && formik.errors.rating ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='rating'
               onChangeText={formik.handleChange('rating')}
               value={formik.values.rating}
            />
            <Text style={styles.errorMessage}> {formik.errors.rating} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='rating'
            onChangeText={formik.handleChange('rating')}
            value={formik.values.rating}
         />
      )}
      {formik.touched.review && formik.errors.review ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='review'
               onChangeText={formik.handleChange('review')}
               value={formik.values.review}
            />
            <Text style={styles.errorMessage}> {formik.errors.review} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='review'
            onChangeText={formik.handleChange('review')}
            value={formik.values.review}
         />
      )}
      {formik.errors.submit && (
         <Text style={styles.errorMessage}>{formik.errors.submit}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
         <Text>Create a review</Text>
      </Pressable>
    </View>
  )
}

export default CreateReview
