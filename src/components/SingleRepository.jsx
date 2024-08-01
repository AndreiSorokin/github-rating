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
  const { data: singleRepositoryData, loading: singleRepositoryLoading, error: singleRepositoryError } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id },
  });
  const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  if (repositoriesLoading || singleRepositoryLoading || reviewLoading) {
    return <Text>Loading...</Text>;
  }

  if (repositoriesError || singleRepositoryError || reviewError) {
    return <Text>Error: {repositoriesError?.message || singleRepositoryError?.message || reviewError.message}</Text>;
  }

  const repository = repositoriesData?.repositories?.edges?.find(repo => repo.node.id === id)?.node;
  const singleRepository = singleRepositoryData?.repository;

  if (!repository || !singleRepository) {
    return <Text>Repository not found</Text>;
  }

  const mergedRepository = {
    ...repository,
    ...singleRepository,
  };


  const reviews = reviewData?.repository?.reviews?.edges?.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={mergedRepository} />}
      ListEmptyComponent={() => <Text>No reviews yet</Text>}
    />
  );
};

export default SingleRepository;