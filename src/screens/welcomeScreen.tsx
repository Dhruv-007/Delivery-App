import React from 'react';
import {View, Text, Image} from 'react-native';
import ButtonScreen from '../component/button';
import {useNavigation} from '@react-navigation/native';
import {DashboardRoutes, NavigationType} from './enums';
import {ImageConstants} from '../constants/image.constants';
import {ConstNumber} from '../constants/number.constant';
import {FontWeight} from '../constants/fontWeight';
import {Percentage} from '../constants/percentage';

const styles = {
  container: {
    flex: ConstNumber.VALUE_1,
    backgroundColor: '#0C0C0C',
  },
  foodImage: {
    height: Percentage.VALUE_60,
    width: Percentage.VALUE_100,
    borderRadius: ConstNumber.VALUE_5,
  },
  textContainer: {
    marginHorizontal: ConstNumber.VALUE_10,
  },
  welcomeText: {
    fontSize: ConstNumber.VALUE_28,
    fontWeight: FontWeight.SEVEN_HUNDRED,
    color: 'white',
  },
  subtitle: {
    fontSize: ConstNumber.VALUE_16,
    fontWeight: FontWeight.FOUR_HUNDRED,
    color: '#D28C8C',
    marginTop: ConstNumber.VALUE_15,
  },
  discountText: {
    fontSize: ConstNumber.VALUE_16,
    fontWeight: FontWeight.FOUR_HUNDRED,
    color: '#D28C8C',
  },
  buttonContainer: {
    marginTop: ConstNumber.VALUE_40,
  },
  loginButton: {
    marginTop: ConstNumber.VALUE_20,
  },
};

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationType>();

  return (
    <View style={styles.container}>
      <Image style={styles.foodImage} source={ImageConstants.FOOD_IMAGE} />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subtitle}>
          The food you love and adore, delivered!
        </Text>
        <Text style={styles.discountText}>Discounts all in one place</Text>
        <View style={styles.buttonContainer}>
          <ButtonScreen
            text={'Login'}
            colorsView={'#F70000'}
            textColor={'white'}
            onPress={() => navigation.navigate(DashboardRoutes.LOGIN)}
          />
          <View style={styles.loginButton}>
            <ButtonScreen
              text={'SignUp'}
              colorsView={'#391419'}
              textColor={'#F65050'}
              onPress={() => navigation.navigate(DashboardRoutes.SIGNUP)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
