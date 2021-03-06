/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import React from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.txt}>파일 업로드 중...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 30,
    color: 'white',
  },
});
