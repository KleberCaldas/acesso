import React from 'react';
import {Container, ImageBtn, ButtonMenu, 
    ButtonText, Text,ViewPlaceList, Scroll} from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Home(){

    const navigation = useNavigation();
    
    return(
    
        <Container>
            <Scroll horizontal = {true} showHorizontalScrollIndicator = {false}>
                
                    <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Restaurantes'})}>
                        <ImageBtn source={require('../../images/restaurant.png')}/>
                        <ButtonText>Restaurantes</ButtonText>
                    </ButtonMenu>

                    <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Compras'})}>
                        <ImageBtn source={require('../../images/shopping.png')}/>
                        <ButtonText>Compras</ButtonText>
                    </ButtonMenu>

                    <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Lazer'})}>
                        <ImageBtn source={require('../../images/recreation.png')}/>
                        <ButtonText>Lazer</ButtonText>
                    </ButtonMenu>

                    <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Educação'})}>
                        <ImageBtn source={require('../../images/education.png')}/>
                        <ButtonText>Educação</ButtonText>
                    </ButtonMenu>

                    <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Serviço Público'})}>
                        <ImageBtn source={require('../../images/public_service.png')}/>
                        <ButtonText>Serviço Público</ButtonText>
                    </ButtonMenu>

                    <ButtonMenu onPress = {()=> navigation.navigate('PlaceList', {category: 'Saúde'})}>
                        <ImageBtn source={require('../../images/health.png')}/>
                        <ButtonText>Saúde</ButtonText>
                    </ButtonMenu>
            </Scroll>

            <ViewPlaceList>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
                <Text>Aqui vai ficar o placelist
                        ordenado por proximidade
                </Text>
            </ViewPlaceList>
        </Container>
    );
}