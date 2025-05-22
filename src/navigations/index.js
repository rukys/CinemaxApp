/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  FavoriteScreen,
  ForgotPassScreen,
  HomeScreen,
  OnboardingScreen,
  ProfileScreen,
  SearchScreen,
  SigninScreen,
  SignupScreen,
  SplashScreen,
} from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components/sections';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppBarScreen = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigations = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="AppBarScreen" component={AppBarScreen} />
    </Stack.Navigator>
  );
};

export default Navigations;
