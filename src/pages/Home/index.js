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

                <ButtonMenu>
                    <ButtonText>Lazer</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            <ViewBtn>
                <ButtonMenu>
                    <ButtonText>Serviço Público</ButtonText>
                </ButtonMenu>

                <ButtonMenu>
                    <ButtonText>Saúde</ButtonText>
                </ButtonMenu>
            </ViewBtn>

            </Container>
    );
}