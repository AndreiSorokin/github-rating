import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from './RepositoryItem';
import React, { useCallback } from 'react'
import ListHeader from './ListHeader.jsx';

const styles = StyleSheet.create({
   separator: {
      height: 10,
   },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, orderBy, orderDirection, setOrderBy, setOrderDirection, searchKeyword, setSearchKeyword  }) => {
   const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

   const renderItem = ({ item }) => <RepositoryItem item={item} />

   const renderHeader = useCallback(() => (
      ListHeaderComponent=
         <ListHeader
         searchKeyword={searchKeyword}
         setSearchKeyword={setSearchKeyword}
         orderBy={orderBy}
         orderDirection={orderDirection}
         setOrderBy={setOrderBy}
         setOrderDirection={setOrderDirection}
      />
   ), [searchKeyword, setSearchKeyword, orderBy, orderDirection, setOrderBy, setOrderDirection])

   return (
      <FlatList
         data={repositoryNodes}
         ItemSeparatorComponent={ItemSeparator}
         renderItem = {renderItem}
         keyExtractor={item => item.id}
         ListHeaderComponent={renderHeader}
      />
   )
}

export default RepositoryListContainer