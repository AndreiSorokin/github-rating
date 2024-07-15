import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';


const RepositoryItemBody = ({ item }) => {
   const styles = StyleSheet.create({
      container: {
         display: 'flex',
         flexDirection: 'row',
         justifyContent:'space-around',
         marginVertical: 10,
      }
   })

   const isLarge = (number: number) => {
      return number > 1000? `${(number / 1000).toFixed(1)}k` : number;
   }

  return (
    <View style={styles.container}>
      <Text>Stars: {isLarge(item.stargazersCount)}</Text>
      <Text>Forks: {isLarge(item.forksCount)}</Text>
      <Text>Rating: {isLarge(item.ratingAverage)}</Text>
      <Text>Reviews: {isLarge(item.reviewCount)}</Text>
    </View>
  )
}

export default RepositoryItemBody
