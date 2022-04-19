import {TextInput, View, Text, Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'tailwind-react-native-classnames';
import useStore from '../../store';
import {useForm, Controller} from 'react-hook-form';

export default function ProductCheckout({navigation}) {
  useEffect(() => {
    handlerTotal();
    return () => {};
  }, []);

  const [valuecourier, setValuecourier] = useState(null);
  const [opencourier, setOpenCourier] = useState(false);
  const [courier, setcourier] = useState([
    {label: 'Store Courier', value: 'Store Courier'},
  ]);

  const [valuepayment, setValuepayment] = useState(null);
  const [openpayment, setOpenPayment] = useState(false);
  const [payment, setpayment] = useState([{label: 'Cash', value: 'Cash'}]);

  const {total, carts, addTotal} = useStore();
  const [edit, setEdit] = useState({});
  const [tempCustomer, settempCustomer] = useState();
  const [customer, setCustomer] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
  });

  const handlerTotal = () => {
    let tempTotal = 0;
    carts.map(item => (tempTotal += item.price));
    addTotal({total: tempTotal.toFixed(2)});
  };

  const handlerSubmit = () => {
    if (!tempCustomer) {
      alert('nothing to submit!');
      return;
    } else {
      if (edit) {
        let tempEdit = {
          customerName: tempCustomer.customerName,
          customerEmail: tempCustomer.customerEmail,
          customerPhone: tempCustomer.customerPhone,
          customerAddress: tempCustomer.customerAddress,
        };
        setCustomer(tempEdit);
        settempCustomer('');
        setEdit('');
        return;
      }

      setCustomer(tempCustomer);
      settempCustomer('');
    }
  };

  const handlerEdit = () => {
    if (edit) {
      alert('nothing to edit!');
      return;
    }
    setEdit(customer);
    settempCustomer(customer);
  };

  const handlerOnChange = (value, input) => {
    settempCustomer({...tempCustomer, [input]: value});
  };

  return (
    <View style={tw`flex-1 bg-red-300 p-5`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text>Name : </Text>
        <TextInput
          onChangeText={value => handlerOnChange(value, 'customerName')}
          value={tempCustomer?.customerName}
          placeholder="Please input your name"
          style={tw`border rounded-xl w-4/5 h-3/4 text-center`}
        />
      </View>
      <View style={tw`flex-row justify-between items-center`}>
        <Text>E-mail : </Text>
        <TextInput
          onChangeText={value => handlerOnChange(value, 'customerEmail')}
          value={tempCustomer?.customerEmail}
          keyboardType="email-address"
          placeholder="Please input your E-mail"
          style={tw`border rounded-xl w-4/5 h-3/4 text-center`}
        />
      </View>
      <View style={tw`flex-row justify-between items-center`}>
        <Text>Phone : </Text>
        <TextInput
          onChangeText={value => handlerOnChange(value, 'customerPhone')}
          value={tempCustomer?.customerPhone}
          placeholder="Please input your Phone Number"
          keyboardType="number-pad"
          style={tw`border rounded-xl w-4/5 h-3/4 text-center`}
        />
      </View>
      <View>
        <Text>Your Address</Text>
        <TextInput
          onChangeText={value => handlerOnChange(value, 'customerAddress')}
          value={tempCustomer?.customerAddress}
          placeholder="Please input your Address"
          style={tw`border rounded-xl h-24 text-center`}
        />
      </View>
      <View style={tw`my-3`}>
        <Text>Pick Your Courier</Text>
        <DropDownPicker
          open={opencourier}
          value={valuecourier}
          items={courier}
          setOpen={setOpenCourier}
          setValue={setValuecourier}
          setItems={setcourier}
          dropDownDirection="BOTTOM"
        />
      </View>
      <View>
        <Text>Pick Your Payment Method</Text>
        <DropDownPicker
          open={openpayment}
          value={valuepayment}
          items={payment}
          setOpen={setOpenPayment}
          setValue={setValuepayment}
          setItems={setpayment}
          dropDownDirection="BOTTOM"
        />
      </View>
      <View style={tw`flex-row justify-evenly m-2`}>
        <Button title="submit" onPress={handlerSubmit} />
        <Button title="edit" onPress={handlerEdit} />
      </View>
      <View style={tw`flex-1 justify-end m-2`}>
        {!edit && (
          <Button
            title="Proceed"
            onPress={() => {
              Alert.alert(
                'Confirmation',
                `Hello Mr/Mrs."${customer?.customerName}" your total shop is "$${total}" all item will sent to your address at "${customer?.customerAddress}" make sure this phonenumber "${customer?.customerPhone}" always active. Press "OK" to "Proceed" !`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.push('Screen_SplashConfirmed');
                    },
                  },
                ],
              );
            }}
          />
        )}
      </View>
    </View>
  );
}
