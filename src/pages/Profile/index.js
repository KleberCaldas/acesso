import React, { useContext } from 'react';
import {Modal} from 'react-native';
import { useState } from 'react/cjs/react.development';
import { AuthContext } from '../../contexts/auth';
import { Container, Name, Email, UpdateButton, UpdateButtonText, ExitButton, ExitText,
ModalContainer, ButtonBack, ButtonTextModal, Input } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';


export default function Profile(){
    const {signOut, user, storageUser, setUser} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user?.name);

    async function updateProfile(){
        if(name === ''){
            return;
        }

        await firestore().collection('users')
            .doc(user.uid).update({
                name: name
            })
        
        let data = {
            uid: user.uid,
            name: name,
            email: user.email,
        };

        setUser(data);
        storageUser(data);
        setOpen(false);
    }


    return(
        <Container>
            <Name numberOfLines={2}>{user.name}</Name>
            <Email numberOfLines={2}>{user.email}</Email>
            
            <UpdateButton onPress = { () => setOpen(true)}>
                <UpdateButtonText>Atualizar Perfil</UpdateButtonText>
            </UpdateButton>

            <ExitButton onPress = {() => signOut()} >
                <ExitText>Sair</ExitText>
            </ExitButton>

            <Modal visible = {open} animationType="slide" transparent = {true}>
                <ModalContainer>
                    <ButtonBack onPress = { ()=> setOpen(false) }>
                        <Feather
                            name="arrow-left"
                            size={25}
                            color ="#bdb76b"
                        />
                        <ButtonTextModal>Voltar</ButtonTextModal>
                    </ButtonBack>

                <Input
                    placeholder = {user?.name}
                    value = {name}
                    onChangeText = { (text) => setName(text)}
                />

            <UpdateButton onPress = {updateProfile}>
                <UpdateButtonText>Atualizar Dados</UpdateButtonText>
            </UpdateButton>

                </ModalContainer>
            </Modal>

        </Container>
    );
}