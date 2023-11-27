import TabComp from '../Tab'
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import apiUser from '../../services/ApiUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export default function Login() {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [login, setLogin] = useState(false);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();


    async function handleLogin(email, senha){
    const response =  await apiUser.post('/login',
        {
        email: email,
        senha: senha
        })
        console.log(response)

    if(response.status == 200){
        setLogin(true);
        console.log(response.data)
        await AsyncStorage.setItem('user', JSON.stringify(response.data.id));
        
    }else{
        setMessage('erro ao fazer o login')
    }

    }
    const styles = StyleSheet.create({
    input:{
        height: '13%',
        width: '90%',
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: '5%'
    },
    text:{
        marginStart: '5%',

    },
    container:{
        marginTop: '50%',

    },
    })



    if(login){
        return(
        <TabComp/>
        )
    }

    return (
        <View style={styles.container}>
        <StatusBar/>
        <Text style={styles.text}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
        <Text style={styles.text}>Senha:</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha}/>
        <Button title='logar' onPress={
            ()=>handleLogin(email, senha )
        } />
        <Button title='não tenho conta
        ' onPress={
            ()=>navigation.navigate('Create')
        } />
        <Text>{message}</Text>
        </View>
    );
}