import React, {useState, useLayoutEffect, useContext, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, ListPlace } from './styles';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

export default function PlaceList({route}){

    const navigation = useNavigation();
    const [category] = useState(route.params.category);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    

    useLayoutEffect(() => {
    //header name
        navigation.setOptions({
        title: category === '' ? '' : category
    });

    // flatList

    var categories = "";

    switch(category){
        case 'Restaurantes':
            categories = "restaurants"
            break;
        case 'Compras':
            categories = "shopping"
            break;
        case 'Lazer':
            categories = "recreation"
            break;
        case 'Educação':
            categories = "education"
            break;
        case 'Serviço Público':
            categories = "public_service"
            break;
        case 'Saúde':
            categories = "health"
            break;
    }


    const subscriber = firestore()
    .collection('RJ')
    .where('category', '==', categories)
    .orderBy('name', 'desc')
    .onSnapshot( snapshot =>{
        const listPlace = [];

        snapshot.forEach(doc => {
            listPlace.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        setPlaces(listPlace);
        setLoading(false);

    })

    return () => subscriber();

},[navigation, category]);

    return(
        
        <Container>

        {loading ? //if(loading = true)
            (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size = {50} color = "#e52246"/>
                </View>
            ) : //else
            (      
                <ListPlace
                    data={places} 
                    renderItem = {({item}) => (<Text>Teste</Text>)}
                />
            )
        }


        </Container>
        
    );
}