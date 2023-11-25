
import TabComp from './src/pages/Tab'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, TextInput, View } from 'react-native';
import { useState } from 'react';


export default function App() {
  
const Tab = createBottomTabNavigator();
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [login, setLogin] = useState(false);



  if(login){
    return(
      <TabComp/>
    )
  }

  return (
    <View>
      <TextInput/>
      <TextInput/>
      <Button title='logar' onPress={()=>setLogin(true)} />
    </View>
  );
}

