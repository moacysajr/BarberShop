import React from 'react';


import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #63C2D1;
    padding: 20px;
`;

export const ProfileHeader = styled.View`
    align-items: center;
    margin-bottom: 20px;
`;

export const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 10px;
`;

export const ProfileName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333333;
`;

export const ButtonArea = styled.View`
    margin-top: 20px;
`;

export const ProfileButton = styled.TouchableOpacity`
    height: 50px;
    background-color: #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const ProfileButtonText = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
`;
