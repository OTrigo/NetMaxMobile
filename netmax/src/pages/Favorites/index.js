import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

function Favorites(){
    const [filmes, setFilmes] = useState([]);

    
    useFocusEffect(
      React.useCallback(() => {
        async function load(){
          const minhaLista = await AsyncStorage.getItem("@netmax");
          setFilmes(JSON.parse(minhaLista) || []);
        }
        load()
        
      }, [])
    )

    async function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return(item.id !== id);
        })
        setFilmes(filtroFilmes);
        await AsyncStorage.setItem("@netmax", JSON.stringify(filtroFilmes));
        console.log("Filme excluido sucesso");
    }


    return(
        <View>
            <Text>Meus Filmes</Text>
            {filmes.map((item)=>{
                    return(
                        <View key={item.id}>
                            <Text>{item.title}</Text>
                            <View>
                                <Button title="excluir" onPress={()=>excluirFilme(item.id)}/>
                            </View>
                        </View>
                    )
                })}
        </View>
    )
}
export default Favorites;