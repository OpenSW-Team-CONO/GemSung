import React, { Component } from 'react';
import { View,Text,StyleSheet, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import CreateTab from './AppTabNavigator/CreateTab'
import ViewTab from './AppTabNavigator/ViewTab'


const AppTabNavigator = createMaterialTopTabNavigator({
  CreateTab: { screen: CreateTab },
  ViewTab: { screen: ViewTab }
},{
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      ...Platform.select({
        ios:{
          backgroundColor:'white',
        },
        android:{
          backgroundColor:'white',
        }
      })
    },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class Main extends Component {
  static navigationOptions = {
    title: 'Gemsung',
    headerTitleStyle: {
        textAlign:"center",
        color:'#4C64FF',
        fontSize:30,
        fontFamily:'',
        flex:1
    },
  }
  render() {
    return (
      <AppTabContainet />
    );
  }
}
