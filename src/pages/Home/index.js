import React from 'react';
import {Container, ButtonMenu, ButtonText, ViewBtn} from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Home(){

    const navigation = useNavigation();
    
    return(
    
        <Container>
            <ViewBtn>
                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Restaurantes'})}>
                    <ButtonText>Restaurantes</ButtonText>
                </ButtonMenu>

                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Compras'})}>
                    <ButtonText>Compras</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            <ViewBtn>
                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Lazer'})}>
                    <ButtonText>Lazer</ButtonText>
                </ButtonMenu>

                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Educação'})}>
                    <ButtonText>Educação</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            <ViewBtn>
                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Serviço Público'})}>
                    <ButtonText>Serviço Público</ButtonText>
                </ButtonMenu>

                <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Saúde'})}>
                    <ButtonText>Saúde</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            </Container>
    );
}