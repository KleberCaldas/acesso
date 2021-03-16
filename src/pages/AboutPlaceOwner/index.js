import React, {useState, useEffect} from 'react';
import { Container, DeleteButton, ButtonText, EditButton, ContainerButton, ImageAvatar,
     Title, Address} from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


export default function AboutPlaceOwner({route}){
    
    const [docId] = useState(route.params.docId);
    const [name] = useState(route.params.name);
    const [address] = useState(route.params.address);
    const [phone] = useState(route.params.phone);
    const [category] = useState(route.params.category);
    const [grade] = useState(route.params.grade);
    const [avatarUrl] = useState(route.params.avatarUrl);
    const navigation = useNavigation();

    function deletePlace(){
        firestore().collection('RJ') .doc(docId).delete()
        .then(() => {
            alert('Local removido');
            navigation.navigate('HomeOwner');
        
        });
    }

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
                <DeleteButton>
                    <ButtonText onPress = {() => deletePlace()}>Excluir</ButtonText>
                </DeleteButton>

                <EditButton onPress = { ()=> navigation.navigate('EditPlace')}>
                    <ButtonText>Editar</ButtonText>
                </EditButton>
            </ContainerButton>
        
        </Container>
    );
}