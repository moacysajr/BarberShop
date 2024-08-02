import react from "react";
import {createStackNavigator} from '@react-navigation/stack';

// Importar as telas 
import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import MainTab from "../stacks/MainTab";
import Barber from "../screens/Barber";
// criar o navegador de telas 
const Stack =createStackNavigator();

export default () => (

    <Stack.Navigator
    initialRouteName="MainTab" // tela inicial
        screenOptions={{
            
            headerShown: false // tirar o cabeçalho das telas 
        }}
    
    >
            <Stack.Screen name = "Preload" component ={Preload} // tela de carregamento
           Options={{headerShown: false}}/>
            <Stack.Screen name = "SignIn" component ={SignIn} // tela de login
            Options={{headerShown: false}}/>
            <Stack.Screen name = "SignUp" component ={SignUp} //tela de cadastro
            Options={{headerShown: false}}/>
            <Stack.Screen name = "MainTab" component ={MainTab}  // tela principal 
           Options={{headerShown: false}}/>
            <Stack.Screen name = "Barber" component ={Barber} // tela do barbeiro
           Options={{headerShown: false}}/>
            
       

    </Stack.Navigator>
);