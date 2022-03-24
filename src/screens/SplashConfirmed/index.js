import React from 'react';
import {View} from 'react-native';
import {SplashConfirmedLogo} from '../../assets';
import tw from 'tailwind-react-native-classnames';
import useStore from '../../store';

export default function SplashConfirmed({navigation}) {
  const {removeAllCartsItem} = useStore();
  setTimeout(() => {
    navigation.navigate('Screen_MainApp');
    removeAllCartsItem();
  }, 5000);
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
      <SplashConfirmedLogo />
    </View>
  );
}
