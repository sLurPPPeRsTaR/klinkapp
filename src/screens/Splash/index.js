import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';

export default function Splash({navigation}) {
  setTimeout(() => {
    navigation.navigate('Screen_MainApp');
  }, 5000);
  return (
    <View style={tw`flex-1 items-center justify-center bg-red-300`}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}
