import React from 'react';
import {View, Text} from 'react-native';
import {Container, ButtonMenu, ButtonText} from './styles';

export default function Home(){
    return(
    
        <Container>
            <View>
                <ButtonMenu>
                    <ButtonText>Restaurantes</ButtonText>
                </ButtonMenu>

                <ButtonMenu>
                    <ButtonText>Lazer</ButtonText>
                </ButtonMenu>
            </View>

            <View>
                <ButtonMenu>
                    <ButtonText>Serviço Público</ButtonText>
                </ButtonMenu>

                <ButtonMenu>
                    <ButtonText>Saúde</ButtonText>
                </ButtonMenu>
            </View>

            </Container>
    );
}