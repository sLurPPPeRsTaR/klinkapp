import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BottomNavigator} from '../components';
import {
  ProductCart,
  ProductCheckout,
  ProductDetail,
  ProductHome,
  Splash,
  SplashConfirmed,
} from '../screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomNavigator {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={ProductHome} />
      <Tab.Screen name="Cart" component={ProductCart} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator
      // initialRouteName="Screen_Splash"
      initialRouteName="Screen_Checkout"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Screen_Splash" component={Splash} />
      <Stack.Screen name="Screen_SplashConfirmed" component={SplashConfirmed} />
      <Stack.Screen name="Screen_ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Screen_Checkout" component={ProductCheckout} />
      <Stack.Screen name="Screen_MainApp" component={MainApp} />
    </Stack.Navigator>
  );
}
