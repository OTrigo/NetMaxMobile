import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StatusBar, Button } from "react-native";
import apiUser from "../../services/ApiUser";
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native-web"

export default function Perfil() {
  const [userData, setUserData] = useState(null);
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [dataN, setDataN] = useState()
  const [cpf, setCpf] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ID_CLIENT = await AsyncStorage.getItem("user");
        const response = await apiUser.get(`/${ID_CLIENT}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation()

  async function handleUpdate(){
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

  return (
    <>
      <StatusBar/>
      <View>
        {userData && (
          <>
            <Text>Nome:</Text>
            <TextInput value={userData.nome} />
            <Text>Email:</Text>
            <TextInput value={userData.email} />
            <Text>Senha:</Text>
            <TextInput value={userData.senha} />
            <Text>Data de Nascimento: {userData.DataNascimento}</Text>
            <Text>CPF: {userData.cpf}</Text>
          </>
        )}
      </View>

      <View style={styles.container}>
            <View  style={styles.card}>
                <Text style={styles.text}>Nome:</Text>
                <TextInput style={styles.input} value={userData.nome} onChangeText={setNome}/>
                <Text style={styles.text}>Email:</Text>
                <TextInput style={styles.input} value={userData.email} onChangeText={setEmail}/>
                <Text style={styles.text}>CPF:</Text>
                <TextInput style={styles.input} value={userData.cpf} onChangeText={setCpf}/>
                <Text style={styles.text}>Data de nascimento:</Text>
                <TextInput placeholder="YYYY/MM/DD" style={styles.input} value={userData.dataNascimento} onChangeText={setDataN}/>
                <Text style={styles.text}>Senha:</Text>
                <TextInput style={styles.input} value={userData.senha} onChangeText={setSenha}/>
                <Button title='Criar' onPress={
                    ()=>handleUpdate()
                } />
            </View>
        </View>
    </>
  );
}
