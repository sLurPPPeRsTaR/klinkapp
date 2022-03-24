import React from 'react';
import {Alert, Button, FlatList, Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import useStore from '../../store';

export default function ProductCart({navigation}) {
  const {deleteCartsItem, carts} = useStore();

  const handleRemove = data => {
    let copyCarts = [...carts];
    let result = copyCarts.filter(item => {
      return item.id != data.id;
    });
    deleteCartsItem(result);
  };

  const handleRenderItem = ({item}) => {
    return (
      <View style={tw`bg-yellow-300 my-2 p-2 border-2 rounded-xl`}>
        <Text>SKU No : {item.id}</Text>
        <Text>Title : {item.title}</Text>
        <Text>Qty : {item.quantity}</Text>
        <Text>Price : {item.price}</Text>
        <Button
          title="Remove"
          onPress={() => {
            Alert.alert('Warning', 'Are you sure ?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => handleRemove(item)},
            ]);
          }}
        />
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-red-300 p-5`}>
      <FlatList
        data={carts}
        keyExtractor={item => item.id}
        renderItem={handleRenderItem}
      />
      <View style={tw`h-2`} />
      {!carts.length == 0 && (
        <Button
          title="checkout"
          onPress={() => {
            navigation.push('Screen_Checkout');
          }}
        />
      )}
    </View>
  );
}
