import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from './Main';

const AppStackNavigator = createStackNavigator({
  Main:{
    screen: Main
  }
});

export default createAppContainer(AppStackNavigator);
