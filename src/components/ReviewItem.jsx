import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GET_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';

const ReviewItem = ({ review }) => {
   const { id } = useParams();
   const { data, loading, error } = useQuery(GET_REVIEWS, {
      variables: { id },
   });

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

   console.log("Query Data: ", data);

   if (loading) return <Text>Loading...</Text>;
   if (error) {
      console.error("GraphQL Error: ", error);
      return <Text>Error: {error.message}</Text>;
   }

   const edges = data?.repository?.reviews?.edges || [];
   const isDefined = edges.length > 0;

   return (
      isDefined ? (
         edges.map(({ node: r }) => (
            <View style={styles.container} key={r.id}>
               <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{r.rating}</Text>
               </View>
               <View style={styles.infoContainer}>
                  <Text style={styles.text}>{r.user.username}</Text>
                  <Text style={styles.text}>{new Date(r.createdAt).toLocaleDateString()}</Text>
                  <Text style={styles.text}>{r.text}</Text>
               </View>
            </View>
         ))
      ) : (
         <Text style={styles.container}>No reviews yet</Text>
      )
   );
};

export default ReviewItem;