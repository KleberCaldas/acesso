import React from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';

export default function Maps() {

    return(
        <View>
            <Text> Teste</Text>

            <MapView
                style={{width:350, height:350}}
                initialRegion={{
                    latitude:-22.9111689,
                    longitude:-43.238321,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.0421
                }}
            />
         </View>
        );

}