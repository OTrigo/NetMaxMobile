import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import style from "./style";

function Favorites() {
  const [filmes, setFilmes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function load() {
        const minhaLista = await AsyncStorage.getItem("@netmax");
        setFilmes(JSON.parse(minhaLista) || []);
      }
      load();
    }, [])
  );

  async function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    await AsyncStorage.setItem("@netmax", JSON.stringify(filtroFilmes));
    console.log("Filme excluido sucesso");
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Meus Filmes</Text>
      {filmes.length === 0 && (
        <Text style={style.subtitle}>Você não possui nenhum filme salvo!</Text>
      )}
      {filmes.map((item) => {
        return (
          <View style={style.card} key={item.id}>
            <Text style={style.subtitle}>{item.title}</Text>
            <TouchableOpacity
              style={style.del}
              onPress={() => excluirFilme(item.id)}
            >
              <Text>Excluir</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
export default Favorites;
