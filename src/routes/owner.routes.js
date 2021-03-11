//Owner Routes
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/HomeOwner';
import Profile from '../pages/Profile';
import NewPlace from '../pages/NewPlace';
import PlaceList from '../pages/PlaceList';
import AboutPlace from '../pages/AboutPlace';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackScreen(){ //manager pages in stack
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{headerShown:false}}
            />

            <Stack.Screen 
                name="NewPlace" 
                component={NewPlace}
                options ={{
                    headerTintColor: '#FFF',
                    headerTitle: 'Cadastro de novo lugar',
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                }}
            />
            
            <Stack.Screen 
                name="PlaceList" 
                component={PlaceList}
                options ={{
                    headerTintColor: '#FFF',
                   // headerTitle: 'Lista de locais próximos',
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                }}
            />
            
            <Stack.Screen 
                name="AboutPlace" 
                component={AboutPlace}
                options ={{
                    headerTintColor: '#FFF',
                    headerTitle: 'Mais Informações',
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                }}
                
            />
            
           
        </Stack.Navigator>
    );
}

function OwnerRoutes(){
    return(
        <Tab.Navigator
            tabBarOptions = {{
                keyboardHidesTabBar: true,
                showLabel: true, //show name
                labelStyle:{
                    fontSize: 15,
                },
                

                sytle:{
                    backgroundColor: '#FFF',
                    borderTopWidth: 30,
                    
                },

                activeTintColor: '#bdb76b'
            }}
        >
            <Tab.Screen 
                //name = "Home"
                name = "Início" 
                component={StackScreen}
                options ={{
                    tabBarIcon :({ color, size}) => {
                        return <Feather name="home" color={color} size = {size}/>
                    }
                }}
            />
        </Tab.Navigator>
    );
}
export default OwnerRoutes;