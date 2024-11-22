import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact } from "../types/types";

const CONTACT_KEYS: string = '@contacts';

export const saveContact = async (newContact: Contact) => {
    try {
        const storedContacts = await AsyncStorage.getItem(CONTACT_KEYS);        
        const contacts = storedContacts ? JSON.parse(storedContacts) : [];   
        contacts.push(newContact);
        await AsyncStorage.setItem(CONTACT_KEYS, JSON.stringify(contacts));
    } catch (error) {
        console.error('Error saving contact:', error);
    }
};

export const getContacts = async () => {
    try {
         const contacts = await AsyncStorage.getItem(CONTACT_KEYS);   
         return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
        console.error('Error getting contacts:', error);
        return [];
    }
}

export const deleteContact = async (contactId: string, navigation: any) => { 
    try { 
        console.log('contactId', contactId);
        
        const storedContacts = await AsyncStorage.getItem(CONTACT_KEYS);        
        let contacts = storedContacts ? JSON.parse(storedContacts) : [];
        contacts = contacts.filter((contact: Contact) => contact.id !== contactId); 
        await AsyncStorage.setItem(CONTACT_KEYS, JSON.stringify(contacts));
        navigation.navigate('Home');
     } catch (e) { 
        console.error('Error eliminando el contacto:', e); 
    } 
};


