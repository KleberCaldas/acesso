import React, {useState, useEffect} from 'react';
import { Container, OpenGoogleMapsButton, ButtonText, EvaluateButton, ContainerButton, ImageAvatar,
    Title, Address, ContainerInfo, ContainerAccessbility, Scroll, TextFinalGrade, PhoneButton,
    PhoneText, CategoryText} from './styles';
import {useNavigation} from '@react-navigation/native';
import { Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import call from 'react-native-phone-call';

export default function AboutPlace({route}){

    const [docId] = useState(route.params.docId);
    const [name] = useState(route.params.name);
    const [address] = useState(route.params.address);
    const [phone] = useState(route.params.phone);
    const [category] = useState(route.params.category);
    const [grade] = useState(route.params.grade);
    const [avatarUrl] = useState(route.params.avatarUrl);
    const navigation = useNavigation();

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
            <Address>{address}</Address>
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
                <OpenGoogleMapsButton>
                    <ButtonText onPress = { ()=> navigation.navigate('Maps')}>Mapa</ButtonText>
                </OpenGoogleMapsButton>

                <EvaluateButton onPress = { ()=> navigation.navigate('EvaluatePlace',  {docId: docId})}>
                    <ButtonText>Avaliar</ButtonText>
                </EvaluateButton>
            </ContainerButton>
            </Scroll>
        </Container>
    );
}