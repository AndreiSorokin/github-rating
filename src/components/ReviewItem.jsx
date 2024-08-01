import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewItem = ({ review }) => {
   if (!review) {
      return;
   }

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
      },
      rating: {
         fontSize: 20,
         fontWeight: "bold",
      },
      infoContainer: {
         flex: 1,
      },
      text: {
         marginBottom: 5,
      }
   });

   return (
      <View style={styles.container}>
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
};

export default ReviewItem;