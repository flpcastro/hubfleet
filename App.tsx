import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './src/screens/SignIn/styles';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  return (
    <>
      <SignIn />
    </>
  );
}
