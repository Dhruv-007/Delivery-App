import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {ImageConstants} from '../constants/image.constants';
import ButtonScreen from '../component/button';
import {ConstNumber} from '../constants/number.constant';
import {GlobalStyleValues} from '../constants/globalstyles.constant';
import {FontWeight} from '../constants/fontWeight';
import {useNavigation} from '@react-navigation/native';
import {DashboardRoutes, NavigationType} from './enums';

const RegisterSuccessFully = () => {
  const navigation = useNavigation<NavigationType>();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={ImageConstants.REGISTER} />
        <Text style={styles.title}>You've Successfully</Text>
        <Text style={styles.title}>Registered!</Text>
        <Text style={styles.description}>
          Welcome to our Delivery Shop App! Enjoy your shopping experience.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonScreen
          text={'Submit'}
          colorsView={'#8C63EE'}
          textColor={'white'}
          onPress={() => navigation.navigate(DashboardRoutes.LOGIN)}
        />
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
    justifyContent: GlobalStyleValues.CENTER,
    alignItems: GlobalStyleValues.CENTER,
    marginTop: ConstNumber.VALUE_70,
    marginHorizontal: ConstNumber.VALUE_16,
  },
  title: {
    fontSize: ConstNumber.VALUE_28,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
  },
  description: {
    fontSize: ConstNumber.VALUE_14,
    fontWeight: FontWeight.SIX_HUNDRED,
    color: '#9E9DA5',
    textAlign: GlobalStyleValues.CENTER,
    marginHorizontal: ConstNumber.VALUE_10,
    marginTop: ConstNumber.VALUE_20,
  },
  buttonContainer: {
    marginTop: ConstNumber.VALUE_80,
    marginHorizontal: ConstNumber.VALUE_16,
  },
});

export default RegisterSuccessFully;
