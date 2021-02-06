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