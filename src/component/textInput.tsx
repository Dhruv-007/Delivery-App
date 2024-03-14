import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {ConstNumber} from '../constants/number.constant';
import {FontWeight} from '../constants/fontWeight';
import { Percentage } from '../constants/percentage';
interface LabeledValue {
  onChangeNumber: (text: string) => void;
  value: any;
  placeholder: any;
  label: string;
  marginTop: any;
}
const TextInputValue: React.FC<LabeledValue> = ({
  onChangeNumber,
  value,
  placeholder,
  label,
  marginTop,
}) => {
  return (
    <View>
      <Text style={[styles.labe, {marginTop: marginTop}]}>{label}</Text>
      <TextInput
        style={[styles.input, {color: 'white'}]}
        onChangeText={onChangeNumber}
        value={value}
        placeholderTextColor={'white'}
        cursorColor={'black'}
        placeholder={placeholder}
        keyboardType="numeric"
      />
    </View>
  );
};

export default TextInputValue;
const styles = StyleSheet.create({
  input: {
    height: ConstNumber.VALUE_49,
    width: Percentage.VALUE_100,
    marginTop: ConstNumber.VALUE_10,
    borderWidth: ConstNumber.VALUE_1,
    padding: ConstNumber.VALUE_10,
    borderColor: '#F7F7F7',

    borderRadius: ConstNumber.VALUE_10,
  },
  labe: {
    fontSize: ConstNumber.VALUE_14,
    color: 'white',
    fontWeight: FontWeight.SIX_HUNDRED,
  },
});
