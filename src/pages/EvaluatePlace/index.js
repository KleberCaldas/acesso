import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Dialog from 'react-native-dialog';
import {AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

export default function EvaluatePlace({route}){
    
    //const [docId] = useState(route.params.docId);

    let evaluate_grade =[];
    let grade = 3; //initial rating in star
    let questions = ["Pergunta 1", "Pergunta 2"];
    const navigation = useNavigation();

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
    };

    const handleContinue = () =>{
        evaluate_grade.push(grade);
        alert(evaluate_grade);
        navigation.navigate('EvaluatePlace');
    };

        return(
            <View>
                <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
                    <Dialog.Title>Questão 1/6</Dialog.Title>
                    <Dialog.Description>
                        Qual nota você daria para rampas, corredores ?
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