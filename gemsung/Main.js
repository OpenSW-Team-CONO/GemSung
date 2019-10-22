import React, { Component } from 'react';
import { View,Text,StyleSheet, Platform,Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import CreateTab from './AppTabNavigator/CreateTab'
import ViewTab from './AppTabNavigator/ViewTab'
import Loading from './Loading'

import * as Font from 'expo-font'


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
  state={
    fontLoad : true
  };

  openFont=async()=>{
    try {
      await Font.loadAsync({
        'title_font': require('./Fonts/jackpot.ttf'),
      });
      this.setState({fontLoad : false});
      console.log('폰트 파일을 찾았습니다.',this.state.fontLoad);
    } catch (e) {
      Alert.alert("폰트 파일을 찾지 못 하였습니다...",e.stringify());
    }
  }

  componentDidMount() {
    this.openFont();
  }

  static navigationOptions = {
    title: 'Gemsung',
    headerTitleStyle: {
        textAlign:"center",
        color:'#4C64FF',
        fontSize:30,
        //fontFamily:'title_font',
        flex:1
    },
  }

  render() {
    return this.state.fontLoad? <Loading /> : <AppTabContainet />;
  }
}
