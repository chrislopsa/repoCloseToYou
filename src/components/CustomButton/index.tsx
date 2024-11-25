import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}
const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
