import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from './RepositoryItem';
import React from 'react';
import ListHeader from './ListHeader.jsx';

const styles = StyleSheet.create({
   separator: {
      height: 10,
   },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
   renderHeader = () => {
      const { searchKeyword, setSearchKeyword, orderBy, orderDirection, setOrderBy, setOrderDirection } = this.props;
      return (
         <ListHeader
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            orderBy={orderBy}
            orderDirection={orderDirection}
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
         />
      );
   };

   renderItem = ({ item }) => <RepositoryItem item={item} />;

   render() {
      const { repositories } = this.props;
      const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

      return (
         <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader}
         />
      );
   }
}

export default RepositoryListContainer;