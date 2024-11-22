import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from '../styles';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {Contact, RootStackParamList} from '../types/types';
import {getContacts, deleteContact} from '../services/storage.service';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type Props = {
  route: DetailsScreenRouteProp;
};

function DetailsScreen({route}: Props) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);

  const {id} = route.params;

  useEffect(() => {
    const getContactDetails = async () => {
      try {
        const contacts: Contact[] = await getContacts();
        const contact: Contact | undefined = contacts.find(
          cont => cont.id === id,
        );
        if (contact) {
          setName(contact.name);
          setPhone(contact.phone);
          setImage(contact.image);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getContactDetails();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.contactName}>Name: {name}</Text>
      <Text style={styles.contactName}>Phone: {phone}</Text>
      {image && (
        <Image source={{uri: image}} style={{width: 100, height: 100}} />
      )}
      <Button
        title="Eliminar Contacto"
        onPress={() => deleteContact(id, navigation)}
      />
    </View>
  );
}
export default DetailsScreen;
