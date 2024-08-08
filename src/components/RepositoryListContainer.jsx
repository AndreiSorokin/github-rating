import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from './RepositoryItem';
import React from 'react'
import OrderSelector from './OrderSelector';

const styles = StyleSheet.create({
   separator: {
      height: 10,
   },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, orderBy, orderDirection, setOrderBy, setOrderDirection }) => {
   const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

   const renderItem = ({ item }) => <RepositoryItem item={item} />
   console.log(repositoryNodes)
   return (
      <FlatList
         data={repositoryNodes}
         ItemSeparatorComponent={ItemSeparator}
         renderItem = {renderItem}
         keyExtractor={item => item.id}
         ListHeaderComponent={
            <OrderSelector
               orderBy={orderBy}
               orderDirection={orderDirection}
               setOrderBy={setOrderBy}
               setOrderDirection={setOrderDirection}
            />
         }
      />
   )
}

export default RepositoryListContainer