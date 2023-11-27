import { View } from "react-native"
import { Text } from "react-native"
import apiUser from '../../services/ApiUser' 
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = async ()=>{
    try{
        const ID_CLIENT = await AsyncStorage.getItem('user')
        const response = async () =>  await apiUser.get(`/${ID_CLIENT}`);
        console.log(response)
    }
    catch(error){
        console.error(error)
    }
}

getUserData()

// console.log(response);

export default function Perfil(){
    return (
        <View>
            <Text>
                {"Poggers"}
            </Text>
        </View>
    )
}