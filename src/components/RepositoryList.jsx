import { FlatList, View, StyleSheet, Text } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log(repositories)

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

   const renderItem = ({ item }) => <RepositoryItem item={item} />
   
   return (
      <FlatList
         data={repositoryNodes}
         ItemSeparatorComponent={ItemSeparator}
         renderItem = {renderItem}
         keyExtractor={item => item.id}
      />
   );
};

export default RepositoryList;