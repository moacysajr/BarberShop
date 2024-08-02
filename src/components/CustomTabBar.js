import React, {useContext} from "react";
import styled from "styled-components"; 

import {UserContext} from '../contexts/UserContext';



import HomeIcon from '../assests/home.svg';
import SearchIcon from '../assests/search.svg';
import TodayIcon from '../assests/today.svg';
import FavoriteIcon from '../assests/favorite.svg';
import AccountIcon from '../assests/account.svg';



const TabArea = styled.View`
        height: 60px;
        background-color: #4EADBE;
        flex-direction: row;
    `;

    const TabItem = styled.TouchableOpacity`
    flex:1;
    justify-content: center;
    align-items: center;

    `;

    const TabItemCenter= styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -20px;

    `;

    const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;


//incones da tab bar
export default ({state, navigation}) => {



    const { state:user } = useContext(UserContext);

    // função para ficar maais pratico a tab bar
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }
 
    return (
  
        //style={{opacity:state.index===0/ 1 : 0.5}}   
      
      <TabArea>
               
           
                <TabItem onPress={()=>goTo('Home')}>
                    <HomeIcon style={{opacity:state.index===0? 1 : 0.5}} width='24' height='24' fill="#FFFFFF"/>
                </TabItem>

                <TabItem onPress={()=>goTo('Search')}>
                    <SearchIcon style={{opacity:state.index===1? 1 : 0.5}} width='24' height='24' fill="#FFFFFF"/>
                </TabItem>

                <TabItemCenter onPress={()=>goTo('Appointments')}>
                    <TodayIcon  width='32' height='32' fill="#4EADBE"/>
                </TabItemCenter>

                <TabItem onPress={()=>goTo('Favorites')}>
                    <FavoriteIcon style={{opacity:state.index===3? 1 : 0.5}} width='24' height='24' fill="#FFFFFF"/>
                </TabItem>

                <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                }
                    
                
                   
                </TabItem>


        </TabArea>
    );
}
