import React from 'react';
import { View, StyleSheet} from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemBody from './RepositoryItemBody';
import { Link } from 'react-router-native';

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
  });

  return (
    <Link to={`/${item.id}`}>
      <View testID="repositoryItem" style={styles.container}>
        <RepositoryItemHeader item={item}/>
        <RepositoryItemBody item={item} />
      </View>
    </Link>
  );
};

export default RepositoryItem;