import React from 'react';
import {View, Text} from 'react-native';
import { Container, CompanyName } from './styles';
import {useNavigation} from '@react-navigation/native';

export default function SearchList({data}){
    
    const navigation = useNavigation();

    return(
        <Container onPress = { () => navigation.navigate('AboutPlace', {name: data?.name, address: data?.address, phone: data?.phone, 
            category: data?.category, avatarUrl: data?.avatarUrl, grade: data?.grade})}>
            <CompanyName>{data.name}</CompanyName>
        </Container>
    );
}