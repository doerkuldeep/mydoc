import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LOGIN_SCREEN, OTP_VERIFICATION_SCREEN} from './Constants';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerification/OtpVerificationScreen';
import {AppStackParamList} from './Navigation.types';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={LOGIN_SCREEN}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={OTP_VERIFICATION_SCREEN}
        component={OtpVerificationScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
