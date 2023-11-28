import TabComp from "../Tab";
import { TextInput, View, Text } from "react-native";
import { useState } from "react";
import apiUser from "../../services/ApiUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import style from "./style";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  async function handleLogin(email, senha) {
    const response = await apiUser.post("/login", {
      email: email,
      senha: senha,
    });
    console.log(response);

    if (response.status == 200) {
      setLogin(true);
      console.log(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.id));
    } else {
      setMessage("erro ao fazer o login");
    }
  }

  if (login) {
    return <TabComp />;
  }

  return (
    <View style={style.container}>
      <View style={style.card}>
        <StatusBar />
        <Text style={style.text}>Email:</Text>
        <TextInput style={style.input} value={email} onChangeText={setEmail} />
        <Text style={style.text}>Senha:</Text>
        <TextInput style={style.input} value={senha} onChangeText={setSenha} />
        <TouchableOpacity
          style={style.login}
          onPress={() => handleLogin(email, senha)}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Logar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Text style={style.create}>Não tenho conta</Text>
        </TouchableOpacity>
        <Text>{message}</Text>
      </View>
    </View>
  );
}
