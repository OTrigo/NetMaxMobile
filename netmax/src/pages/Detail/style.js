import { StyleSheet } from "react-native";



export default styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#171515",
    },
    list:{
        height: '50%',
    },
    subtitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f0f0f0',
        alignSelf: 'center'
    },
    title:{
        fontSize: 15,
        color: '#f0f0f0',
        marginStart: '2%'
        
    },
    btnView:{
        alignItems:'stretch',
        flexDirection: 'row'
    },
    btn:{
        width: '50%',
        backgroundColor: '#0533f3',
        paddingHorizontal: 30,
        paddingVertical: 5,
        textAlign: "center",
        marginStart: '2%',
        borderRadius: 5
    },
    img:{
        width: '80%',
        height: '50%',
        borderRadius: 5
    }
})