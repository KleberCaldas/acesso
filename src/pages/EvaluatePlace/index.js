import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Dialog from 'react-native-dialog';
import {AirbnbRating} from 'react-native-ratings';

export default function EvaluatePlace({route}){
    
    //const [docId] = useState(route.params.docId);

    let evaluate_grade =[];
    let grade;
    let questions = ["Pergunta 1", "Pergunta 2"];

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
    };

    
    for(let i=0; i < questions.length; i++){
        return(
            <View>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>{questions[i]+ "/"+ questions.length}</Dialog.Title>
                    <Dialog.Description>
                        {questions[i]}
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
                    <Dialog.Button label="Continuar" onPress = {handleContinue}/>
                </Dialog.Container>
            </View>
        );
    }

}