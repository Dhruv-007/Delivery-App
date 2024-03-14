import React, {useState} from 'react';
import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {DashboardRoutes, NavigationType} from './enums';
import TextInputValue from '../component/textInput';
import ButtonScreen from '../component/button';
import {ConstNumber} from '../constants/number.constant';
import {GlobalStyleValues} from '../constants/globalstyles.constant';
import {FontWeight} from '../constants/fontWeight';
import {BASE_URL, apiUrl} from '../constants/apiUrl';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}${apiUrl.LOGIN_ENDPOINT}`, {
        email,
        password,
      });

      if (response.status === ConstNumber.VALUE_200 && response.data.success) {
        navigation.navigate(DashboardRoutes.DASHBOARD, {
          token: response,
        });
      } else {
        Alert.alert('Error', 'An unexpected error occurred.', response?.status);
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
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to our</Text>
        <Text style={styles.title}>Delivery shop</Text>
        <View style={styles.inputContainer}>
          <TextInputValue
            onChangeNumber={setEmail}
            value={email}
            placeholder={'Email'}
            label={'Email'}
            marginTop={ConstNumber.VALUE_10}
          />
          <TextInputValue
            onChangeNumber={setPassword}
            value={password}
            placeholder={'Password'}
            label={'Password'}
            marginTop={ConstNumber.VALUE_30}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonScreen
            text={'Continue'}
            colorsView={'#8C63EE'}
            textColor={'white'}
            onPress={handleLogin}
          />
        </View>
        <View style={styles.createAccountContainer}>
          <View style={styles.createAccountTextContainer}>
            <Text style={styles.createAccountText}>Create Account</Text>
            <Pressable
              onPress={() => navigation.navigate(DashboardRoutes.SIGNUP)}>
              <Text style={styles.createAccountButton}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: ConstNumber.VALUE_1,
    backgroundColor: '#291E43',
  },
  contentContainer: {
    marginHorizontal: ConstNumber.VALUE_16,
    marginTop: ConstNumber.VALUE_80,
  },
  title: {
    fontSize: ConstNumber.VALUE_28,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
    // marginTop: ConstNumber.VALUE_10,
  },
  inputContainer: {
    marginTop: ConstNumber.VALUE_20,
  },
  buttonContainer: {
    marginTop: ConstNumber.VALUE_40,
  },
  createAccountContainer: {
    flexDirection: GlobalStyleValues.ROW,
    justifyContent: GlobalStyleValues.SPACE_BETWEEN,
    marginTop: ConstNumber.VALUE_40,
  },
  createAccountTextContainer: {
    alignSelf: GlobalStyleValues.CENTER,
  },
  createAccountText: {
    fontSize: ConstNumber.VALUE_12,
    fontWeight: FontWeight.FOUR_HUNDRED,
    color: '#AEA3C8',
  },
  createAccountButton: {
    fontSize: ConstNumber.VALUE_24,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
    marginTop: ConstNumber.VALUE_2,
  },
});

export default LoginScreen;
