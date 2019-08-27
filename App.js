import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

// screens components
import Login from './src/components/login';
import UserHome from './src/components/userHome';

const AppNavigator = createStackNavigator({
  DefaultScreen: {
    screen: Login,
    navigationOptions: () => ({
      header: null
    }),
  },
  UserHomeScreen: {
    screen: UserHome
  }
}, {
    initialRouteName: 'DefaultScreen',
    // this will create all screen without header
    // headerMode: 'none',
    // navigationOptions: {
    //   headerVisible: false,
    // },
  })
export default createAppContainer(AppNavigator);
