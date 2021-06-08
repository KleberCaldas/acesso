import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Dialog from 'react-native-dialog';
import {AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

export default function Question4({route}){
    
    const navigation = useNavigation();

    const [placeId] = useState(route.params.placeId);
    let [evaluate_grade] = useState(route.params.evaluate_grade);
    let [index] = useState(route.params.index);
    let [questions] = useState(route.params.questions);
    let [len] = useState(route.params.len);
    let grade = 3; //initial rating in star
    
    
    const [visible, setVisible] = useState(true);
    
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating);
        grade = rating;
    }

    const showDialog = () => {
        setVisible(true);
    };
    
    const handleCancel = () => {
        setVisible(false);
        navigation.navigate('PlaceList');
    };

    const handleContinue = () =>{
        evaluate_grade.push(grade);
        index += 1;
        navigation.navigate('Question5', {placeId, questions, index, len, evaluate_grade});
        setVisible(false);
        
    };

        return(
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>{"Pergunta " + (index + 1) + " / " + len}</Dialog.Title>
                    <Dialog.Description>
                        {questions[index]}
                    </Dialog.Description>
                    <View>
                    <AirbnbRating
                        count={5}
                        reviews={["Péssimo", "Ruim", "OK", "Bom", "Excelente"]}
                        defaultRating={3}
                        size={40}
                        onFinishRating={(rating)=> ratingCompleted(rating)}
                    />
                    </View>
                    <Dialog.Button label="Cancelar" onPress = {handleCancel}/>
                    <Dialog.Button label="Continuar" onPress = { handleContinue}/>
                </Dialog.Container>
            </View>
        );
}