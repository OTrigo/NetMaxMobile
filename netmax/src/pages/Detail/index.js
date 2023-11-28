import { View, Text, TouchableOpacity, Image, AppState } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/Api";
import style from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail({ route }) {
  const { filmeId } = route.params || 901362;
  const [detail, setDetail] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function saveMovie() {
    const minhasLista = await AsyncStorage.getItem("@netmax");
    let filmesSalvos = JSON.parse(minhasLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvos) => filmesSalvos.id === detail.id
    );

    if (hasFilme) {
      console.log("Esse filme ja está na lista");
      return;
    }
    filmesSalvos.push(detail);
    await AsyncStorage.setItem("@netmax", JSON.stringify(filmesSalvos));
    console.log("Filme salvo com sucesso");
  }

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(`/movie/${filmeId}`, {
          params: {
            api_key: "d11518fe4a3ae9e63fdca0c10ffe7186",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setDetail(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigation.navigate("Home");
          return;
        });
    }
    loadFilmes();
  }, [filmeId]);
  if (loading) {
    return (
      <View className="loading">
        <Text>carregando filme...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Text style={style.subtitle}>{detail.title}</Text>
      <Image
        style={style.img}
        source={{
          uri: `https://image.tmdb.org/t/p/original/${detail.backdrop_path}`,
        }}
      />
      <Text style={[style.subtitle, { alignSelf: "flex-start" }]}>
        Sinopse:
      </Text>
      <Text style={style.title}>{detail.overview}</Text>
      <Text style={[style.subtitle, { alignSelf: "flex-start" }]}>
        Avaliação: {detail.vote_average}
      </Text>

      <View style={style.btnView}>
        <TouchableOpacity style={style.btn} onPress={saveMovie}>
          <Text style={[style.title, { textAlign: "center" }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
