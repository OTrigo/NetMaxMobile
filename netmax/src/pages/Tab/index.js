import Perfil from "../Perfil";
import Home from "../Home";
import Detail from "../Detail";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../Favorites";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "react-native";

export default function TabComp() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar backgroundColor={"#171515"} />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            
            tabBarInactiveBackgroundColor: "black",
            tabBarActiveBackgroundColor: "black",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            headerShown: false,
            tabBarLabel: "Favorite",
            tabBarActiveTintColor: "red",
            tabBarInactiveBackgroundColor: "black",
            tabBarActiveBackgroundColor: "black",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="heart-outline"
                color={"red"}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          options={{
            headerShown: false,
            tabBarLabel: "Detail",
            tabBarInactiveBackgroundColor: "black",
            tabBarActiveBackgroundColor: "black",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="movie-open"
                color={color}
                size={26}
              />
            ),
          }}
          component={Detail}
        />
        <Tab.Screen
          name="Perfil"
          options={{
            headerShown: false,
            tabBarLabel: "Perfil",
            tabBarInactiveBackgroundColor: "black",
            tabBarActiveBackgroundColor: "black",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={26}
              />
            ),
          }}
          component={Perfil}
        />
      </Tab.Navigator>
    </>
    
  );
}
