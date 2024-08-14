import React, { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { View, Text, StyleSheet, FlatList, Pressable, Platform, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import { GET_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

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
    buttonsContainer: {
      flexDirection: "column",
      margin: 10
    },
    viewButton: {
      backgroundColor: "#0366d6",
      padding: 10,
      borderRadius: 5,
    },
    deleteButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginTop: 5
    },
    buttonText: {
      fontSize: 16,
      textAlign: "center",
      color: "white",
      fontFamily: Platform.select({
        ios: 'Arial',
        android: 'Roboto',
        default: 'System'
      })
    }
  });

  const navigate = useNavigate();
  const client = useApolloClient();
  const [fetchingMore, setFetchingMore] = useState(false);

  const { data, loading, fetchMore, refetch } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading...</Text>;
  if (data.me.reviews.edges.length === 0) {
    return <Text>No reviews yet</Text>;
  }

  const handleViewRepository = (repositoryId) => {
    navigate(`/${repositoryId}`)
  };

  const handleDeleteReview = async (id) => {
    Alert.alert(
      "Delete this review?",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteReview({
                variables: { id },
              });
              refetch();
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          }
        }
      ]
    );
  }

  const handleEndReached = async () => {
    if (fetchingMore || !data.me.reviews.pageInfo.hasNextPage) return;

    setFetchingMore(true);
    try {
      await fetchMore({
        variables: {
          after: data.me.reviews.pageInfo.endCursor,
        },
      });
    } catch (error) {
      console.error('Error fetching more reviews:', error);
    } finally {
      setFetchingMore(false);
    }
  };

  const renderItem = ({ item: { node: review } }) => (
    <View key={review.id} style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{review.user.username}</Text>
        <Text style={styles.text}>{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => handleViewRepository(review.repositoryId)} style={styles.viewButton}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable onPress={() => handleDeleteReview(review.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data.me.reviews.edges}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default UserReviews;