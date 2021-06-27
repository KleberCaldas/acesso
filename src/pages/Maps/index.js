import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';



export default class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            region:null,
            markers:[],
        };
    }

    async componentDidMount(){
        await firestore().collection("RJ")
        .onSnapshot( snapshot =>{
            const listPlace = [];

        snapshot.forEach(doc => {
            listPlace.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        this.setState({markers:listPlace});
        console.log(this.state.markers);
        //setLoading(false);

    }) 
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
        const {region, markers} = this.state;
            return (
            <View style={styles.container}>

            <MapView
                minZoomLevel={15}
                style={styles.maps}
                region={region}
                showsUserLocation
                loadingEnabled
            >

                {
                
                    markers.map((markers) => {
                        return(
                            <Marker 
                                coordinate = {{latitude: parseFloat(markers.latitude), longitude: parseFloat(markers.longitude)}} 
                                pinColor={'#FF0000'}
                                title = {markers.name}
                            />
                        );
                    })
                }
            </MapView>

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