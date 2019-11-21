/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './Main';

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: Main, // 네비게이션 UI 메인 스크린 지정
  },
});

export default createAppContainer(AppStackNavigator);
