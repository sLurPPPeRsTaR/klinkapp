import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Button, Image, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'tailwind-react-native-classnames';
import {ErrorScreen} from '../../assets';
import useStore from '../../store';

export default function ProductDetail({route, navigation}) {
  const id = route.params.itemId;
  const {addToCarts, carts} = useStore();
  const [qty, setQuantity] = useState(1);

  const handlerIncreaseQty = () => {
    console.log('aku adalah PENAMBAHAN dan aku dipanggil');

    setQuantity(qty + 1);
  };

  const handlerDecreaseQty = () => {
    console.log('aku adalah PENGURANGAN dan aku dipanggil');

    if (qty <= 1) {
      return;
    }
    setQuantity(qty - 1);
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
      price: item.price * qty,
      quantity: qty,
    };
    addToCarts(tempItem);
    getAPI();
    alert('Product add to your cart ! please check !');
    navigation.goBack();
  };

  const getAPI = async () => {
    console.log('aku adalah api dan aku dipanggil');
    const URL = `https://fakestoreapi.com/products/${id}`;
    const respone = await fetch(URL);
    return await respone.json();
  };

  const MapComponent = useCallback(() => {
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
          <View>
            <Button
              title="add to cart"
              onPress={() => handlerAddToCarts(data)}
            />
          </View>
        </View>
      );
    }
  }, []);

  return (
    <View style={tw`flex-1 bg-red-300 p-5`}>
      <MapComponent />
      <View style={tw`flex-row justify-evenly`}>
        <View style={tw`flex-row items-center`}>
          <Button title="-" onPress={handlerDecreaseQty} />
          <Text style={tw`mx-px`}>{qty}</Text>
          <Button title="+" onPress={handlerIncreaseQty} />
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
