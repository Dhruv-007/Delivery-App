import React, {useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {DashboardRoutes, NavigationType} from './enums';
import TextInputValue from '../component/textInput';
import ButtonScreen from '../component/button';
import {ConstNumber} from '../constants/number.constant';
import {GlobalStyleValues} from '../constants/globalstyles.constant';
import {FontWeight} from '../constants/fontWeight';
import {BASE_URL, apiUrl} from '../constants/apiUrl';

const styles = {
  container: {
    flex: ConstNumber.VALUE_1,
    backgroundColor: '#291E43',
    justifyContent: GlobalStyleValues.CENTER,
  },
  textContainer: {
    marginHorizontal: ConstNumber.VALUE_16,
  },
  welcomeText: {
    marginTop: ConstNumber.VALUE_60,
    fontSize: ConstNumber.VALUE_28,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
  },
  deliveryShopText: {
    fontSize: ConstNumber.VALUE_28,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
  },
  inputMarginTop: {
    marginTop: ConstNumber.VALUE_10,
  },
  buttonMarginTop: {
    marginTop: ConstNumber.VALUE_40,
  },
  loginTextContainer: {
    justifyContent: GlobalStyleValues.CENTER,
    marginTop: ConstNumber.VALUE_20,
  },
  loginText: {
    fontSize: ConstNumber.VALUE_12,
    fontWeight: FontWeight.FOUR_HUNDRED,
    color: '#AEA3C8',
  },
  loginPressableText: {
    fontSize: ConstNumber.VALUE_24,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
    marginTop: ConstNumber.VALUE_2,
  },
};
const SignupScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BASE_URL}${apiUrl.SIGNUP}`, {
        name,
        email,
        password,
      });

      if (response.status === ConstNumber.VALUE_200 && response.data.success) {
        Alert.alert('Success', response.data.message);
        navigation.navigate(DashboardRoutes.REGISTER);
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === ConstNumber.VALUE_400) {
          Alert.alert('Error', error.response.data.message);
        } else {
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      } else {
        Alert.alert('Error', 'Network Error: Unable to connect to the server.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to our</Text>
        <Text style={styles.deliveryShopText}>Delivery shop</Text>
        <TextInputValue
          onChangeNumber={setName}
          value={name}
          placeholder={'Name'}
          label={'Name'}
          marginTop={styles.inputMarginTop}
        />
        <TextInputValue
          onChangeNumber={setEmail}
          value={email}
          placeholder={'Email'}
          label={'Email'}
          marginTop={ConstNumber.VALUE_30}
        />
        <TextInputValue
          onChangeNumber={setPassword}
          value={password}
          placeholder={'Password'}
          label={'Password'}
          marginTop={ConstNumber.VALUE_30}
        />
        <View style={styles.buttonMarginTop}>
          <ButtonScreen
            text={'Continue'}
            colorsView={'#8C63EE'}
            textColor={'white'}
            onPress={handleSignup}
          />
        </View>
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate(DashboardRoutes.LOGIN)}>
            <Text style={styles.loginPressableText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
