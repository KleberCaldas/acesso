import React, { useLayoutEffect, useState, useContext } from 'react';
import {Container, Input, ViewPicker, View, PickerChoice, ButtonGetLocation, ButtonUpdate,
        ButtonUpdateText, UpLoadButton, UpLoadText, Avatar} from './styles';
import {Picker} from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function EditPlace({route}){
    const [docId] = useState(route.params.docId);
    const [namePlace, setNamePlace] = useState(route.params.name);
    const [phonePlace, setPhonePlace] = useState(route.params.phone);
    const [addressPlace, setAddressPlace] = useState(route.params.address);
    const [categoryPlace, setCategoryPlace] = useState(route.params.category);
    const [latitudePlace, setLatitudePlace] = useState(route.params.latitude);
    const [longitudePlace, setLongitudePlace] = useState(route.params.longitude);
    const [url, setUrl] = useState(route.params.avatarUrl);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        
        const options = navigation.setOptions({
            headerRight: () => (
                <ButtonUpdate onPress = {() => updatePlace()}>
                    <ButtonUpdateText>Salvar alterações</ButtonUpdateText>
                </ButtonUpdate>
            )
        })
    }, [navigation, namePlace, phonePlace, addressPlace, categoryPlace, latitudePlace, longitudePlace]);


    async function updatePlace(){
        try{
            await firestore().collection('RJ')
                .doc(docId).update({
                    name: namePlace,
                    address: addressPlace,
                    phone: phonePlace,
                    category: categoryPlace,
                    latitude: latitudePlace,
                    longitude: longitudePlace
            })
            alert('Dados alterados com sucesso!');
            navigation.goBack();
        }
        catch(error){
            alert('Ops, ocorreu algum erro, tente novamente mais tarde!');
            console.log(error);
        }
    }

    return(
        <View>
            <Container>
            {
                    url ?
                    (
                        <UpLoadButton onPress={() => alert('teste')}>
                        <UpLoadText></UpLoadText>
                        <Avatar
                        source={{ uri: url}}
                        />
                        </UpLoadButton>
                    ) : 
                    (
                        <UpLoadButton onPress={ () => alert('teste') }>
                        <UpLoadText>+</UpLoadText>
                        </UpLoadButton>   
                    )
                }

                <Input
                    placeholder = 'Razão Social'
                    value = {namePlace}
                    onChangeText = { (text) => setNamePlace(text)}
                />

                <Input
                    placeholder = '(DD) 99999-9999'
                    value = {phonePlace}
                    onChangeText = { (text) => setPhonePlace(text)}
                />

                <Input
                    placeholder = 'Rua xyz'
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
                        placeholder = '-0998990'
                        value = {latitudePlace}
                        onChangeText = { (text) => setLatitudePlace(text)}
                    />
                    <Input
                        placeholder = '908089'
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