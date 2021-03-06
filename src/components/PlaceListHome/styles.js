import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 15px;
    margin: 15px 3%;
    background-color: #FFF;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
    elevation: 3;
`;
export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`;
export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 10px;
`;
export const CompanyName = styled.Text`
    color: #353840;
    font-size: 18px;
    font-weight: bold;
    align-items: center;
    margin-top: -45px;
    left: -45px;
    padding: 60px;
   
`;

export const ContentView = styled.View`
    align-items: center;
    margin-top: -40px;
    
`;

export const AddressText = styled.Text`
    margin-top: 15px;
    left: 5px;
    
`;

export const Actions = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const MoreInformationButtom = styled.TouchableOpacity`
    width: 150px;
    height: 40px
    margin-top: 10px;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    background-color: #6495ed;
    border-radius: 5px;
    
`;

export const EvaluatePlaceButtom = styled.TouchableOpacity`
    width: 150px;
    height: 40px;
    margin-top: 10px;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    background-color: #e52246;
    border-radius: 5px;
    margin-left:16px;
`;

export const TextButtom = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 15px;
`;

export const Grade = styled.Text`
    font-size: 25px;
    color: #bdb76b;
    font-weight: bold;
    left: 20px; 
`;