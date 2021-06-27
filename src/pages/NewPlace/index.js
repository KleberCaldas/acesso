import React, { useLayoutEffect, useState, useContext } from 'react';
import {Platform} from 'react-native';
import { Container, ButtonText, ButtonAdd, Input, UpLoadButton
    , UpLoadText, PickerChoice, View, ViewPicker,
    ButtonGetLocation, Avatar } from './styles';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';
import {Picker} from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

export default function NewPlace(){

    const navigation = useNavigation();
    const {user} = useContext(AuthContext);    
    const [namePlace, setNamePlace] = useState('');
    const [phonePlace, setPhonePlace] = useState('');
    const [addressPlace, setAddressPlace] = useState('');
    const [categoryPlace, setCategoryPlace] = useState('');
    const [latitudePlace, setLatitudePlace] = useState('');
    const [longitudePlace, setLongitudePlace] = useState('');
    const [url, setUrl] = useState(null);
    
    useLayoutEffect(() => {
        
        const options = navigation.setOptions({
            headerRight: () => (
                <ButtonAdd onPress = {() => handlePlace()}>
                    <ButtonText>Salvar</ButtonText>
                </ButtonAdd>
            )
        })
    }, [navigation, namePlace, phonePlace, addressPlace, categoryPlace, latitudePlace, longitudePlace]);

    
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
            }else{
                uploadPictureFirebase(response);
                setUrl(response.uri);
            }
            
        })
    }

    const getPictureLocalPath = response => {
        const {path, uri} = response;
        return Platform.OS === 'android' ? path: uri; 
    }

    
    const uploadPictureFirebase = async response =>{
        const pictureSource = getPictureLocalPath(response);
        // create a seed to sum (userId + date)
        var now = new Date();
        now = (now.getFullYear().toString()) + (now.getMonth().toString())+ +(now.getDay().toString())+ (now.getHours()).toString() + (now.getMinutes()).toString();
        var photoId = (user?.uid).toString() + now.toString();
        const storageRef = storage().ref('RJ').child(photoId);

        return await storageRef.putFile(pictureSource);
    }


    const getLocation = () => {
        Geolocation.getCurrentPosition(
        (position) => {
            const lat = JSON.stringify(position.coords.latitude);
            const long = JSON.stringify(position.coords.longitude);
            setLatitudePlace(lat);
            setLongitudePlace(long);
        },
            (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    
    async function handlePlace(){

        let avatarUrl = null;
        try{
            let response = await storage().ref('RJ').child(photoId).getDownloadURL();
            avatarUrl = response;

            }catch(error){
            avatarUrl = null;
        }

        await firestore().collection('RJ')
        .add({
            address: addressPlace,
            agent: user.uid,
            avatarUrl,
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
            {
                url ?
                (
                    <UpLoadButton onPress={ uploadPicture }>
                    <UpLoadText></UpLoadText>
                    <Avatar
                    source={{ uri: url }}
                    />
                    </UpLoadButton>
                ) : 
                (
                    <UpLoadButton onPress={ uploadPicture }>
                    <UpLoadText>+</UpLoadText>
                    </UpLoadButton>   
                )
            }
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
                        <Picker.item key={6} value={'health'} label ="Saúde" />
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

                    <ButtonGetLocation onPress ={()=>getLocation()}>
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