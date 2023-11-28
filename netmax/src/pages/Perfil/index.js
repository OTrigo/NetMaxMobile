import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StatusBar, Button } from "react-native";
import apiUser from "../../services/ApiUser";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "./style";

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
        setNome(userData.nome);
        setEmail(userData.email);
        setSenha(userData.senha);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  async function handleUpdate() {
    const ID_CLIENT = await AsyncStorage.getItem("user");
    const response = await apiUser.put(`${ID_CLIENT}`, {
      nome: nome,
      email: email,
      cpf: userData?.cpf,
      DataNascimento: userData?.DataNascimento,
      senha: senha,
    });
    console.log(response);
    if (response.status == 201) {
      navigation.navigate("Login");
    }
  }

  async function handleDelete() {
    const ID_CLIENT = await AsyncStorage.getItem("user");
    try {
      const response = await apiUser.delete(`${ID_CLIENT}`);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StatusBar />
      {userData !== null ? (
        <View style={style.container}>
          <View style={style.card}>
            <Text style={style.text}>Nome:</Text>
            <TextInput
              style={style.input}
              value={nome}
              onChangeText={setNome}
            />
            <Text style={style.text}>Email:</Text>
            <TextInput
              style={style.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={style.text}>CPF:</Text>
            <TextInput
              style={style.disabledInput}
              value={userData.cpf}
              editable={false}
            />
            <Text style={style.text}>Data de nascimento:</Text>
            <TextInput
              style={style.disabledInput}
              placeholder={userData.DataNascimento}
              editable={false}
            />
            <Text style={style.text}>Senha:</Text>
            <TextInput
              style={style.input}
              value={senha}
              onChangeText={setSenha}
            />
            <Button title="Atualizar" onPress={() => handleUpdate()} />
            <Button title="Deletar Conta" onPress={() => handleDelete()} />
          </View>
        </View>
      ) : (
        <View style={style.container}>
          <Text style={style.text}>Carregando informações...</Text>
        </View>
      )}
    </>
  );
}
