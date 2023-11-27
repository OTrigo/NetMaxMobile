
import TabComp from './src/pages/Tab'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, TextInput, View } from 'react-native';
import { useState } from 'react';
import apiUser from './src/services/ApiUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
const Tab = createBottomTabNavigator();
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [login, setLogin] = useState(false);

async function handleLogin(email, senha){
  const response =  await apiUser.post('/login',
    {
      email: email,
      senha: senha
    })
    console.log(response)

  if(response.status == 200){
    setLogin(true);
    
  }

}



  if(login){
    return(
      <TabComp/>
    )
  }

  return (
    <View>
      <TextInput value={email} onChangeText={()=>{setEmail}}/>
      <TextInput/>
      <Button title='logar' onPress={
        ()=>handleLogin('matheus@email', '12345' )
      } />
    </View>
  );
}

