import React from 'react'
import { Pressable, TextInput, View, Text, StyleSheet, Platform } from 'react-native'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
   ownerName: yup
      .string()
      .required('Owner name is required'),
   repositoryName: yup
      .string()
      .required('Repository name is required'),
   rating: yup
      .number()
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100')
      .required('Rating is required'),
   text: yup
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
   const navigate = useNavigate()

   const onSubmit = async () => {
      try {
         const result = await createReview({
            variables: {
               review: {
                  ownerName: formik.values.ownerName,
                  repositoryName: formik.values.repositoryName,
                  rating: parseInt(formik.values.rating, 10),
                  text: formik.values.text
               }
            }
         })
         console.log('RESULT: ', result)
         navigate(`/${result.data.createReview.repository.id}`)
      } catch (error) {
         console.error('Error creating review:', error);
      }
   }

   const formik = useFormik({
      initialValues: {
         ownerName: '',
         repositoryName: '',
         rating: '',
         text: ''
      },
      validationSchema,
      onSubmit
   })
  return (
    <View style={styles.container}>
      {formik.touched.ownerName && formik.errors.ownerName ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='repository owner name'
               onChangeText={formik.handleChange('ownerName')}
               value={formik.values.ownerName}
            />
            <Text style={styles.errorMessage}> {formik.errors.ownerName} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='repository owner name'
            onChangeText={formik.handleChange('ownerName')}
            value={formik.values.ownerName}
         />
      )}
      {formik.touched.repositoryName && formik.errors.repositoryName ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='repository name'
               onChangeText={formik.handleChange('repositoryName')}
               value={formik.values.repositoryName}
            />
            <Text style={styles.errorMessage}> {formik.errors.repositoryName} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='repository name'
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
               keyboardType='numeric'
            />
            <Text style={styles.errorMessage}> {formik.errors.rating} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='rating'
            onChangeText={formik.handleChange('rating')}
            value={formik.values.rating}
            keyboardType='numeric'
         />
      )}
      {formik.touched.text && formik.errors.text ? (
         <View>
            <TextInput
               style={styles.inputs}
               placeholder='review'
               onChangeText={formik.handleChange('text')}
               value={formik.values.text}
            />
            <Text style={styles.errorMessage}> {formik.errors.text} </Text>
         </View>
      ) : (
         <TextInput
            style={styles.inputs}
            placeholder='review'
            onChangeText={formik.handleChange('text')}
            value={formik.values.text}
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