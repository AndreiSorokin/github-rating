import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';


const RepositoryItemBody = ({ item }) => {
   const styles = StyleSheet.create({
      container: {
         display: 'flex',
         flexDirection: 'row',
         justifyContent:'space-around',
         marginVertical: 10,
      },
      text: {
         fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
         })
      },
   })

   const isLarge = (number) => {
      return number > 1000? `${(number / 1000).toFixed(1)}k` : number;
   }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stars: {isLarge(item.stargazersCount)}</Text>
      <Text style={styles.text}>Forks: {isLarge(item.forksCount)}</Text>
      <Text style={styles.text}>Rating: {isLarge(item.ratingAverage)}</Text>
      <Text style={styles.text}>Reviews: {isLarge(item.reviewCount)}</Text>
    </View>
  )
}

export default RepositoryItemBody
