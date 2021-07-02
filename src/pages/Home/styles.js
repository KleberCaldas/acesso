import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    align-items:center;
    flex-direction: column;
`;

export const ButtonMenu = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    text-alignVertical: center;
    margin-left: 15px;
    margin-right: 15px;
    margin-right: 20px;
    background-color: #bdb76b;
    margin-top: 20px;
`;
    

export const ButtonText = styled.Text`
    font-size: 15px;
    color: #FFF;
    textAlign: center;
`;

export const Scroll = styled.ScrollView`
    flex:0.3;
`;

export const ViewPlaceList = styled.View`
    flex-direction:column;
    flex: 1;
`;

export const ImageBtn = styled.Image`
    width: 35px;
    height: 35px;
    `;

export const Text = styled.Text`
`;