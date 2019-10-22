import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size = "large" color ="white"/>
      <Text style={styles.txt}>Wait for Second...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt:{
    fontSize:30,
    color:'white'
  }
});
