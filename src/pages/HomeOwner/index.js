import React, {useState, useLayoutEffect, useContext} from 'react';
import {Container, ButtonAddPlace, ListPlace } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import {View, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import PlacesListOwner from '../../components/PlacesListOwner';

export default function HomeOwner(){

    const navigation = useNavigation();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    
    useLayoutEffect(() => {
        // flatList
        
        const subscriber = firestore()
        .collection("RJ")
        .where("agent", "==", user?.uid)
        .orderBy('name')
        .onSnapshot( snapshot =>{
            const listPlace = [];
    
            snapshot.forEach(doc => {
                listPlace.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
    
            setPlaces(listPlace);
            console.log(listPlace);
            setLoading(false);
    
        })
    
        return () => subscriber();
    
    },[navigation]);


    
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
                    showVerticalScrollIndicator = {false}
                    data={places} 
                    renderItem = {({item}) => <PlacesListOwner data = {item}/>}
                />
                )
        }



            <ButtonAddPlace onPress ={()=> navigation.navigate('NewPlace')}>
                <Feather
                    name = "plus"
                    color = "#FFF"
                    size = {30}
                />

            </ButtonAddPlace>

        </Container>
    );
}