import React, { useState, useEffect } from 'react';
import { Platform, Alert, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import Api from '../../Api';
import {
  Container,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
} from './styles';

import BarberItem from '../../components/BarberItem';
import SearchIcon from '../../assests/search.svg';
import MyLocationIcon from '../../assests/my_location.svg';

export default () => {
  const navigation = useNavigation();
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getBarbers = async () => {
    setLoading(true);
    setList([]);

    let lat = null;
    let lng = null;
    if(coords){
      lat = coords.latitude;
      lng= coords.longitude;
    }

    try {
      let res = await Api.getBarbers(lat,lng, locationText);


      if (res.error === '') {
        if (res.loc) {
          setLocationText(res.loc);
        }
        setList(res.data);
      } else {
        Alert.alert('Erro', `Erro: ${res.error}`);
      }
    } catch (error) {
      console.error('Erro ao obter barbeiros:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBarbers();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getBarbers();
    setRefreshing(false);
  };

  const handleLocationFinder = async () => {
    setCoords(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLoading(true);
        setLocationText('');
        setList([]);
        Alert.alert(
          'Permissão de Localização',
          'Permissão negada para acessar a localização.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCoords(location.coords);
      await getBarbers();

      console.log('Coordenadas:', location.coords);
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  };

  const handleLocationSearch = () =>{
    setCoords({});
    getBarbers();
  }

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle numberOfLines={2}>BARBERSHOP</HeaderTitle>
        <SearchButton onPress={() => navigation.navigate('Search')}>
          <SearchIcon width="26" height="26" fill="#FFFFFF" />
        </SearchButton>
      </HeaderArea>
      <LocationArea>
        <LocationInput
          placeholder="Onde você está?"
          placeholderTextColor="#FFFFFF"
          value={locationText}
          onChangeText={(text) => setLocationText(text)}
          onEndEditing={handleLocationSearch}
        />
        <LocationFinder onPress={handleLocationFinder}>
          <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
        </LocationFinder>
      </LocationArea>
      {loading && <LoadingIcon size="large" color="#FFF" />}
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <BarberItem data={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </Container>
  );
};
