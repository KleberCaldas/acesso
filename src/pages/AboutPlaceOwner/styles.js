import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const ContainerButton = styled.View`
flex-direction:row;
`;

export const OpenGoogleMapsButton = styled.TouchableOpacity`
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    background-color: #6495ed;
    width: 40%;
    height: 50%;
    border-radius: 8px;
    right: 15px;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 20px;
    textAlign: center;
`;

export const EvaluateButton = styled.TouchableOpacity`
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    background-color: #e52246;
    width: 40%;
    height: 50%;
    border-radius: 8px;
    left: 15px;
`;


export const EvaluatePlaceButtom = styled.TouchableOpacity`
    color: #FFF;
    font-weight: bold;
    font-size: 15px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #121212;
    textAlign: center;
`;

export const Address = styled.Text`
    color: #121212;
    textAlign: center;
`;

export const ImageAvatar = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    margin-right: 10px;
    margin-top: 20px;
`;