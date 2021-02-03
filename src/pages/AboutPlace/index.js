import React, {useState} from 'react';
import {View, Text} from 'react-native';
//import {useNavigation} from '@react-navigation/native';

export default function AboutPlace({route}){
    
    const [docId] = useState(route.params.docId);
    
    return(
        <View>
            <Text>{docId}</Text>
        </View>
    );
}