import React from 'react';
import {Container, ButtonAddPlace} from './styles';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

export default function HomeOwner(){

    const navigation = useNavigation();
    
    return(
    
        <Container>

            <ButtonAddPlace onPress ={()=> navigation.navigate('NewPlace')}>
                <Feather
                    name = "edit-2"
                    color = "#FFF"
                    size = {25}
                />

            </ButtonAddPlace>

        </Container>
    );
}