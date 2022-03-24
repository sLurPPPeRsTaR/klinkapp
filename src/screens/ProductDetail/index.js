import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, Button, Image, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'tailwind-react-native-classnames';
import {ErrorScreen} from '../../assets';
import useStore from '../../store';

export default function ProductDetail({route, navigation}) {
  const id = route.params.itemId;
  const {addToCarts, carts} = useStore();
  const refQty = useRef(1);

  const handlerIncreaseQty = () => {
    refQty.current = refQty.current + 1;
    alert(`Qty: ${refQty.current}`);
  };

  const handlerDecreaseQty = () => {
    if (refQty.current <= 1) {
      return;
    }
    refQty.current = refQty.current - 1;
    alert(`Qty: ${refQty.current}`);
  };

  const handlerAddToCarts = item => {
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id === item.id) {
        alert('this product with current SKU already inside your cart');
        return;
      }
    }
    let tempItem = {
      id: item.id,
      title: item.title,
      price: item.price * refQty.current,
      quantity: refQty.current,
    };
    addToCarts(tempItem);
    refQty.current = 1;
    getAPI();
    alert('Product add to your cart ! please check !');
    navigation.goBack();
  };

  const getAPI = async () => {
    const URL = `https://fakestoreapi.com/products/${id}`;
    const respone = await fetch(URL);
    return await respone.json();
  };

  const MapComponent = () => {
    const {data, isError, isLoading, isFetching, isSuccess} = useQuery(
      'api',
      getAPI,
      {
        // staleTime: 3000,
      },
    );
    if (isLoading) {
      return (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
          <ErrorScreen width="100%" height="100%" />
        </View>
      );
    }

    if (isFetching) {
      return (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }

    if (isSuccess) {
      return (
        <View style={tw`flex-1 border p-4 my-2 rounded-xl bg-yellow-300 `}>
          <View style={tw`flex-1`}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
              source={{uri: `${data.image}`}}
            />
          </View>
          <View style={tw`flex-1 my-1`}>
            <Text style={tw`bg-green-400 p-2`}>{data.description}</Text>
          </View>
          <View style={tw`flex-row justify-evenly`}>
            <View style={tw`flex-row items-center`}>
              <Button title="-" onPress={handlerDecreaseQty} />
              <Text style={tw`mx-px`}>Qty</Text>
              <Button title="+" onPress={handlerIncreaseQty} />
            </View>
            <View>
              <Button
                title="add to cart"
                onPress={() => handlerAddToCarts(data)}
              />
            </View>
            <Button
              title="Go back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={tw`flex-1 bg-red-300 p-5`}>
      <MapComponent />
    </View>
  );
}
