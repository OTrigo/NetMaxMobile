import { View } from "react-native"
import { Text } from "react-native"
import apiUser from '../../services/ApiUser' 


const ID_CLIENT = 2;

// const response =  await apiUser.get(`/${ID_CLIENT}`);

// console.log(response);

export default function Perfil(){
    return (
        <View>
            <Text>
                Perfil
            </Text>
        </View>
    )
}