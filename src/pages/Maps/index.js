import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Modal} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import call from 'react-native-phone-call';
import {useNavigation} from '@react-navigation/native';
import { showLocation } from 'react-native-map-link';

export default class Maps extends Component {
    constructor(props){
        super(props);
        this.state = {
            region:null,
            markers:[],
            isVisible: false,
            markerName:null,
            markerAddress: null,
            markerPhone:null,
            markerCategory: null,
            markerAvatar: null,
            markerGrade: null,
            userLatitude: null,
            userLongitude: null,
            markerRamp: null,
            markerRestroom: null,
            markerDoor: null,
            markerParking: null,
            markerInternalMobility: null,
            markerLocation: null,
            markerInfo: null,
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

    openModal(){
        return true;
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

    call_phone(phone_number){
        const args = {
            number: phone_number,
            prompt: false
        }
        call(args).catch(console.error);
    }

    callAboutPlace(){

        navigation.navigate('AboutPlace', {name: this.state.markerName, address: this.state.markerAddress, phone: this.state.markerPhone, 
            category: this.state.markerCategory, avatarUrl: this.state.markerAvatar, grade: this.state.markerGrade, latitude: this.state.markerLatitude, longitude: this.state.markerLongitude, 
            ramp: this.state.markerRamp, restroom: this.state.markerRestroom, door: this.state.markerDoor, parking: this.state.markerParking,
            internal_mobility: this.state.markerInternalMobility, location: this.state.markerLocation, information: this.state.markerInfo});
    }

    openMaps(latitudeUser, longitudeUser, latitude, longitude, name){

        this.getLocation();

        showLocation({
            latitude: latitude, //latitude from place
            longitude: longitude, // longitude from place
            sourceLatitude: latitudeUser,  // optionally specify starting location for directions
            sourceLongitude: longitudeUser,  // not optional if sourceLatitude is specified
            title: name,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            //googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        })
    }

    getLocation(){
        Geolocation.getCurrentPosition(
        (position) => {
            const lat = JSON.stringify(position.coords.latitude);
            const long = JSON.stringify(position.coords.longitude);
            this.setState({userLatitude: lat, userLongitude: long}); 
        },
            (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
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
        const navigation = this.props;
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
                                <Callout onPress={()=>{this.setState({isVisible:true, 
                                                    markerName: markers.name, markerPhone: markers.phone, markerLatitude: markers.latitude,
                                                    markerLongitude: markers.longitude})}}>
                                    <View>
                                        <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
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
                                    <Callout onPress={()=>alert('O que deseja fazer?')}>
                                    <View>
                                        <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                        
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
                                    <Callout onPress={()=>alert('O que deseja fazer?')}>
                                    <View>
                                        <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                        
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
                                        <Callout onPress={()=>alert('O que deseja fazer?')}>
                                    <View>
                                        <View style={styles.containerCallout}>
                                            <Text numberOfLines={2} style={styles.name}>{markers.name}</Text>
                                            <Text style={styles.grade}>{this.final_grade(markers.grade)}</Text>
                                            
                                            <View style={styles.containerItems}>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "rampa")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "banheiro PCD")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "estacionamento")}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "mobilidade interna")}</Text>
                                                    <Text style={styles.textItems}>{this.find_item(markers.itemsReducedMobility, "elevador")}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.arrowBorder}/>
                                            <View style={styles.arrow}/>
                                        </View>
                                        
                                    </View>
                                </Callout>
                                    </Marker>
                            );}              
                    })
                }

            
            </MapView>

            <View>
                
                <Modal navigate={navigation} visible = {this.state.isVisible} animationType="slide" transparent = {true}>
                    <View style={styles.modalContainer}>
                    <Text style={styles.titleModal}>O que deseja fazer ?</Text>
                    <TouchableOpacity style={styles.buttonMenu} onPress = {() => this.call_phone(this.state.markerPhone)}>
                        <Text style={styles.phoneText}>Telefonar</Text>
                            <Feather
                                name = "phone-call"
                                color = "#FFF"
                                size = {20}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonMenu} onPress = {()=> navigation.navigate('AboutPlace', {name: this.state.markerName, address: this.state.markerAddress, phone: this.state.markerPhone, 
            category: this.state.markerCategory, avatarUrl: this.state.markerAvatar, grade: this.state.markerGrade, latitude: this.state.markerLatitude, longitude: this.state.markerLongitude, 
            ramp: this.state.markerRamp, restroom: this.state.markerRestroom, door: this.state.markerDoor, parking: this.state.markerParking,
            internal_mobility: this.state.markerInternalMobility, location: this.state.markerLocation, information: this.state.markerInfo})}>
                        <Text style={styles.phoneText}>Mais informações</Text>
                            <Feather
                                name = "info"
                                color = "#FFF"
                                size = {20}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonMenu} onPress = {()=> this.openMaps(this.state.userLatitude,this.state.userLongitude, this.state.markerlatitude, this.state.markerlatitude,
                        this.state.markerName)}>
                        <Text style={styles.phoneText}>Ir ao local</Text>
                            <Feather
                                name = "map-pin"
                                color = "#FFF"
                                size = {20}
                            />
                    </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonBack} onPress = { ()=>{this.setState({isVisible:false})} }>
                            <Feather
                                name="arrow-left"
                                size={25}
                                color ="#bdb76b"
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
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
            width: 320,
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

        namePlaceModal:{
            fontSize: 15,
            fontWeight:'bold',
            marginBottom: 5,
            padding: 10,
            textAlign: 'center',
            marginTop:20,
        },

        titleModal:{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            fontSize: 25,
            color: 'black',
            fontWeight: 'bold',
        },

        containerItems:{
            flexDirection: 'row',
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            justifyContent: 'space-between',
        },

        textItems:{
            fontSize: 12
        },

        image:{
            width: "100%",
            height: 80,
            borderRadius: 10,
        },

        modalContainer:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: "#FFF",
        position: 'absolute',
        alignItems: 'center',
        
        bottom: 0,
        },

        buttonBack:{
            
            position: 'absolute',
            top: 20,
            left: 25,
            flexDirection: 'row',
            alignItems: 'center',
        },

        buttonMenu:{
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#007a87',
            width: '80%',
            height:'10%',
            borderRadius: 8,
        },

        phoneText:{
            marginRight: '10%',
            marginLeft: '30%',
            fontSize: 15,
            color: '#FFF',
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