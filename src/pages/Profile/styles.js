import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #bdb76b;
`;

export const Name = styled.Text`
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 25px;
    color: #FFF;
    font-weight: bold;
`;

export const Email = styled.Text`
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 20px;
    color: #FFF;
    font-weight: bold;
    font-style: italic;
`;

export const UpdateButton = styled.TouchableOpacity`
margin-top: 20px;
align-items: center;
justify-content: center;
background-color: #6495ed
width: 80%;
height: 10%;
border-radius: 8px;
`;

export const UpdateButtonText = styled.Text`
font-size: 20px;
color: #FFF;
font-weight: bold;

`;

export const ExitButton = styled.TouchableOpacity`
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    width: 80%;
    height: 10%;
    border-radius: 8px;
`;

export const ExitText = styled.Text`
    font-size: 20px;
    color: #6495ed;
    font-weight: bold;
`;

export const ModalContainer = styled.View`
    width: 100%;
    height: 70%;
    background-color: #FFF;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
`;

export const ButtonTextModal = styled.Text`
    font-size: 20px;
    color: #bdb76b;
    font-weight: bold;
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    left: 25px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    width: 90%;
    height: 50px;
    margin-top: 20;
    background-color: #DDD;
    border-radius: 10px;
    padding: 10px;
    font-size: 20px;
    text-align: center;
`;