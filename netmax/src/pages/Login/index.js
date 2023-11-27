import TabComp from '../Tab'
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import apiUser from '../../services/ApiUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';




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
        marginBottom: '5%',
        backgroundColor: "#f0f0f0"
    },
    text:{
        marginStart: '5%',
        color: "#f0f0f0"

    },
    card:{
        marginTop: '50%',
    },
    container:{
        backgroundColor: "#151517",
        height: "100%",
    },
    login:{
        width:'80%',
        alignSelf: 'center',
        backgroundColor: '#1010f1',
        paddingHorizontal: 10,
        paddingVertical: 9,
        borderRadius: 5,
    },
    create:{
        textAlign: 'center',
        color: '#f11010',
        marginTop: 15
    }
    })



    if(login){
        return(
        <TabComp/>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <StatusBar/>
                <Text style={styles.text}>Email:</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
                <Text style={styles.text}>Senha:</Text>
                <TextInput style={styles.input} value={senha} onChangeText={setSenha}/>
                <TouchableOpacity style={styles.login} onPress={
                    ()=>handleLogin(email, senha )
                }>

                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Logar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={
                    ()=>navigation.navigate('Create')
                }>
                    <Text style={styles.create}>Não tenho conta</Text>
                </TouchableOpacity>
                <Text>{message}</Text>
            </View>
        </View>
    );
}