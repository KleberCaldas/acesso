import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import Dialog from 'react-native-dialog';
import {useNavigation} from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';

export default function FinishedEvaluate({route}){
    
    const navigation = useNavigation();
    const [placeId] = useState(route.params.placeId);
    const [evaluate_grade] = useState(route.params.evaluate_grade);
    const [visible, setVisible] = useState(true);
    

    const showDialog = () => {
        setVisible(true);
    };
    
    
    async function handleFinished(){

            let n = evaluate_grade.length
            let sum = 0
            for(let i in evaluate_grade){
                sum += evaluate_grade[i]
            }
            let final_grade = sum/n;

        try{
            await firestore().collection("RJ").doc(placeId)
            .update({
                grade: firebase.firestore.FieldValue.arrayUnion(final_grade)
            })

            navigation.navigate("PlaceList");
            setVisible(false);
        }
        catch(error){
            alert(error);
        }
    }

        return(
            <View>
                <Dialog.Container visible = {visible}>
                    <Dialog.Title>{"Avaliação concluída"}</Dialog.Title>
                    <Dialog.Description>
                        {"Agradecemos pelo seu feedback :)"}
                    </Dialog.Description>
                    <Dialog.Button label="Continuar" onPress = {handleFinished}/>
                </Dialog.Container>
            </View>
        );
}