import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Dialog from 'react-native-dialog';

export default function EvaluatePlace({route}){
    
    //const [docId] = useState(route.params.docId);
    
    return(
        <View>
            <Dialog.Container visible={true}>
                <Dialog.Title>Pergunta 1</Dialog.Title>
                <Dialog.Description>
                    Qual foi sua experiência com corrimões, elevadores e rampas?
                </Dialog.Description>
                <Dialog.Button label="Voltar" />
                <Dialog.Button label="Continuar" />
            </Dialog.Container>
        </View>
    );
}