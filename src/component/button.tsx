import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ConstNumber} from '../constants/number.constant';
import {GlobalStyleValues} from '../constants/globalstyles.constant';
import {FontWeight} from '../constants/fontWeight';
import { Percentage } from '../constants/percentage';

const ButtonScreen = ({text, colorsView, textColor, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colorsView}]}
      onPress={onPress}>
      <Text style={[styles.textValue, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonScreen;

const styles = StyleSheet.create({
  container: {
    height: ConstNumber.VALUE_49,
    width: Percentage.VALUE_100,
    borderRadius: ConstNumber.VALUE_10,
    alignItems: GlobalStyleValues.CENTER,
    justifyContent: GlobalStyleValues.CENTER,
    borderWidth: ConstNumber.VALUE_1,
  },
  textValue: {
    fontSize: ConstNumber.VALUE_12,
    fontWeight: FontWeight.SEVEN_HUNDRED,
  },
});
