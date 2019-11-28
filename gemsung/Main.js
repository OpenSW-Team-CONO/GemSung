/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Platform, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import CreateTab from './AppTabNavigator/CreateTab';
import ViewTab from './AppTabNavigator/ViewTab';
import Loading from './Loading';

import * as Font from 'expo-font';

const AppTabNavigator = createMaterialTopTabNavigator({
  CreateTab: { screen: CreateTab }, // 하단 네비게이션 왼쪽 스크린은 CreateTab 으로 설정
  ViewTab: { screen: ViewTab }, // 하단 네비게이션 오른쪽 스크린은 ViewTab 으로 설정
}, { // 화면 전환 각종 ship duck 애니메이션, 색상 등 옵션 설정
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      ...Platform.select({
        ios: {
          backgroundColor: 'white',
        },
        android: {
          backgroundColor: 'white',
        },
      }),
    },
    pressColor: '#4C64FF',
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  },
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     fontLoad: false,
  //   };
  // }

  // openFont=async () => {
  //   try {
  //     await Font.loadAsync({
  //       title_font: require('./assets/fonts/jackpot.ttf'),
  //     }).then(() => {
  //       this.setState({ fontLoad: true });
  //       console.log('폰트 파일을 찾았습니다!', this.state.fontLoad);
  //     })
  //       .catch((e) => {
  //         console.log('error while loading font', e);
  //       });
  //   } catch (e) {
  //     Alert.alert('폰트 파일을 찾지 못 하였습니다...', e.stringify()); // 폰트 로드에 실패할 경우 경고창 출력
  //   }
  // }

  // componentDidMount() {
  //   this.openFont();
  // }

  static navigationOptions = {
    // 상단 타이틀 바 옵션 설정
    title: 'Gemsung',
    headerTitleStyle: {
      textAlign: 'center',
      color: '#4C64FF',
      fontSize: 30,
      // fontFamily: 'title_font',
      flex: 1,
    },
  }

  render() {
    return <AppTabContainet />; // 폰트가 로드 되는동안 로딩 화면을 출력
  }
}
