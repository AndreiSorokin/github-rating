import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'

const AppBarTab = () => {
   const styles = StyleSheet.create({
      container: {
         paddingTop: 50,
         paddingLeft: 15
      },
      text: {
         color: '#e1e4e8',
         fontSize: 24,
         fontWeight: 'bold',
      }
   });
  return (
    <View style ={styles.container}>
      <Pressable>
         <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  )
}

export default AppBarTab
