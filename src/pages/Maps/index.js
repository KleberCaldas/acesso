import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            region:null
        };
    }

    async componentDidMount(){
        await Geolocation.getCurrentPosition(
            async ({ coords:{latitude, longitude} })=>{
                this.setState({
                region:{
                latitude,
                longitude,
                latitudeDelta:0.0922,
                longitudeDelta:0.0421
            }
        });
        console.log('oi')
        },
        (error)=>{ 
            console.log(error.code, error.message)
         },
        {
            enableHighAccuracy: true,
            timeout:2000,
            maximumAge:1000,
            }
        )
    }

    render() {
        const {region} = this.state;
        return (
        <View style={styles.container}>
  
          <MapView
            minZoomLevel={3}
            style={styles.maps}
            region={region}
            showsUserLocation
            loadingEnabled
          />
  
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    maps:{
      width:'100%',
      height:'100%',
      marginTop: 15
    }
});



/*
export default function Maps() {

    return(
        <View style = {styles.container}>
            <MapView 
                style ={styles.maps}
                region={{
                    latitude: -22.9111689,
                    longitude: -43.238321, 
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.0421
                }}
                showsUserLocation={true}
            >


            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },
    
    maps:{
        width: '100%',
        height: '100%'
    },

});*/