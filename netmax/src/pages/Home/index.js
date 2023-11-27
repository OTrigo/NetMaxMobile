import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api from "../../services/Api";

import style from "./style";

export default function Home() {
  const [Pop, setPop] = useState([]);
  const [now, setNow] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/popular?", {
        params: {
          api_key: "d11518fe4a3ae9e63fdca0c10ffe7186",
          language: "pt-BR",
          page: 2,
        },
      });
      setPop(response.data.results);
      const response2 = await api.get("movie/now_playing?", {
        params: {
          api_key: "d11518fe4a3ae9e63fdca0c10ffe7186",
          language: "pt-BR",
          page: 1,
        },
      });
      setNow(response2.data.results);

      setLoading(false);
    }
    loadFilmes();
  }, []);
  if (loading) {
    return (
      <View className="loading">
        <Text>carregando filme...</Text>
      </View>
    );
  }
  return (
    <View style={style.container}>
      <Text style={style.subtitle}>Filmes mais populares</Text>
      <ScrollView style={style.list} horizontal={true}>
        {Pop.map((filme) => {
          return (
            <View style={style.card} key={filme.id}>
              <Text style={style.title}>{filme.title}</Text>
              <Image
                style={style.img}
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${filme.poster_path}`,
                }}
              />
              <Button
                title="Detalhes do filme"
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("Details", {
                    filmeId: filme.id,
                  });
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      <Text style={style.subtitle}>Filmes mais recentes</Text>
      <ScrollView style={style.list} horizontal={true}>
        {now.map((filmes) => {
          return (
            <View style={style.card} key={filmes.id}>
              <Text style={style.title}>{filmes.title}</Text>
              <Image
                style={style.img}
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${filmes.poster_path}`,
                }}
                alt={filmes.title}
              />
              <Button
                title="Detalhes do filme"
                onPress={() => {
                  navigation.navigate("Details", {
                    filmeId: filmes.id,
                  });
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
