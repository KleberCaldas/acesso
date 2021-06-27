import React, {useState, useContext} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText, ViewPicker,
        PickerChoice} from './styles'; 
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from '../../contexts/auth'

export default function Login(){

    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disability, setdisability] = useState('');

    const {signUp, signIn, loadingAuth} = useContext(AuthContext)

    // Functions 

    function showAlert(msg){
        Alert.alert(
            "Ops! Ocorreu um erro",
            msg,
            [
                {
                    text: "Ok",
                    style: "default",
                },
            ]
        )
    }

    function toggleLogin(){
        setLogin(!login);
        setName('');
        setEmail('');
        setPassword('');
    }

    function handleLogin(){
        
        if (email === '' || password === ''){
            let msg = "Por favor, preencha todos os dados corretamente."
            showAlert(msg);
            return;
        }
        try{
            signIn(email, password);
        }
        catch(error){
            let msg = "Senha ou usuário incorretos, por favor, tente novamente."
            showAlert(msg);
        }
    }
    
    function handleSingUp(){
        if (email === '' || password === '' || name === ''){
            let msg = "Por favor, preencha todos os dados corretamente."
            showAlert(msg);
            return;
        }
        
        //add user
        signUp(email, password, name, disability);
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

            <ViewPicker>
                <PickerChoice selectedValue = {disability}
                    onValueChange = {(text) => setdisability(text)
                    }>
                    <Picker.item key={1} value={'reduced_mobility'} label ="Mobilidade Reduzida" />
                    <Picker.item key={2} value={'visual_impairment'} label ="Visual" />
                    <Picker.item key={3} value={'hearing_deficiency'} label ="Auditiva" />
                    <Picker.item key={4} value={'intellectual_disability'} label ="Intelectual" />
                </PickerChoice>
            </ViewPicker>
            
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