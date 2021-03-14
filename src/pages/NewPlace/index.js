import React, { useLayoutEffect, useState, useContext } from 'react';
import {Text, ActivityIndicatorBase} from 'react-native';
import { Container, ButtonText, ButtonAdd, Input, UpLoadButton
    , UpLoadText, PickerChoice, View, ViewPicker } from './styles';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';
import {Picker} from '@react-native-picker/picker';

export default function NewPlace(){

    const navigation = useNavigation();
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
    }, [navigation, namePlace, phonePlace, addressPlace, categoryPlace, latitudePlace, longitudePlace]);

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
        <View>
            <Container>

                <UpLoadButton onPress={() => alert("clicou")}>
                    <UpLoadText>+</UpLoadText>
                </UpLoadButton>
                
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
                </Container>
            
                <ViewPicker>
                    <PickerChoice selectedValue = {categoryPlace}
                        onValueChange = {(text) => setCategoryPlace(text)
                        }>
                        <PickerChoice.item key={1} value={"restaurants"} label ="Restaurantes" />
                        <PickerChoice.item key={2} value={"shopping"} label ="Compras" />
                        <PickerChoice.item key={3} value={"recreation"} label ="Lazer" />
                        <PickerChoice.item key={4} value={"education"} label ="Educação" />
                        <PickerChoice.item key={5} value={"public_service"} label ="Serviço Público" />
                        <PickerChoice.item key={2} value={"health"} label ="Saúde" />
                    </PickerChoice>
                </ViewPicker>
                
                <Container>
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
        </View>
    );
}