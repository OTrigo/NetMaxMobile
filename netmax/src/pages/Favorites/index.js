import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function Favorites(){
  useEffect(() => {
    loadMovies();
  }, [movies]);
  const [movies, setMovies] = useState([])
  let data = []

  async function loadMovies(){
    data = await AsyncStorage.getItem('movies')
    setMovies(JSON.parse(data))
    
  };


  return(
    <View>
      
    </View>
    
  )
}