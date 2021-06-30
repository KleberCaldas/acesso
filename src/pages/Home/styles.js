import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    align-items:center;
`;

export const ButtonMenu = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    text-alignVertical: center;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #bdb76b;
    
`;
    

export const ButtonText = styled.Text`
    font-size: 15px;
    color: #FFF;
    textAlign: center;
`;

export const Scroll = styled.ScrollView`
    
`;

export const ViewBtn = styled.View`
    flex-direction:row;
    flex: 1;
    align-items: center;
`;

export const ImageBtn = styled.Image`
    width: 35px;
    height: 35px;
`;