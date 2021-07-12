import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';



export default class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            region:null,
            markers:[],
        };
    }

    final_grade(grade){
        try{
            let n = grade.length
            let sum = 0
            for(let i in grade){
                sum += grade[i]
            }
            return (sum/n).toFixed(1);
        }
        catch(error){
            return "N/A";
        }
    }

    find_item(array_items, item){
        try{
            const found = array_items.find(element => element == item);

            if(found == undefined){
                return "Não possui " + item;
            }
            else{
                return "Possui " + item;
            }
        }
        catch(e){
            return "Erro";
        }
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
                        if(this.final_grade(markers.grade) >= 4){
                        return(
                            <Marker style={styles.marker} 
                                coordinate = {{latitude: parseFloat(markers.latitude), longitude: parseFloat(markers.longitude)}} 
                                image = {require('../../images/wheelchair_green.png')}
                                title = {markers.name}
                                description = {markers.address}
                            >
                                <Callout onPress={()=>alert('O que deseja fazer?')}>
                                    <View>
                                        <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                        
                                    </View>
                                </Callout>
                            </Marker>
                        );}
                        else if(this.final_grade(markers.grade) >= 3){
                            return(
                                <Marker style={styles.marker} 
                                    coordinate = {{latitude: parseFloat(markers.latitude), longitude: parseFloat(markers.longitude)}} 
                                    image = {require('../../images/wheelchair_yellow.png')}
                                    title = {markers.name}
                                    description = {markers.address}
                                >
                                    <Callout tootip>
                                    <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                    </Callout>
                                </Marker>
                        );}

                        else if(this.final_grade(markers.grade) < 3){
                            return(
                                <Marker style={styles.marker} 
                                    coordinate = {{latitude: parseFloat(markers.latitude), longitude: parseFloat(markers.longitude)}} 
                                    image = {require('../../images/wheelchair_red.png')}
                                    title = {markers.name}
                                    description = {markers.address}
                                >
                                    <Callout tootip>
                                    <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                    </Callout>
                                </Marker>
                            );}
                        else{
                                return(
                                    <Marker style={styles.marker} 
                                        coordinate = {{latitude: parseFloat(markers.latitude), longitude: parseFloat(markers.longitude)}} 
                                        image = {require('../../images/wheelchair_gray.png')}
                                        title = {markers.name}
                                        description = {markers.address}
                                        
                                    >
                                        <Callout tootip>
                                        <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                        </Callout>
                                    </Marker>
                            );}    
                        
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
        containerCallout:{
            flexDirection:'column',
            alignSelf: 'flex-start',
            
            backgroundColor: '#fff',
            borderColor: '#ccc',
            padding: 15,
            width: 250,
        },

        containerTitleImage:{
            flexDirection:'row',
        },

        arrow:{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: '#fff',
            borderWidth: 16,
            alignSelf: 'center',
            marginTop: -32,
        },

        arrowBorder:{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: '#007a87',
            borderWidth: 16,
            alignSelf: 'center',
            marginTop: -0.5,
        },

        grade:{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#bdb76b',
            textAlign: 'center',
        },

        name:{
            fontSize: 15,
            fontWeight:'bold',
            marginBottom: 5,
            padding: 10,
            textAlign: 'center',
            
        },

        containerItems:{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between'

        },

        image:{
            width: "100%",
            height: 80,
            borderRadius: 10,
        },

        maps:{
        width:'100%',
        height:'100%',
        marginTop: 15
        },
        marker:{
            fontSize:30,
        }
});