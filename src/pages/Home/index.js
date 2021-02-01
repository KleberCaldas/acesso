import React from 'react';
import {Container, ButtonMenu, ButtonText, ViewBtn} from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Home(){

    const navigation = useNavigation();
    
    return(
    
        <Container>
            <ViewBtn>
                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Restaurantes', bdId: 'restaurants'})}>
                    <ButtonText>Restaurantes</ButtonText>
                </ButtonMenu>

                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Compras', bdId: 'shopping'})}>
                    <ButtonText>Compras</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            <ViewBtn>
                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Lazer', bdId: 'recreation'})}>
                    <ButtonText>Lazer</ButtonText>
                </ButtonMenu>

                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Educação', bdId: 'education'})}>
                    <ButtonText>Educação</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            <ViewBtn>
                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Serviço Público', bdId: 'publicservice'})}>
                    <ButtonText>Serviço Público</ButtonText>
                </ButtonMenu>

                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Saúde', bdId: 'health'})}>
                    <ButtonText>Saúde</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            </Container>
    );
}