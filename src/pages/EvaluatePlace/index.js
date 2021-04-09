import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Dialog from 'react-native-dialog';
import {AirbnbRating} from 'react-native-ratings';

export default function EvaluatePlace({route}){
    
    //const [docId] = useState(route.params.docId);
    const [visible, setVisible] = useState(true);
    
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating);
    }

    const showDialog = () => {
        setVisible(true);
      };
    
    const handleCancel = () => {
        setVisible(false);
      };

    return(
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Pergunta 1/6</Dialog.Title>
                <Dialog.Description>
                    Qual foi sua experiência com corrimões, elevadores e rampas?
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
                <Dialog.Button label="Continuar" />
            </Dialog.Container>
        </View>
    );
}