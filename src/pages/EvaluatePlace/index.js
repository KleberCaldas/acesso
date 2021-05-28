import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function EvaluatePlace({route}){
    
    const [placeId] = useState(route.params.docId);

    let evaluate_grade =[];
    let questions_type_1 = ["Qual foi sua experiência com rampas, corrimões ?", "Qual foi sua experiência com informações PCD?"];
    let index = 0;
    let len = questions_type_1.length;

    const navigation = useNavigation();
        return(
            <View>
                <Text>Bem-vindo a avaliação .....</Text>
                <Text>Blá, blá, blá</Text>
                <Button title ="Vamos começar" onPress = {()=> navigation.navigate('Question1', {placeId, questions_type_1, evaluate_grade, index, len})}/>
            </View>
        );
}