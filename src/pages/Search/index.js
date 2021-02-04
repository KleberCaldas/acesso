import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Container, AreaInput, Input, List} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';

export default function Search(){
    
    const [input, setInput] = useState('');
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        if(input === '' || input === undefined){
            setPlaces([]);
            return;
        }

        const subscriber = firestore().collection('RJ')
        .where("name", ">=", input)
        .where("name", "<=", input + "\uf8ff") //unicode
        .onSnapshot( snapshot => {
            const listPlaces = [];

            snapshot.forEach( doc => {
                listPlaces.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setPlaces(listPlaces);
            console.log(listPlaces);
        })

        
        return () => subscriber();

    },[input]);    
    
    return(
        <Container>
            
            <AreaInput>
                <Feather
                    name="search"
                    color="#e52246"
                    size={20}
                />

                <Input
                    placeholder="Digite onde deseja ir"
                    placeholderTextColor="#a9a9a9"
                    onChangeText = {(text) => setInput(text)}
                    value = { input }
                />

            </AreaInput>

            <List
                showsVerticalScrollIndicator = {false}
                data = {places}
                keyExtrator = { (item) => item.id}
                renderItem = { ({item}) => <SearchList data = {item}/>}
            />
        </Container>
    );
}