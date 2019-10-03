import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import Prop from 'prop-types';

export default function ViewTab({photos_loc}) {
        return (
            <View style={style.container}>
                <Text>View Tab</Text>
            </View>
        );
}

ViewTab.navigationOptions={
  tabBarIcon: ({ tintColor }) => (
      <Icon name='ios-person' style={{ color: tintColor }} />
  )
}

ViewTab.Prop={
  photos_loc : Prop.isRequired
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
