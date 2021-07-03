import React, {useState} from 'react';
import { Container, Header, Avatar, CompanyName, ContentView, AddressText, Actions ,MoreInformationButtom, EvaluatePlaceButtom, TextButtom, Grade } from './styles';
import {useNavigation} from '@react-navigation/native';
import haversine from 'haversine-distance';
import Geolocation from '@react-native-community/geolocation';

export default function PlacesListHome({data}){
    const navigation = useNavigation();
    const [latitudeUser, setLatitudeUser] = useState('');
    const [longitudeUser, setLongitudeUser] = useState('');
    
    function final_grade(grade){
        try{
            grade = data.grade;
            let n = grade.length
            let sum = 0
            for(let i in grade){
                sum += grade[i]
            }
            return (sum/n).toFixed(1);
        }
        catch(error){
            return "N/A";
        }
    }


    function distance(){
        
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

        const pUser={latitude: latitudeUser, longitude: longitudeUser};
        const pPlace={latitude: data.latitude, longitude: data.longitude};
        const dist = (haversine(pUser,pPlace)/1000).toFixed(2);
        
        return dist;
    }

    //if(distance() > 26.00){
        return(
            <Container>
                <Header>
                    {
                        data.avatarUrl ?
                        ( //if place have image
                            <Avatar
                                source={{uri:data.avatarUrl}}
                            />
                        ):
                        (
                            <Avatar
                                source = {require('../../images/location_pin.png')}
                            />
                        )
                    }
                    
                    <CompanyName numberOfLines={3}>{data?.name}</CompanyName>
                </Header>
    
                <ContentView>
                    <Grade>{final_grade()}</Grade>
                    <AddressText>{data?.address}</AddressText>
                    <AddressText>{distance()} Km</AddressText>
                </ContentView>
    
                <Actions>
                    <MoreInformationButtom onPress = {()=> navigation.navigate('AboutPlace', {name: data?.name, address: data?.address, phone: data?.phone, 
                        category: data?.category, avatarUrl: data?.avatarUrl, grade: data?.grade, latitude: data?.latitude, longitude:data?.longitude})}>
                        <TextButtom>Mais informações</TextButtom>
                    </MoreInformationButtom>
                </Actions>
            
            </Container>
        );
    /*}
    else{
        return null;
    }*/
}