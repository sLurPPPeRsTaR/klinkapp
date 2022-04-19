import {TextInput, View, Text, Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'tailwind-react-native-classnames';
import useStore from '../../store';
import {useForm, Controller} from 'react-hook-form';

export default function ProductCheckout({navigation}) {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PHONE_REGEX =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  useEffect(() => {
    handlerTotal();
    return () => {};
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
    },
  });

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
  // const [tempCustomer, settempCustomer] = useState();
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
    // if (edit) {
    //   let tempEdit = {
    //     customerName: tempCustomer.customerName,
    //     customerEmail: tempCustomer.customerEmail,
    //     customerPhone: tempCustomer.customerPhone,
    //     customerAddress: tempCustomer.customerAddress,
    //   };
    //   setCustomer(tempEdit);
    //   settempCustomer('');
    //   setEdit('');
    //   return;
    // }
    // console.log(data);
    setCustomer(getValues());
    reset();
  };
  console.log('edit :', edit);
  console.log('customer :', customer);

  const handlerEdit = () => {
    // if (edit) {
    //   alert('nothing to edit!');
    //   return;
    // }
    setEdit(customer);
    setValue({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
    });
  };

  const handlerOnChange = (value, input) => {
    settempCustomer({...tempCustomer, [input]: value});
  };

  return (
    <View style={tw`flex-1 bg-red-300 p-5`}>
      <View style={tw`flex justify-between items-center`}>
        <Controller
          rules={{
            required: 'customerName is required',
            minLength: {
              value: 3,
              message: 'customerName invalid not less than 3 character',
            },
          }}
          control={control}
          name="customerName"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <>
                <TextInput
                  style={[
                    tw`border rounded-xl w-4/5 text-center`,
                    error && tw`border rounded-xl w-4/5 text-center bg-red-700`,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="customerName"
                />
                {error ? (
                  <Text style={tw`text-red-700`}>
                    {errors.customerName?.message}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </>
            );
          }}
        />
      </View>

      <View style={tw`flex justify-between items-center`}>
        <Controller
          rules={{
            required: 'customerEmail is required',
            pattern: {value: EMAIL_REGEX, message: 'customerEmail is invalid'},
          }}
          control={control}
          name="customerEmail"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <>
                <TextInput
                  style={[
                    tw`border rounded-xl w-4/5 text-center`,
                    error && tw`border rounded-xl w-4/5 text-center bg-red-700`,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="customerEmail"
                />
                {error ? (
                  <Text style={tw`text-red-700`}>
                    {errors.customerEmail?.message}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </>
            );
          }}
        />
      </View>

      <View style={tw`flex justify-between items-center`}>
        <Controller
          rules={{
            required: 'customerPhone is required',
            pattern: {value: PHONE_REGEX, message: 'customerPhone is invalid'},
          }}
          control={control}
          name="customerPhone"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <>
                <TextInput
                  style={[
                    tw`border rounded-xl w-4/5 text-center`,
                    error && tw`border rounded-xl w-4/5 text-center bg-red-700`,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="+62-811-8888-888"
                />
                {error ? (
                  <Text style={tw`text-red-700`}>
                    {errors.customerPhone?.message}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </>
            );
          }}
        />
      </View>

      <View style={tw`flex justify-between items-center`}>
        <Controller
          rules={{
            required: 'customerAddress is required',
            minLength: {
              value: 3,
              message: 'customerAddress invalid not less than 3 character',
            },
          }}
          control={control}
          name="customerAddress"
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            return (
              <>
                <TextInput
                  style={[
                    tw`border rounded-xl w-4/5 text-center`,
                    error && tw`border rounded-xl w-4/5 text-center bg-red-700`,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="customerAddress"
                />
                {error ? (
                  <Text style={tw`text-red-700`}>
                    {errors.customerAddress?.message}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </>
            );
          }}
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
        <Button title="submit" onPress={handleSubmit(handlerSubmit)} />
        <Button title="edit" onPress={handlerEdit} />
      </View>
      <View style={tw`flex justify-end m-2`}>
        {!edit && (
          <Button
            title="Proceed"
            onPress={() => {
              Alert.alert(
                'Confirmation',
                `Hello Mr/Mrs.${customer.customerName} your total shop is $${total} we gonna sent all to your address which in ${customer.customerAddress} make sure this phonenumber which ${customer.customerPhone} can accept any calls , is it all set?`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      setCustomer({
                        customerName: '',
                        customerEmail: '',
                        customerPhone: '',
                        customerAddress: '',
                      });
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
