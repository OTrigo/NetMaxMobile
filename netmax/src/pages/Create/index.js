import { View, Text, Button, TextInput } from "react-native"
import { useState } from "react"
import apiUser from "../../services/ApiUser"
import { useNavigation } from "@react-navigation/native"


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


    return(
        <View>
            <Text>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome}/>
            <Text>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
            <Text>CPF:</Text>
            <TextInput style={styles.input} value={cpf} onChangeText={setCpf}/>
            <Text>Data de nascimento:</Text>
            <TextInput placeholder="YYYY/MM/DD" style={styles.input} value={dataN} onChangeText={setDataN}/>
            <Text>Senha:</Text>
            <TextInput style={styles.input} value={senha} onChangeText={setSenha}/>
            <Button title='Criar' onPress={
                ()=>handleCreate()
            } />
        </View>
    )
};