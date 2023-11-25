import { Text, View, Image, ScrollView, TouchableOpacity, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api from "../../services/Api";



export default function Home(){
    const [Pop, setPop] = useState([]);
    const [now, setNow] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/popular?",{
                params:{
                    api_key:"d11518fe4a3ae9e63fdca0c10ffe7186",
                    language:"pt-BR",
                    page:2,
                }
            })
            setPop(response.data.results);
            const response2 = await api.get("movie/now_playing?",{
                params:{
                    api_key:"d11518fe4a3ae9e63fdca0c10ffe7186",
                    language:"pt-BR",
                    page:1,
                }
            })
            setNow(response2.data.results);



            setLoading(false);
        }
        loadFilmes();
    },[])
    if(loading){
        return(
            <View className="loading">
                <Text>carregando filme...</Text>
            </View>
        )
    }
    return(
        <View className="container">

            <ScrollView className="lista-filmes" horizontal={true}>
                {Pop.map((filme)=>{
                    return(
                        <View key={filme.id}>
                            <Text>{filme.title}</Text>
                            <Image style={{width:300, height:300}} source={{uri:`https://image.tmdb.org/t/p/original/${filme.poster_path}`}} alt={filme.title}/>
                            <Button
                                title="Go to Details"
                                onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigation.navigate('Details', {
                                    filmeId: filme.id,
                                });
                                }}
                            />
                        </View >
                    )
                })}
            </ScrollView>
            <ScrollView className="lista-filmes" horizontal={true}>
                {now.map((filmes)=>{
                    return(
                        <View key={filmes.id}>
                            <Text>{filmes.title}</Text>
                            <Image style={{width:300, height:300}} source={{uri:`https://image.tmdb.org/t/p/original/${filmes.poster_path}`}} alt={filmes.title}/>
                            <Button
                                title="Go to Details"
                                onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigation.navigate('Details', {
                                    filmeId: filmes.id,
                                });
                                }}
                            />
                        </View >
                    )
                })}
            </ScrollView>
        </View>
    )
}