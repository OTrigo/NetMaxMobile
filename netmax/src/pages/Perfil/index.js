import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StatusBar, Button } from "react-native";
import apiUser from "../../services/ApiUser";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native-web";

export default function Perfil() {
  const [userData, setUserData] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ID_CLIENT = await AsyncStorage.getItem("user");
        const response = await apiUser.get(`/${ID_CLIENT}`);
        setUserData(response.data.data);
        setNome(userData?.nome)
        setEmail(userData?.email)
        setSenha(userData?.senha)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  async function handleUpdate() {
    const ID_CLIENT = await AsyncStorage.getItem("user");
    const response = await apiUser.put(`user/${ID_CLIENT}`, {
      nome: nome,
      email: email,
      cpf: userData?.cpf,
      dataNascimento: userData?.dataNascimento,
      senha: senha,
    });

    console.log(response)
    if (response.status == 201) {
      navigation.navigate("Login");
    }
  }

  const styles = StyleSheet.create({
    input: {
      height: "8%",
      width: "90%",
      alignSelf: "center",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: "5%",
      backgroundColor: "#f0f0f0",
    },
    disabledInput:{
      height: "8%",
      width: "90%",
      alignSelf: "center",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: "5%",
      backgroundColor: "#41414d",
      color: "white"
    },
    text: {
      marginStart: "5%",
      color: "#f0f0f0",
    },
    container: {
      backgroundColor: "#151517",
      height: "100%",
    },
  });

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        {userData && (
          <View style={styles.card}>
            <Text style={styles.text}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
            <Text style={styles.text}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.text}>CPF:</Text>
            <TextInput
              style={styles.disabledInput}
              value={userData.cpf}
              editable={false}
            />
            <Text style={styles.text}>Data de nascimento:</Text>
            <TextInput
              style={styles.disabledInput}
              placeholder={userData.dataNascimento}
              editable={false}
            />
            <Text style={styles.text}>Senha:</Text>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />
            <Button title="Criar" onPress={() => handleUpdate()} />
          </View>
        )}
      </View>
    </>
  );
}
