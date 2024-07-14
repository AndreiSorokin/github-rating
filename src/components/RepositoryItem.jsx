import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RepositoryItem = ({ item }) => {
   const styles = StyleSheet.create({
      container: {
         backgroundColor: 'white',
      },
      ownerAvatarUrl: {
         width: 50,
         height: 50
      },
      fullName: {

      },
      description: {

      },
      language: {},
      stars: {},
      forks: {},
      rating: {},
      review: {},
   })
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.ownerAvatarUrl} />
      <Text>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
    </View>
  );
};

export default RepositoryItem;