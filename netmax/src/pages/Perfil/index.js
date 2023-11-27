import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StatusBar } from "react-native";
import apiUser from "../../services/ApiUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const [userData, setUserData] = useState(null);

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
    </>
  );
}