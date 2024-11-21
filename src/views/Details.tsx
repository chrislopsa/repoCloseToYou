import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {StackNavigationProp} from '@react-navigation/stack';

type Prop = StackNavigationProp<RootStackParamList, 'Details'>;

function DetailsScreen() {
  const navigation = useNavigation<Prop>();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Contact Details</Text>
      <Button title="Go to home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default DetailsScreen;
