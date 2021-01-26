import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Routes from './src/routes';
import AuthProvider from './src/contexts/auth'

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor = 'darkkhaki' barStyle = "light-content" translucent = {false}/>
        <Routes/>
      </AuthProvider>
      </NavigationContainer>
  );
}
