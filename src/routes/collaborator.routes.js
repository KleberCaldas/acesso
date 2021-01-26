//Collaborator Routes
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../pages/Home';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import PlaceList from '../pages/PlaceList';
import AboutPlace from '../pages/AboutPlace';
import EvaluatePlace from '../pages/EvaluatePlace';

const Tab = createBottomTabNavigator();

function CollaboratorRoutes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name = "Home" component={Home}/>
            <Tab.Screen name = "Search" component={Search}/>
            <Tab.Screen name = "Profile" component={Profile}/>
        </Tab.Navigator>
    );
}
export default CollaboratorRoutes;