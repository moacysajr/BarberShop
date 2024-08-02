import React, {useState, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackIcon from '../../assests/back.svg';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import FavoriteIcon from '../../assests/favorite.svg';
import NavPrevIcon from '../../assests//nav_prev.svg';
import NavNextIcon from '../../assests//nav_next.svg';
import FavoriteFullIcon from '../../assests/favorite_full.svg';

import { 
    Container,
    Scroller,
    BackButton,
    LoadingIcon,
    PageBody,

    SwaipDot,
    SwipeDotActive,
    SwipeImage,
    SwipeItem,
    FakeSwiper,

    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,

    ServiceArea,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText,
    ServiceTitle,

    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody,




} from './styles';



import Api from '../../Api';


export default () => {

    const navigation=useNavigation ();

    const route = useRoute();

    const  [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar:route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,


    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectService] = useState(null);
    const [showModal, setShouModal] = useState(false);

 useEffect(() => {
    const getBarberInfo = async () => {
       
            let json = await Api.getBarber(userInfo.id);
            console.log('JSON retornado pela API:', json); 
            if (json.error === '') {
                setUserInfo(json.data);
                setFavorited(json.data.favorited);

               
            } else {
                alert("Erro: " + json.error);
            }

           setLoading(false);
    }

    getBarberInfo();
}, []);

const handleBackButton = () =>{
    navigation.goBack();

}

const handleFavClick = () => {
    setFavorited ( !favorited);
    Api.setFavorite( userInfo.id);
}

const handleServiceChoose = (key) =>{
        setSelectService(key);
        setShouModal(true);

}

    
    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length> 0 ?
                    <Swiper
                        style={{height:240}}
                        dot={<SwaipDot/>}
                        activeDot={<SwipeDotActive/>}
                        paginationStyle={{top:15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                        
                    >

                        {userInfo.photos.map((item,key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}}  resizeMode="cover" />                   
                                   </SwipeItem>

                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
            
            
            }

                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar }}/>
                            <UserInfo>
                                <UserInfoName>{userInfo.name}</UserInfoName>
                                <Stars stars={userInfo.stars} shouwNumber={true} />

                            </UserInfo>
                            <UserFavButton onPress={handleFavClick}>
                                {favorited ? 
                                 <FavoriteFullIcon width='24' height='24' fill="#FF0000"/>
                                :
                                <FavoriteIcon width='24' height='24' fill="#FF0000"/>
                            }
                               
                            </UserFavButton>
                        </UserInfoArea>


                        {loading && 
                        <LoadingIcon size="large" color="#000000" />
                        }
                        
                        {userInfo.services &&
                         <ServiceArea>
                        <ServiceTitle>Lista de serviços</ServiceTitle>

                        
                       { userInfo.services.map((item, key) => (
                         
                         <ServiceItem key={key}>
                        
                        <ServiceInfo>
                            <ServiceName>{item.name}</ServiceName>
                            <ServicePrice>R$ {item.price}</ServicePrice>
                        </ServiceInfo>
                        <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                            <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                        </ServiceChooseButton>
                                    </ServiceItem>
                                ))}
                       
                    </ServiceArea>   
                        }                       
                    {userInfo.testimonials && userInfo.testimonials.length> 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{height: 110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000000"/>}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000000"/>}
                            >

                            {userInfo.testimonials.map((item,key)=>(
                                <TestimonialItem key={key}>
                                    <TestimonialInfo>
                                        <TestimonialName>{item.name}</TestimonialName>
                                        <Stars stars={item.rate} shouwNumber={false}/>
                                    </TestimonialInfo>
                                    <TestimonialBody>{item.body}</TestimonialBody>

                                </TestimonialItem>


                            ))}
                            </Swiper>
                        </TestimonialArea>
                 
                }

                </PageBody>
               <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"/>
                </BackButton>            
            </Scroller>

            <BarberModal
                show={showModal}
                setShow={setShouModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    );
}