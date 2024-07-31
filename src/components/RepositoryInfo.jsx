import React from 'react';
import { View, Text, Button } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY, GET_REPOSITORIES } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const RepositoryInfo = () => {
   const { id } = useParams();
   const { data: repositoriesData, loading: repositoriesLoading, error: repositoriesError } = useQuery(GET_REPOSITORIES);
   const { data: singleRepositoryData, loading: singleRepositoryLoading, error: singleRepositoryError } = useQuery(GET_SINGLE_REPOSITORY, {
      variables: { id },
   });

   if (repositoriesLoading || singleRepositoryLoading) return <View><Text>Loading...</Text></View>;
   if (repositoriesError) return <View><Text>Error: {repositoriesError.message}</Text></View>;
   if (singleRepositoryError) return <View><Text>Error: {singleRepositoryError.message}</Text></View>;

   const repository = repositoriesData.repositories.edges.find(repo => repo.node.id === id)?.node;




   const handleOpenGitHub = () => {
      const url = singleRepositoryData.repository.url;
      window.open(url, '_blank');
   };


   return (
      <View>
         <RepositoryItem item={repository} showGitHubButton={true} />
         <Button title="Open in GitHub" onPress={handleOpenGitHub} />
         <ReviewItem />
      </View>
   );
}

export default RepositoryInfo;