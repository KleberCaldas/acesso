import React from 'react';
import { Container, Header, Avatar, CompanyName, ContentView, AddressText, Actions ,MoreInformationButtom, EvaluatePlaceButtom, TextButtom, Grade } from './styles';
import {useNavigation} from '@react-navigation/native';

export default function PlacesListOwner({data}){
    const navigation = useNavigation();
    
    function final_grade(grade){
        try{
            grade = data.grade;
            let n = grade.length
            let sum = 0
            for(let i in grade){
                sum += grade[i]
            }
            return sum/n;
        }
        catch(error){
            return "N/A";
        }
    }

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
            </ContentView>

            <Actions>
                <MoreInformationButtom onPress = {()=> navigation.navigate('AboutPlaceOwner', {docId: data?.id, name: data?.name, address: data?.address, phone: data?.phone, 
                    category: data?.category, avatarUrl: data?.avatarUrl, grade: data?.grade})}>
                    <TextButtom>Mais informações</TextButtom>
                </MoreInformationButtom>

                <EvaluatePlaceButtom onPress = {()=> navigation.navigate('EditPlace', {docId: data?.id})}>
                    <TextButtom>Editar</TextButtom>
                </EvaluatePlaceButtom>
            </Actions>
        
        </Container>
    );
}