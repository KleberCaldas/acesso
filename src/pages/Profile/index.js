import React, { useContext } from 'react';
import {View, Text, Button} from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { Container, Name, Email, UpdateButton, UpdateButtonText, ExitButton, ExitText } from './styles';

export default function Profile(){
    const {signOut, user} = useContext(AuthContext);
    
    return(
        <Container>
            <Name numberOfLines={2}>{user.name}</Name>
            <Email numberOfLines={2}>{user.email}</Email>
            
            <UpdateButton>
                <UpdateButtonText>Atualizar</UpdateButtonText>
            </UpdateButton>

            <ExitButton onPress = {() => signOut()} >
                <ExitText>Sair</ExitText>
            </ExitButton>

        </Container>
    );
}