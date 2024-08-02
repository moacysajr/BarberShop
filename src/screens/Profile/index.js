import React from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { Container, ButtonArea, ProfileButton, ProfileButtonText, ProfileHeader, ProfileImage, ProfileName } from './styles';
import { useNavigation } from '@react-navigation/native';
import Preload from '../Appointments';

import Api from '../../Api';



export default () => {

    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{ name: '' }]
        });
    };

    const handleEditProfile = () => {
        // Navegar para a tela de edição de perfil
        navigation.navigate('EditProfile');
    };

    const handleViewSchedule = () => {
        // Navegar para a tela de visualização de agendamentos
        navigation.navigate('Appointments');
    };

    return (
        <Container>
            <ProfileHeader>
                <ProfileImage  />
                <ProfileName>Nome do Barbeiro</ProfileName>
            </ProfileHeader>
            <ButtonArea>
                <ProfileButton onPress={handleEditProfile}>
                    <ProfileButtonText>Editar Perfil</ProfileButtonText>
                </ProfileButton>
                <ProfileButton onPress={handleViewSchedule}>
                    <ProfileButtonText>Visualizar Agendamentos</ProfileButtonText>
                </ProfileButton>
                <ProfileButton onPress={handleLogoutClick}>
                    <ProfileButtonText>Sair</ProfileButtonText>
                </ProfileButton>
            </ButtonArea>
        </Container>
    );
};
