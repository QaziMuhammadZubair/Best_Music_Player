import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Music_list from '../Screen/Music_list'
import Player from '../Screen/Player'
import Play_list from '../Screen/Play_list'
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
const Tab =createBottomTabNavigator()

 const App_navigation=()=> {
  return <Tab.Navigator>
    <Tab.Screen name='Music_list' component={Music_list} options={{
        tabBarIcon:({size,color})=>{
            return <MaterialIcons name="headset" size={size} color={color} />
        }
    }}/>
    <Tab.Screen name='Player' component={Player} options={{
        tabBarIcon:({size,color})=>{
            return <FontAwesome5 name="compact-disc" size={size} color={color} />
        }
    }}/>
    <Tab.Screen name='Play_list' component={Play_list} options={{
        tabBarIcon:({size,color})=>{
            return <MaterialIcons name="library-music" size={size} color={color} />
        }
    }}/>
  </Tab.Navigator>
}
export default App_navigation;
