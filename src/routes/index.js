//Controller about auth.routes, collaborator.routes

import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from '../routes/auth.routes';
import CollaboratorRoutes from '../routes/collaborator.routes';
import { AuthContext } from '../contexts/auth';

function Routes(){
    const {signed} = useContext(AuthContext);
    const loading = false;

    if(loading){
        <View
            style = {{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'darkkhaki'
            }}
        >
            <ActivityIndicator size = {50} color = "#e52246"/>

        </View>
    }

    return (
        signed ? <CollaboratorRoutes/> : <AuthRoutes/>
    );
}

export default Routes;