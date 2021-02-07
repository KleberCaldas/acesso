import React, {useState, useEffect} from 'react';
import { Container, OpenGoogleMapsButton, ButtonText, EvaluateButton, ContainerButton, ImageAvatar,
     Title, Address} from './styles';
import {useNavigation} from '@react-navigation/native';

export default function AboutPlace({route}){
    
    const [name] = useState(route.params.name);
    const [address] = useState(route.params.address);
    const [phone] = useState(route.params.phone);
    const [category] = useState(route.params.category);
    const [grade] = useState(route.params.grade);
    const [avatarUrl] = useState(route.params.avatarUrl);
    const navigation = useNavigation();

    return(
        <Container>

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
            <Address>{phone}</Address>
            <Address>{category}</Address>
            <Address>{grade}</Address>
            
            <ContainerButton>
                <OpenGoogleMapsButton>
                    <ButtonText>Abrir com Googgle Maps</ButtonText>
                </OpenGoogleMapsButton>

                <EvaluateButton onPress = { ()=> navigation.navigate('EvaluatePlace')}>
                    <ButtonText>Avaliar</ButtonText>
                </EvaluateButton>
            </ContainerButton>
        
        </Container>
    );
}