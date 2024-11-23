import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import {Contact, RootStackParamList} from '../types/types';
import {getContacts} from '../services/storage.service';
import styles from '../styles';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isFocused = useIsFocused();

  const [contacts, setContacts] = useState<Contact[]>([]);

  const loadContacts = async () => {
    const storedContacts = await getContacts();
    setContacts(storedContacts);
  };

  useEffect(() => {
    if (isFocused) {
      loadContacts();
    }
  }, [isFocused]);

  const renderItem = ({item}: {item: Contact}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Details', {id: item.id})}>
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Contacts</Text>
      <View>
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      <Button
        title="Añadir Contacto"
        onPress={() => navigation.navigate('AddContact')}
      />
    </View>
  );
}
export default HomeScreen;
