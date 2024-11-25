import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, Alert} from 'react-native';
import {Contact, RootStackParamList} from '../types/types';
import {saveContact} from '../services/storage.service';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type CameraScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

function AddContactScreen() {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);

  const createContactObject = (
    name: string,
    phone: string,
    image: string | undefined,
  ): Contact => {
    const contact: Contact = {
      id: String(Date.now().toString()),
      name,
      phone,
      image,
    };
    return contact;
  };

  const addContact = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    const contact: Contact = createContactObject(name, phone, image);
    await saveContact(contact);
    setName('');
    setPhone('');
    setImage('undefined');
    navigation.navigate('Home');
  };

  const openCamera = async () => {
    try {
      const options: CameraOptions = {
        mediaType: 'photo',
        quality: 0.5,
        saveToPhotos: false,
      };

      const response = await launchCamera(options);

      if (response.didCancel) {
        console.log('User cancelled camera');
        return;
      }

      if (response.errorCode) {
        console.log('Camera Error:', response.errorMessage);
        Alert.alert('Error', 'Hubo un problema al tomar la foto');
        return;
      }

      if (response.assets && response.assets[0]) {
        console.log(response.assets);

        const asset: Asset = response.assets[0];
        console.log(asset.uri);

        setImage(asset.uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const openGallery = async () => {
    try {
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.5,
        selectionLimit: 1,
      };

      const response = await launchImageLibrary(options);

      if (response.didCancel) {
        console.log('User cancelled gallery');
        return;
      }

      if (response.errorCode) {
        console.log('Gallery Error:', response.errorMessage);
        Alert.alert('Error', 'Hubo un problema al seleccionar la imagen');
        return;
      }

      if (response.assets && response.assets[0]) {
        setImage(response.assets[0].uri); // Cambiado de base64 a uri
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa el Nombre"
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Ingresa el Telefono"
        keyboardType="phone-pad"
      />
      <CustomButton
        title="Tomar una foto"
        onPress={() => {
          openCamera();
        }}
      />
      <CustomButton
        title="Seleccionar imagen de la Galería"
        onPress={() => {
          openGallery();
        }}
      />
      {image && <Image source={{uri: image}} style={styles.image} />}
      <CustomButton
        title="Añadir Contacto"
        onPress={() => {
          addContact();
        }}
      />
    </View>
  );
}
export default AddContactScreen;
