import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY, GET_REPOSITORIES, GET_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

const SingleRepository = () => {
  const { id } = useParams();
  const { data: repositoriesData, loading: repositoriesLoading, error: repositoriesError } = useQuery(GET_REPOSITORIES);
  const { data, loading, error } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
  });
  const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  if (repositoriesLoading || loading || reviewLoading) {
    return <Text>Loading...</Text>;
  }

  if (repositoriesError || error || reviewError) {
    return <Text>Error: {repositoriesError?.message || error.message}</Text>;
  }

  const repository = repositoriesData?.repositories?.edges?.find(repo => repo.node.id === id)?.node;

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  console.log('repositoriesData', repository);

  const reviews = reviewData?.repository?.reviews?.edges?.map(edge => edge.node);
  console.log('REVIEW DATA', reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ListEmptyComponent={() => <Text>No reviews yet</Text>}
    />
  );
};

export default SingleRepository;