import React from 'react';
import { View, Button } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {

  const handleOpenGitHub = () => {
    const url = repository.url;
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