import React, { useLayoutEffect, useState, useContext } from 'react';
import {View, Text} from 'react-native';
import { Container, ButtonText, ButtonAdd, Input } from './styles';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';

export default function NewPlace(){

    const navigation = useNavigation();
    const [place, setplace] = useState('');
    const {user} = useContext(AuthContext);
    
    const [namePlace, setNamePlace] = useState('');
    const [phonePlace, setPhonePlace] = useState('');
    const [addressPlace, setAddressPlace] = useState('');
    const [categoryPlace, setCategoryPlace] = useState('');
    const [latitudePlace, setLatitudePlace] = useState('');
    const [longitudePlace, setLongitudePlace] = useState('');
    
    useLayoutEffect(() => {
        
        const options = navigation.setOptions({
            headerRight: () => (
                <ButtonAdd onPress = {() => handlePlace()}>
                    <ButtonText>Salvar</ButtonText>
                </ButtonAdd>
            )
        })
    }, [navigation, place]);

    async function handlePlace(){
       /* if (addressPlace === '' || categoryPlace === '' || namePlace === '' || longitudePlace === '' || latitudePlace === '' || phonePlace === ''){
            alert('Cadastro com conteúdo inválido');
            return;
        }
        else{
            setAddressPlace('');
            setCategoryPlace('');
            setLatitudePlace('');
            setLongitudePlace('');
            setNamePlace('');
            setPhonePlace('');
        }



        try{
            let response = await storage.ref('places').child(user?.id).getDowloadURL();
            avatarURL = response;
        }catch(error){
            avatarURL = null;
        }*/
        await firestore().collection('RJ')
        .add({
            address: addressPlace,
            agent: user.uid,
           // avatarURL,
            category: categoryPlace,
            name: namePlace,
            phone: phonePlace,
            latitude: latitudePlace,
            longitude: longitudePlace,
        })
        .then(() => {
            alert('Local cadastrado com sucesso!');
            setAddressPlace('');
            setCategoryPlace('');
            setLatitudePlace('');
            setLongitudePlace('');
            setNamePlace('');
            setPhonePlace('');
        })
        .catch((error) => {
            alert('Ops! Deu um erro, tente novamente mais tarde!');
        })
    }

    return(
        <Container>
            <Input
                placeholder = "Razão social"
                value = {namePlace}
                onChangeText = { (text) => setNamePlace(text)}
            />

            <Input
                placeholder = "(DD) 99999-9999"
                value = {phonePlace}
                onChangeText = { (text) => setPhonePlace(text)}
            />

            <Input
                placeholder = "Endereço"
                value = {addressPlace}
                onChangeText = { (text) => setAddressPlace(text)}
            />
            
            <Input 
                placeholder = "Categoria"
                value = {categoryPlace}
                onChangeText = { (text) => setCategoryPlace(text)}
            />

            <Input
                placeholder = "Latitude"
                value = {latitudePlace}
                onChangeText = { (text) => setLatitudePlace(text)}
            />

            <Input
                placeholder = "Longitude"
                value = {longitudePlace}
                onChangeText = { (text) => setLongitudePlace(text)}
            />
        </Container>
    );
}