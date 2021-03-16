//Controller about auth.routes, collaborator.routes, owner.routes

import React, { useContext, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from '../routes/auth.routes';
import CollaboratorRoutes from '../routes/collaborator.routes';
import OwnerRoutes from '../routes/owner.routes';
import { AuthContext } from '../contexts/auth';

function Routes(){
    const {signed, loading, user} = useContext(AuthContext);

    if(loading){
        return(
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
        );
        
    }

    if(signed === true){
        
        const userCategory = user?.category;
        
        if(userCategory === "collaborator"){
            return(<CollaboratorRoutes/>);
        }
        if(userCategory === "owner"){
            return(<OwnerRoutes/>);
        }
        else{
            return(<AuthRoutes/>);
        }
    }
    else{
        return(<AuthRoutes/>);
    }    

}

export default Routes;