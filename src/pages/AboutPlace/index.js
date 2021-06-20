import React, {useState, useEffect} from 'react';
import { Container, OpenGoogleMapsButton, ButtonText, EvaluateButton, ContainerButton, ImageAvatar,
    Title, Address, ContainerInfo, ContainerAccessbility, Scroll, TextFinalGrade, PhoneButton,
    PhoneText, CategoryText, AddressButton, AddressText} from './styles';
import {useNavigation} from '@react-navigation/native';
import { Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import call from 'react-native-phone-call';
import { showLocation } from 'react-native-map-link';
import Geolocation from '@react-native-community/geolocation';

export default function AboutPlace({route}){

    const [docId] = useState(route.params.docId);
    const [name] = useState(route.params.name);
    const [address] = useState(route.params.address);
    const [phone] = useState(route.params.phone);
    const [category] = useState(route.params.category);
    const [grade] = useState(route.params.grade);
    const [avatarUrl] = useState(route.params.avatarUrl);
    const [latitude] = useState(route.params.latitude);
    const [longitude] = useState(route.params.longitude);
    const navigation = useNavigation();
    const [latitudeUser, setLatitudeUser] = useState('');
    const [longitudeUser, setLongitudeUser] = useState('');

    function final_grade(grade){
        try{
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

    function cat_name(category){
        switch(category){
            case "restaurants":
                return "Restaurantes";
            case 'shopping':
                return "Lojas";
            case "recreation":
                return "Lazer";
            case "education":
                return "Educação";
            case "public_service":
                return "Serviço Público";
            case "health":
                return "Saúde";
        }
    }

    function call_phone(phone_number){
        const args = {
            number: phone_number,
            prompt: false
        }
        call(args).catch(console.error);
    }

    function openMaps(latitudeUser, longitudeUser, latitude, longitude, name){

        getLocation();

        showLocation({
            latitude: latitude, //latitude from place
            longitude: longitude, // longitude from place
            sourceLatitude: latitudeUser,  // optionally specify starting location for directions
            sourceLongitude: longitudeUser,  // not optional if sourceLatitude is specified
            title: name,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            //googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        })
    }

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
            <Scroll>
            <ContainerInfo>
                    {
                    avatarUrl ?
                    ( //if place have image
                        <ImageAvatar
                            source={{uri:avatarUrl}}
                        />
                    ):
                    (
                        <ImageAvatar
                            source = {require('../../images/location_pin.png')}
                        />
                    )
                }

            <Title>{name}</Title>
            <AddressButton onPress = {()=> openMaps(latitudeUser,longitudeUser, latitude, longitude,name)}>
            <AddressText>{address}</AddressText>
                    <Feather
                        name = "map-pin"
                        color = "#bdb76b"
                        size = {20}
                    />
            </AddressButton>

            <PhoneButton onPress = {() => call_phone(phone)}>
                <PhoneText>{phone}</PhoneText>
                    <Feather
                        name = "phone-call"
                        color = "#bdb76b"
                        size = {20}
                    />
            </PhoneButton>
            
            <CategoryText>{cat_name(category)}</CategoryText>
            
            </ContainerInfo>
            
            <ContainerAccessbility>
            <Text>Acessibilidade</Text>
            <Text>Nota Geral</Text>
            <TextFinalGrade>{final_grade(grade)}</TextFinalGrade>
            <Text>Mobilidade Interna</Text>
            <Text>Mobiliário</Text>
            <Text>Banheiro</Text>
            <Text>Informação</Text>
            </ContainerAccessbility>
            
            <ContainerButton>

                <EvaluateButton onPress = { ()=> navigation.navigate('EvaluatePlace',  {docId: docId})}>
                    <ButtonText>Avaliar</ButtonText>
                </EvaluateButton>
            </ContainerButton>
            </Scroll>
        </Container>
    );
}