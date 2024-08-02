
import React, {useEffect,useContext } from 'react';
import { Container,LoadignIcon } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../contexts/UserContext';

import { useNavigation } from '@react-navigation/native';

import BarberLogo from '../../assests/barber.svg'

import Api from '../../Api';


export default () => {
    
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const chekToken = async () =>{
            const token= await AsyncStorage.getItem('token');
            if (token) {
                let res = await Api.checkToken(token);
                if(res.token){
                    await AsyncStorage.setItem('token',res.token);

                     userDispatch({
                    type:"setAvatar",
                    payload:{
                        avatar:res.data.avatar
                    }
                });
                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
    

                }else {
                    navigation.navigate('SignIn');
                }
              

            } else{
                navigation.navigate('SignIn');
            }
        }
        chekToken();

    },[]);

    return(
        <Container>
            <BarberLogo width="100%" height="160"/>
            <LoadignIcon size="large" color="#white" />
        </Container>
    );
}