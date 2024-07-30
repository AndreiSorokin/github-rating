import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native';

const RepositoryItemHeader = ({ item }) => {
   const styles = StyleSheet.create({
      container: {
         display: 'flex',
         padding: 10,
         flexDirection: 'row',
      },
      content: {
         display: 'flex',
         flexDirection: 'column',
         paddingLeft: 10,
      },
      ownerAvatarUrl: {
         width: 50,
         height: 50
      },
      fullName: {
         fontWeight: 'bold',
         fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
         })
      },
      description: {
         color: '#666',
         marginTop: 5,
         fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
         })
      },
      lang: {
         fontSize: 18,
         width: 100,
         height: 25,
         backgroundColor: '#0366d6',
         textAlign: 'center',
         borderRadius: 5,
         color: 'white',
         marginTop: 5,
         fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
         })
      }
   })

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.ownerAvatarUrl} />
      <View style={styles.content}>
         <Text style={styles.fullName}>{item.fullName}</Text>
         <Text style={styles.description}>{item.description}</Text>
         <Text style={styles.lang}>{item.language}</Text>
      </View>
    </View>
  )
}

export default RepositoryItemHeader;
