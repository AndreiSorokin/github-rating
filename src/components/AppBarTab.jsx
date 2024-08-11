import React from 'react'
import { Pressable, StyleSheet, View, Text, ScrollView, SafeAreaView, Platform } from 'react-native'
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBarTab = () => {
   const userData = useQuery(GET_USER);
   const user = userData?.data?.me
   const authStorage = useAuthStorage();
   const apolloClient = useApolloClient();

   const styles = StyleSheet.create({
      container: {
         paddingTop: 50,
         paddingHorizontal: 15,
         display: 'flex',
         flexDirection: 'row',
      },
      text: {
         color: '#e1e4e8',
         fontSize: 24,
         fontWeight: 'bold',
         paddingHorizontal: 15,
         fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
         })
      }
   });

   const signOut = async() => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
   }

   return (
      <SafeAreaView>
         <ScrollView horizontal>
            <View style ={styles.container}>
               <Pressable>
                  <Link to='/'>
                     <Text style={styles.text}>Repositories</Text>
                  </Link>
               </Pressable>
               <Pressable>
                  <Link to='/createReview'>
                     <Text style={styles.text}>Create a review</Text>
                  </Link>
               </Pressable>
               {user && (
                  <Pressable>
                     <Link to="/reviews">
                        <Text style={styles.text}>My reviews</Text>
                     </Link>
                  </Pressable>
   
               )}
               <Pressable>
                  <Link onPress={signOut} to="/signin">
                     {user === null
                        ? <Text style={styles.text}>Sign in</Text>
                        : <Text style={styles.text}>Sign out</Text>
                     }
                  </Link>
               </Pressable>
               {user === null && (
                  <Pressable>
                     <Link to="/signup">
                        <Text style={styles.text}>Sign up</Text>
                     </Link>
                  </Pressable>
               )}
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default AppBarTab
