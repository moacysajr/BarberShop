import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar as telas 
import CustomTabBar from '../components/CustomTabBar';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();



    export default () => (
        //telas e importação da minha propia tabBar
        <Tab.Navigator tabBar={props=><CustomTabBar{...props}/>}>
        <Tab.Screen name="Home" component={Home} //tela inicial 
        options={{ headerShown: false }}/>
        <Tab.Screen name="Search" component={Search} // tela de pesquisa 
         options={{ headerShown: false }}/>
        <Tab.Screen name="Appointments" component={Appointments} //tela de ageneda
         options={{ headerShown: false }}/>
        <Tab.Screen name="Favorites" component={Favorites} //tela de favoritos
         options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={Profile} //tela de perfil 
         options={{ headerShown: false }}/>
    </Tab.Navigator>
);