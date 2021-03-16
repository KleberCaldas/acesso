import styled from 'styled-components/native';

export const View = styled.View`
background-color: #bdb76b;
flex:1
`;

export const ViewPicker = styled.View`
    margin-top: 10px;
    width: 80%;
    margin-left: 10%;
    background-color: #EEE;
    border-radius: 7px;
    
`;

export const Container = styled.View`
    background-color: #bdb76b;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    font-size: 16px;
`;

export const ButtonAdd = styled.TouchableOpacity`
    background-color: #418cfd;
    margin-right: 7px;
    border-radius: 4px;
    padding: 5px 12px;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput`
    width: 80%;
    padding: 10px;
    background-color: #EEE;
    margin-top: 10px;
    border-radius: 7px;
    font-size: 17px;
`;

export const PickerChoice = styled.Picker`
color: #808080;
    
`;

export const UpLoadButton = styled.TouchableOpacity`
    margin-top: 5%;
    background-color: #fff;
    width: 160px;
    height: 160px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    z-index: 5;

`;

export const UpLoadText = styled.Text`
    z-index: 9;
    position: absolute;
    font-size: 60px;
    color: #bdb76b;
    opacity: 0.8;
`;

export const ButtonGetLocation = styled.TouchableOpacity`
    background-color: #418cfd;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    justify-content: center
    align-items: center;
    position: absolute;
    bottom: 5%
    right: 5%; 
`;

export const Avatar = styled.Image`
margin-top: 5%;
width: 160px;
height: 160px;
border-radius: 80px;
opacity: 0.9;
`;