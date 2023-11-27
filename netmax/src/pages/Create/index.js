import { View, Text, Button, TextInput } from "react-native"
import { useState } from "react"
import apiUser from "../../services/ApiUser"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native-web"


export default function Create(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [dataN, setDataN] = useState()
    const [cpf, setCpf] = useState('')

    const navigation = useNavigation()


    async function handleCreate(){
        const response = await apiUser.post('/create', {
            "nome":nome,
            "email":email,
            "cpf":cpf,
            "dataNascimento":dataN,
            "senha":senha
        })
        if(response.status == 201){
            navigation.navigate('Login')
        }
    }
    const styles = StyleSheet.create({
        input:{
            height: '8%',
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
        container:{
            backgroundColor: "#151517",
            height: "100%",
        },
        })


    return(
        <View style={styles.container}>
            <View  style={styles.card}>
                <Text style={styles.text}>Nome:</Text>
                <TextInput style={styles.input} value={nome} onChangeText={setNome}/>
                <Text style={styles.text}>Email:</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
                <Text style={styles.text}>CPF:</Text>
                <TextInput style={styles.input} value={cpf} onChangeText={setCpf}/>
                <Text style={styles.text}>Data de nascimento:</Text>
                <TextInput placeholder="YYYY/MM/DD" style={styles.input} value={dataN} onChangeText={setDataN}/>
                <Text style={styles.text}>Senha:</Text>
                <TextInput style={styles.input} value={senha} onChangeText={setSenha}/>
                <Button title='Criar' onPress={
                    ()=>handleCreate()
                } />
            </View>
        </View>
    )
};