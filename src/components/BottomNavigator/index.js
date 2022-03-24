import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {HomeIcon, CartIcon, ProfileIcon} from '../../assets';
import tw from 'tailwind-react-native-classnames';

export default function BottomNavigator({state, descriptors, navigation}) {
  return (
    <View style={tw`flex-row bg-green-400`}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = () => {
          if (label === 'Cart') {
            return <CartIcon width="25" height="25" />;
          }
          if (label === 'Home') {
            return <HomeIcon width="25" height="25" />;
          }
          if (label === 'Profile') {
            return <ProfileIcon width="25" height="25" />;
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 10,
            }}>
            <Icon />
            <Text
              style={{
                color: isFocused ? 'red' : '#222',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
