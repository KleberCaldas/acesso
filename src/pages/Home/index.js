import React, {useState, useLayoutEffect, useContext} from 'react';
import {Container, ImageBtn, ButtonMenu, 
        ButtonText, Text,ViewPlaceList, Scroll} from './styles';
import { useNavigation } from '@react-navigation/native';
import haversine from 'haversine-distance';
import {View, ActivityIndicator} from 'react-native';
import {ListPlace } from '../PlaceList/styles';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import PlacesListHome from '../../components/PlaceListHome';
import Geolocation from '@react-native-community/geolocation';

export default function Home(){

        const navigation = useNavigation();
        const pA = {latitude: 37.8136, longitude: 144.9631}
        const pB = {latitude: 33.8650, longitude: 151.2094}
        const [latitudeUser, setLatitudeUser] = useState('');
        const [longitudeUser, setLongitudeUser] = useState('');
        
        const [places, setPlaces] = useState([]);
        const [loading, setLoading] = useState(true);
        const { user } = useContext(AuthContext);
        
        useLayoutEffect(() => {
        
                getLocation();
        // flatList
        
        const subscriber = firestore()
        .collection("RJ")
        .orderBy('name')
        .onSnapshot( snapshot =>{
                const listPlace = [];

                snapshot.forEach(doc => {
                listPlace.push({
                                ...doc.data(),
                                id: doc.id,
                        });
                });

                
                /* Criar uma função que adicione para cada elemento do listPlace o resultado
                da formula de haversine
                        pUser :{latitudeUser, longitudeUser}
                        pPlace: {latitudePlace, longitudePlace}
                        distance: haversine(pUser, pPlace)
                */
                console.log(listPlace);
                setPlaces(listPlace);
                setLoading(false);

        })

        return () => subscriber();

        },[navigation]);

        const getLocation = () => {
                Geolocation.getCurrentPosition(
                (position) => {
                        const lat = JSON.stringify(position.coords.latitude);
                        const long = JSON.stringify(position.coords.longitude);
                        setLatitudeUser(lat);
                        setLongitudeUser(long);
                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
        }
        
        return(
        
        <Container>
                <Scroll horizontal = {true} showHorizontalScrollIndicator = {false}>
                
                        <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Restaurantes'})}>
                                <ImageBtn source={require('../../images/restaurant.png')}/>
                                <ButtonText>Restaurantes</ButtonText>
                        </ButtonMenu>

                        <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Compras'})}>
                                <ImageBtn source={require('../../images/shopping.png')}/>
                                <ButtonText>Compras</ButtonText>
                        </ButtonMenu>

                        <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Lazer'})}>
                                <ImageBtn source={require('../../images/recreation.png')}/>
                                <ButtonText>Lazer</ButtonText>
                        </ButtonMenu>

                        <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Educação'})}>
                                <ImageBtn source={require('../../images/education.png')}/>
                                <ButtonText>Educação</ButtonText>
                        </ButtonMenu>

                        <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Serviço Público'})}>
                                <ImageBtn source={require('../../images/public_service.png')}/>
                                <ButtonText>Serviço Público</ButtonText>
                        </ButtonMenu>

                        <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Saúde'})}>
                                <ImageBtn source={require('../../images/health.png')}/>
                                <ButtonText>Saúde</ButtonText>
                        </ButtonMenu>
                </Scroll>
                <ViewPlaceList>
                        {loading ? //if(loading = true)
                (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size = {50} color = "#e52246"/>
                </View>
            ) : //else
                (      
                <ListPlace
                        showVerticalScrollIndicator = {false}
                        data={places} 
                        renderItem = {({item}) => <PlacesListHome data = {item}/>}
                />
                )
        }
                </ViewPlaceList>
        </Container>
        );
}