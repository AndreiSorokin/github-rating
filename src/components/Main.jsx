import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from'react-router-native';
import React from 'react';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryInfo from './RepositoryInfo';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/:id" element={<SingleRepository/>}/>
        <Route path="/createReview" element={<CreateReview/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </View>
  );
};

export default Main;