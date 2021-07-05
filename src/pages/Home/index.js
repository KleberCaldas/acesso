import React, {useState, useLayoutEffect, useContext} from 'react';
import {Container, ImageBtn, ButtonMenu, 
        ButtonText, Text,ViewPlaceList, Scroll, ButtonFilter} from './styles';
import { useNavigation } from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import {ListPlace } from '../PlaceList/styles';
import firestore from '@react-native-firebase/firestore';
import PlacesListHome from '../../components/PlaceListHome';
import Feather from 'react-native-vector-icons/Feather';


export default function Home(){

        const navigation = useNavigation();
        const [places, setPlaces] = useState([]);
        const [loading, setLoading] = useState(true);

        useLayoutEffect(() => {
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

                console.log(listPlace);
                setPlaces(listPlace);
                setLoading(false);

        })

        return () => subscriber();

        },[navigation]);

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

                <ButtonFilter onPress={()=>alert('filtro')}>
                        <Feather
                                name = "filter"
                                color = "#FFF"
                                size = {30}
                        />
                </ButtonFilter>
        </Container>
        );
}