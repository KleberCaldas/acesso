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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackScreen(){ //manager pages in stack
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="PlaceList" component={PlaceList}/>
            <Stack.Screen name="AboutPlace" component={AboutPlace}/>
            <Stack.Screen name="EvaluatePlace" component={EvaluatePlace}/>
        </Stack.Navigator>
    );
}

function CollaboratorRoutes(){
    return(
        <Tab.Navigator
            tabBarOptions = {{
                keyboardHidesTabBar: true,
                showLabel: true, //show name

                sytle:{
                    backgroundColor: '#FFF',
                    borderTopWidth: 20,
                },

                activeTintColor: '#bdb76b'
            }}
        >
            <Tab.Screen 
                name = "Home" 
                component={StackScreen}
                options ={{
                    tabBarIcon :({ color, size}) => {
                        return <Feather name="home" color={color} size = {size}/>
                    }
                }}
            />
            
            <Tab.Screen 
                name = "Search" 
                component={Search}
                options ={{
                    tabBarIcon :({ color, size}) => {
                        return <Feather name = "search" color = {color} size = {size} />
                    }
                }}
            />
            
            <Tab.Screen 
                name = "Profile" 
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