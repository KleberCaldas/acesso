import React from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Avatar, CompanyName, ContentView, Content, Actions ,MoreInformationButtom, EvaluatePlaceButtom, TextButtom } from './styles';

export default function PlacesList({data}){
    return(
        <Container>
            <Header>
                <Avatar
                    source = {require('../../images/location_pin.png')}
                />
                <CompanyName>Kleber</CompanyName>
            </Header>

            <ContentView>
                <Content>TEstando</Content>
            </ContentView>

            <Actions>
                <MoreInformationButtom>
                    <TextButtom>Mais informações</TextButtom>
                </MoreInformationButtom>

                <EvaluatePlaceButtom>
                    <TextButtom>Avaliar</TextButtom>
                </EvaluatePlaceButtom>
            </Actions>
        
        </Container>
    );
}