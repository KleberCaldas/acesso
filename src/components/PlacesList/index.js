import React from 'react';
import { Container, Header, Avatar, CompanyName, ContentView, AddressText, Actions ,MoreInformationButtom, EvaluatePlaceButtom, TextButtom, Grade } from './styles';
import {useNavigation} from '@react-navigation/native';

export default function PlacesList({data}){
    const navigation = useNavigation();
    
    function final_grade(grade){
       try{
            grade = data.grade;
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
                <MoreInformationButtom onPress = {()=> navigation.navigate('AboutPlace', {name: data?.name, address: data?.address, phone: data?.phone, 
                    category: data?.category, avatarUrl: data?.avatarUrl, grade: data?.grade, latitude: data?.latitude, longitude:data?.longitude})}>
                    <TextButtom>Mais informações</TextButtom>
                </MoreInformationButtom>

                <EvaluatePlaceButtom onPress = {()=> navigation.navigate('EvaluatePlace', {docId: data?.id})}>
                    <TextButtom>Avaliar</TextButtom>
                </EvaluatePlaceButtom>
            </Actions>
        
        </Container>
    );
}