import React from 'react'
import { Pressable, StyleSheet, View, Text, ScrollView, SafeAreaView, Platform } from 'react-native'
import { Link } from 'react-router-native';

const AppBarTab = () => {
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
                  <Link to="signin">
                     <Text style={styles.text}>Sign in</Text>
                  </Link>
               </Pressable>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default AppBarTab
