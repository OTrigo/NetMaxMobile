import Perfil from './src/pages/Perfil';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './src/pages/Favorites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'react-native';


export default function App() {
  
const Tab = createBottomTabNavigator();



  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#171515'}/>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarActiveTintColor: '#F799f5',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveBackgroundColor: 'black',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={'#F799f5'} size={26} />
            ),
          }}
        
        />
        <Tab.Screen name="Favorites" component={Favorites}
          options={{
            headerShown: false,
            tabBarLabel: 'Favorite',
            tabBarActiveTintColor:'red',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveBackgroundColor: 'black',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="heart-outline" color={'red'} size={26} />
            ),
          }}
          
        />
        <Tab.Screen name="Details"
         options={{
          headerShown: false,
          tabBarLabel: 'Detail',
          tabBarInactiveBackgroundColor: 'black',
          tabBarActiveBackgroundColor: 'black',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="movie-open" color={color} size={26} />
          ),
        }}
         component={Detail}
         
         />
        <Tab.Screen name="Settings"
          options={{
            headerShown: false,
            tabBarLabel: 'Favorite',
            tabBarInactiveBackgroundColor: 'black',
            tabBarActiveBackgroundColor: 'black',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
          component={Perfil}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

