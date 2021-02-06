import React from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Avatar, CompanyName, ContentView, Content, Actions ,MoreInformationButtom, EvaluatePlaceButtom, TextButtom, Grade } from './styles';
import {useNavigation} from '@react-navigation/native';

export default function PlacesList({data}){
    const navigation = useNavigation();
    
    
    function final_grade(grade){
        grade = data.grade;
        let n = grade.length
        let sum = 0
        for(let i in grade){
            sum += grade[i]
        }
        
        return sum/n;
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
                
                <CompanyName numberOfLines={1}>{data?.name}</CompanyName>
            </Header>

            <ContentView>
                <Content>{data?.address}</Content>
                <Grade>{final_grade()}</Grade>
            </ContentView>

            <Actions>
                <MoreInformationButtom onPress = {()=> navigation.navigate('AboutPlace', {docId: data?.id})}>
                    <TextButtom>Mais informações</TextButtom>
                </MoreInformationButtom>

                <EvaluatePlaceButtom onPress = {()=> navigation.navigate('EvaluatePlace', {docId: data?.id})}>
                    <TextButtom>Avaliar</TextButtom>
                </EvaluatePlaceButtom>
            </Actions>
        
        </Container>
    );
}