import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);

  const fetchRepositories = async () => {
    const response = await fetch('http://192.168.1.134:8081/api/repositories')
    const json = await response.json();

    console.log(json);

    setRepositories(json);
  }

  useEffect(() => {
    fetchRepositories();
  }, []);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  //  const renderItem = ({ item }) => <RepositoryItem item={item} />
   
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