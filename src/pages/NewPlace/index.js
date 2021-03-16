import React, { useLayoutEffect, useState, useContext } from 'react';
import {Platform} from 'react-native';
import { Container, ButtonText, ButtonAdd, Input, UpLoadButton
    , UpLoadText, PickerChoice, View, ViewPicker,
    ButtonGetLocation } from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';
import {Picker} from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

export default function NewPlace(){

    const navigation = useNavigation();
    const {user} = useContext(AuthContext);    
    const [namePlace, setNamePlace] = useState('');
    const [phonePlace, setPhonePlace] = useState('');
    const [addressPlace, setAddressPlace] = useState('');
    const [categoryPlace, setCategoryPlace] = useState('');
    const [latitudePlace, setLatitudePlace] = useState('');
    const [longitudePlace, setLongitudePlace] = useState('');
    const [docReference] = useState('');

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
        .then((docRef) => {
            console.log("DocRef: ", docRef.id);
            //docReference = docRef.id;
            //console.log("DocReference: ", docRef.id);
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

    const uploadPicture = () => {

        const options ={
            noData: true,
            mediaType: 'photo'
        };

        ImagePicker.launchImageLibrary(options, response =>{
            if(response.didCancel){
                console.log('Cancelou');
            }else if(response.error){
                console.log('Ops, aconteceu algo inesperado')
            }//else{
               // uploadPictureFirebase(response);
           // }
            
        })
    }

    const getPictureLocalPath = response => {
        const {path, uri} = response;
        return Platform.OS === 'android' ? path: uri; 
    }

    
    const uploadPictureFirebase = async response =>{
        const pictureSource = getPictureLocalPath(response);
        const storageRef = storage().ref('RJ').child('teste'); //docRef.id
        return await storageRef.putFile(pictureSource);
    }

    return(
        <View>
            <Container>

                <UpLoadButton onPress={uploadPicture}>
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
                        <Picker.item key={1} value={'restaurants'} label ="Restaurantes" />
                        <Picker.item key={2} value={'shopping'} label ="Compras" />
                        <Picker.item key={3} value={'recreation'} label ="Lazer" />
                        <Picker.item key={4} value={'education'} label ="Educação" />
                        <Picker.item key={5} value={'public_service'} label ="Serviço Público" />
                        <Picker.item key={2} value={'health'} label ="Saúde" />
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

                    <ButtonGetLocation onPress ={()=>alert('Pegar posição')}>
                        <Feather
                            name = "map-pin"
                            color = "#FFF"
                            size = {30}
                        />

                    </ButtonGetLocation>

                </Container>
        </View>
    );
}