import React, {useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PlaceList({route}){

    const navigation = useNavigation();
    const [category, setCategory] = useState(route.params.category);
    const [bdId] = useState(route.params.bdId);

    useLayoutEffect(() => {
        navigation.setOptions({
        title: category === '' ? '' : category
    });
},[navigation, category]);

    return(
        <View>
            <Text>Pagina de PlaceList</Text>
           <Text>{bdId}</Text>
        </View>
        
    );
}