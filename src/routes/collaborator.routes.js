//Collaborator Routes
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import PlaceList from '../pages/PlaceList';
import AboutPlace from '../pages/AboutPlace';
import EvaluatePlace from '../pages/EvaluatePlace';
import Maps from '../pages/Maps';
import Question1 from '../pages/EvaluatePlace/Question1';
import Question2 from '../pages/EvaluatePlace/Question2';
import Question3 from '../pages/EvaluatePlace/Question3';
import Question4 from '../pages/EvaluatePlace/Question4';
import Question5 from '../pages/EvaluatePlace/Question5';
import FinishedEvaluate from '../pages/EvaluatePlace/FinishedEvaluate';

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

            <Stack.Screen 
                name="Maps" 
                component={Maps}
                options ={{
                    headerTintColor: '#FFF',
                    headerTitle: 'Mapa',
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                }}
                
            />
            
            <Stack.Screen 
                name="EvaluatePlace" 
                component={EvaluatePlace}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            />

            <Stack.Screen 
                name="Question1" 
                component={Question1}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            />

            <Stack.Screen 
                name="Question2" 
                component={Question2}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            />

            <Stack.Screen 
                name="Question3" 
                component={Question3}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            /> 

            <Stack.Screen 
                name="Question4" 
                component={Question4}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            />

            <Stack.Screen 
                name="Question5" 
                component={Question5}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            />

            <Stack.Screen 
                name="FinishedEvaluate" 
                component={FinishedEvaluate}
                options ={{
                    headerTintColor: '#FFF',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#bdb76b'
                    }
                    
                }}
            /> 

        </Stack.Navigator>
    );
}

function CollaboratorRoutes(){
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
            
            <Tab.Screen 
                //name = "Search"
                name = "Pesquisar" 
                component={Search}
                options ={{
                    tabBarIcon :({ color, size}) => {
                        return <Feather name = "search" color = {color} size = {size} />
                    }
                }}
            />
            
            <Tab.Screen 
                //name = "Profile"
                name = "Perfil" 
                component={Profile}
                options ={{
                    tabBarIcon :({ color, size}) => {
                        return <Feather name = "user" color = {color} size = {size} />
                    }
                }}
            />
        </Tab.Navigator>
    );
}
export default CollaboratorRoutes;