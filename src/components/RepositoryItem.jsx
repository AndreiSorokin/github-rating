import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemBody from './RepositoryItemBody';

const RepositoryItem = ({ item }) => {
   const styles = StyleSheet.create({
      container: {
         backgroundColor: 'white',
      },
   });

  return (
    <View style={styles.container}>
      <RepositoryItemHeader item={item}/>
      <RepositoryItemBody item={item} />
    </View>
  );
};

export default RepositoryItem;