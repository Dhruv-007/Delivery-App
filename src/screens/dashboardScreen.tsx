import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Modal from 'react-native-modal';
import ButtonScreen from '../component/button';
import {ImageConstants} from '../constants/image.constants';
import {DashboardRoutes, RootStackParamList} from './enums';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ConstNumber} from '../constants/number.constant';
import {GlobalStyleValues} from '../constants/globalstyles.constant';
import {Percentage} from '../constants/percentage';
import {BASE_URL, apiUrl} from '../constants/apiUrl';

const styles = StyleSheet.create({
  constainer: {
    flex: ConstNumber.VALUE_1,
    backgroundColor: '#291E43',
  },
  imageContainer: {
    position: 'relative',
  },
  circularImage: {
    width: ConstNumber.VALUE_160,
    height: ConstNumber.VALUE_160,
    borderRadius: ConstNumber.VALUE_100,
    overflow: GlobalStyleValues.HIDDEN,
    marginBottom: ConstNumber.VALUE_20,
    backgroundColor: '#ddd',
  },
  cameraIcon: {
    position: GlobalStyleValues.ABSOLUTE,
    top: ConstNumber.VALUE_140,
    right: ConstNumber.VALUE_30,
    height: ConstNumber.VALUE_20,
    width: ConstNumber.VALUE_30,
    borderRadius: ConstNumber.VALUE_5,
  },
  locationText: {
    fontSize: ConstNumber.VALUE_16,
    marginBottom: ConstNumber.VALUE_20,
    color: 'white',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: ConstNumber.VALUE_22,
    justifyContent: GlobalStyleValues.CENTER,
    alignItems: GlobalStyleValues.CENTER,
    borderRadius: ConstNumber.VALUE_4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    padding: ConstNumber.VALUE_12,
    borderBottomWidth: ConstNumber.VALUE_1,
    borderBottomColor: '#ddd',
    width: Percentage.VALUE_100,
    alignItems: GlobalStyleValues.CENTER,
  },
  modalButtonText: {
    fontSize: ConstNumber.VALUE_18,
  },
  toggleStyle: {
    alignItems: GlobalStyleValues.CENTER,
    justifyContent: GlobalStyleValues.CENTER,
    marginTop: ConstNumber.VALUE_200,
  },
});

const DashboardScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, DashboardRoutes.DASHBOARD>>();
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  console.log(route.params?.token?.data?.token,'token')
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log(latitude,longitude,'longitudelongitude')
  const pickImage = async () => {
    try {
      const pickedImage = await ImagePicker.openPicker({
        width: ConstNumber.VALUE_300,
        height: ConstNumber.VALUE_400,
        cropping: true,
      });

      setImage(pickedImage);
      toggleModal(); // Open the modal after picking an image
    } catch (error) {
      if (error.code === 'E_CANCELED') {
        console.warn('User cancelled image selection.');
      } else {
        console.log(error);
      }
    }
  };
  
  const openCamera = async () => {
    try {
      const pickedImage = await ImagePicker.openCamera({
        width: ConstNumber.VALUE_300,
        height: ConstNumber.VALUE_400,
        cropping: true,
      });

      setImage(pickedImage);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      },
      error => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const submitFormData = () => {
    if (!image || !latitude || !longitude) {

      Alert.alert(
        'Error',
        'Please pick an image and get your current location.',
      );
      return;
    }

    const token = route.params?.token?.data?.token;

    submitForm(token, latitude, longitude, image);
  };

  const submitForm = async (token, latitude, longitude, image) => {
    
    try {
      const formData = createFormData(image, {latitude, longitude});

      const response = await axios.post(
        `${BASE_URL}${apiUrl.FORMS}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        },
      );
      console.log('Server Response:', response.data);

      if (response.data.success) {
        Alert.alert('Success', 'Data registered successfully.');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to submit data. Please try again later.');
    }
  };

  const createFormData = (image, body) => {
    const data = new FormData();

    data.append('image', {
      name: image.filename,
      type: image.mime,
      uri: image.path,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  return (
    <View style={styles.constainer}>
      <View style={{marginHorizontal: ConstNumber.VALUE_16}}>
        <View style={styles.toggleStyle}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: image?.path}}
                style={styles.circularImage}
                resizeMode="cover"
              />

              <Image source={ImageConstants.CAMERA} style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.locationText}>
            {latitude && longitude
              ? `Latitude: ${latitude}, Longitude: ${longitude}`
              : 'Location not available'}
          </Text>
        </View>
        <ButtonScreen
          text={'Current Location'}
          colorsView={'red'}
          textColor={'white'}
          onPress={getCurrentLocation}
        />
        <ButtonScreen
          text={'Submit'}
          colorsView={'#8C63EE'}
          textColor={'white'}
          onPress={submitFormData}
        />

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
              <Text style={styles.modalButtonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default DashboardScreen;
