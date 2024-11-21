import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image} from 'react-native';
import {Contact} from '../types/types';
import {saveContact} from '../services/storage.service';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';

function AddContactScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const createContactObject = (name: string, phone: string): Contact => {
    const contact: Contact = {
      id: String(Date.now().toString()),
      name,
      phone,
    };
    return contact;
  };

  const addContact = async () => {
    const contact: Contact = createContactObject(name, phone);
    await saveContact(contact);
    setName('');
    setPhone('');
    navigation.goBack();
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
      />
      <Button title="Añadir Contacto" onPress={addContact} />
    </View>
  );
}
export default AddContactScreen;
