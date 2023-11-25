import Perfil from './src/pages/Perfil';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './src/pages/Favorites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function App() {
  
const Tab = createBottomTabNavigator();



  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarActiveTintColor: '#F799f5',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={'#F799f5'} size={26} />
            ),
          }}
        
        />
        <Tab.Screen name="Favorites" component={Favorites}
          options={{
            tabBarLabel: 'Favorite',
            tabBarActiveTintColor:'red',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="heart-outline" color={'red'} size={26} />
            ),
          }}
          
        />
        <Tab.Screen name="Settings" component={Perfil} />
        <Tab.Screen name="Details" component={Detail}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

