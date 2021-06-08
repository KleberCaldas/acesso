import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Container, View, Title, TextBody,
    ButtonTextOk, ButtonOk} from './styles';

export default function EvaluatePlace({route}){
    
    const [placeId] = useState(route.params.docId);

    let evaluate_grade =[];
    let questions_type_1 = ["Qual foi sua experiência com rampas, corrimões, portas, elevadores ou escadas?"
                        , "Qual foi sua experiência em locais PCD reservados?"
                        , "Qual foi sua experiência com banheiros, provadores?"
                        , "Qual foi sua experiência com equipamentos (bebedouros, balcões)?"
                        , "Qual foi sua experiência com informações (placas, sinalizações)?"];
    let index = 0;
    let len = questions_type_1.length;

    const navigation = useNavigation();
        return(
            <View>
                <Container>
                <Title>Bem-vindo a avaliação</Title>
                <TextBody>Amigo(a) colaborador(a), com a avaliação a partir de sua experiência nos auxiliará
                    a melhorar os espaços deste estabelecimento de acordo com as métricas do Design Universal.
                </TextBody>

                <TextBody>
                    A avaliação consiste em perguntas com notas de 1 estrela (ruim) até 5 esrelas(Excelente) de alguns critérios 
                    de mobiliário, mobilidade, informações etc. Após responder as perguntas, o sistema efetuará uma média simples
                    das notas das perguntas e salvará a avaliação. Já a média final (a nota que aparece na busca do estabelecimento) é
                    a média simples de todas as avaliações recentes do estabelecimento.
                </TextBody>
                <ButtonOk onPress = {()=> navigation.navigate('Question1', {placeId, questions_type_1, evaluate_grade, index, len})}>
                    <ButtonTextOk>Vamos Começar</ButtonTextOk>
                </ButtonOk>
                </Container>
            </View>
        );
}