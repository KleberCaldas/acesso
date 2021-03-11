import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
`;

export const ButtonAddPlace = styled.TouchableOpacity`
    background-color: #bdb76b;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    justify-content: center
    align-items: center;
    position: absolute;
    bottom: 5%
    right: 5%; 
`;

export const ButtonMenu = styled.TouchableOpacity`
    width: 150px;
    height: 150px;
    border-radius: 9px;
    justify-content: center;
    align-items: center;
    text-alignVertical: center;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #bdb76b;
    
`;
    

export const ButtonText = styled.Text`
    font-size: 25px;
    color: #FFF;
    textAlign: center;
`;

export const ViewBtn = styled.View`
    flexDirection: row;
    justify-content: center;
`;