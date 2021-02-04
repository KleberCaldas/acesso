import React, {useState, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText} from './styles'; 

import { AuthContext } from '../../contexts/auth'

export default function Login(){

    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp, signIn, loadingAuth} = useContext(AuthContext)

    // Functions 

    function toggleLogin(){
        setLogin(!login);
        setName('');
        setEmail('');
        setPassword('');
    }

    function handleLogin(){
        
        if (email === '' || password === ''){
            console.log('Preencha todos os dados')
            return;
        }
        
        signIn(email, password);
    }
    
    function handleSingUp(){
        if (email === '' || password === '' || name === ''){
            console.log('Preencha todos os dados')
            return;
        }
        
        //add user
        signUp(email, password, name);
    }

    if(login){
        return(
            <Container>
                <Title>
                    ACESSO
                </Title>
            
            <Input
                placeholder = "seuemail@email.com"
                value = {email}
                onChangeText = { (text) => setEmail(text)}
            />

            <Input
                placeholder = "********"
                secureTextEntry = {true}
                value = {password}
                onChangeText = { (text) => setPassword(text)} 
            />

            <Button onPress = {handleLogin}>
                {
                    loadingAuth ? (
                        <ActivityIndicator size={20} color="#bdb76b"/>
                    ) : (
                        <ButtonText>Entrar</ButtonText>
                    )
                }
                
            </Button>

            <SignUpButton onPress={() => toggleLogin()}>
                <SignUpText>Criar uma conta</SignUpText>
            </SignUpButton>
            </Container>
        )
    }

    return(
        <Container>
                <Title>ACESSO</Title>
            
            <Input
                placeholder = "Nome"
                value = {name}
                onChangeText = { (text) => setName(text)}
            />
            <Input
                placeholder = "seuemail@email.com"
                value = {email}
                onChangeText = { (text) => setEmail(text)}
            />

            <Input
                placeholder = "********"
                secureTExtEntry = {true}
                value = {password}
                onChangeText = { (text) => setPassword(text)} 
            />


            <Button onPress = {handleSingUp}>
            {
                    loadingAuth ? (
                        <ActivityIndicator size={20} color="#bdb76b"/>
                    ) : (
                        <ButtonText>Cadastrar</ButtonText>
                    )
                }
            </Button>

            <SignUpButton onPress={() => toggleLogin()}>
                <SignUpText>Já tenho uma conta</SignUpText>
            </SignUpButton>
            </Container>
    );
}