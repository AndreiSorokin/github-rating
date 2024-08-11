import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GET_USER } from '../graphql/queries';

const UserReviews = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    ratingContainer: {
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#0366d6",
      borderWidth: 1,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    rating: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#0366d6",
    },
    infoContainer: {
      flex: 1,
    },
    text: {
      marginBottom: 5,
    },
  });

  const { data, loading } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  });

  console.log(data)

   if (loading) return <Text>Loading...</Text>;
   if (data.me.reviews.edges.length === 0) {
      return <Text>No reviews yet</Text>;
   }
  data.me.reviews.edges.map(({ node: review }) => console.log(review));

  return (
    <ScrollView>
      {data.me.reviews.edges.map(({ node: review }) => {
        return (
          <View key={review.id} style={styles.container}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.text}>{review.user.username}</Text>
              <Text style={styles.text}>{new Date(review.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.text}>{review.text}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default UserReviews;