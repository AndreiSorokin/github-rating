import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    height: "100px",
    opacity: 0.8,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab/>
    </View>
  );
};

export default AppBar;