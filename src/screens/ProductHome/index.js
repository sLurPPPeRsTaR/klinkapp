import React, {useEffect} from 'react';
import {FlatList, Pressable, Text, View, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'tailwind-react-native-classnames';
import {ErrorScreen} from '../../assets';
import {useIsFocused} from '@react-navigation/native';

export default function ProductHome({navigation}) {
  const getAPI = async () => {
    const URL = 'https://fakestoreapi.com/products';
    const respone = await fetch(URL);
    return await respone.json();
  };

  const isFocused = useIsFocused();

  const MapComponent = () => {
    const {data, isError, isLoading, isFetching, isSuccess} = useQuery(
      'api',
      getAPI,
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
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                style={tw`border flex-row p-4 my-2 rounded-xl bg-yellow-300`}>
                <View style={tw`flex-1 justify-center items-center`}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Screen_ProductDetail', {
                        itemId: item.id,
                      })
                    }>
                    <Text>{item.title}</Text>
                  </Pressable>
                  <Text>$ {item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      );
    }
  };

  return (
    <View style={tw`flex-1 bg-red-300 p-5`}>
      {isFocused && <MapComponent />}
    </View>
  );
}
