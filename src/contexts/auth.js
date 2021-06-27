//Rules about login, register users

import React, {useState, createContext, useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('acesso');
        
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

    function showAlert(msg){
        Alert.alert(
            "Ops! Ocorreu um erro",
            msg,
            [
                {
                    text: "Ok",
                    style: "default",
                },
            ]
        )
    }


    async function signIn(email, password){
        setLoadingAuth(true);

        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            //search data about user logged in database
            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            console.log(userProfile.data().name);
            console.log(userProfile.data().category);

            let data = {
                uid: uid,
                name: userProfile.data().name,
                email: value.user.email,
                category: userProfile.data().category,
                disability: userProfile.data().disability,
            };

            setUser(data);
            storageUser(data);
            setLoading(false);
        })
        .catch((error) => {
            let msg = "Senha ou usuário incorretos, por favor, tente novamente."
            showAlert(msg);
            setLoadingAuth(false);
        })
    }

    async function signUp(email, password, name, disability){
        setLoadingAuth(true);
        
        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                name: name,
                category: "collaborator",
                email: email,
                disability: disability
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    category: value.user.category,
                    disability: value.user.disability
                };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
    })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function signOut(){
        await auth().signOut(); //method firebase
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
        setLoadingAuth(false);
    }


    async function storageUser(data){
        await AsyncStorage.setItem('acesso', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value = {{signed: !!user, user, signUp, signIn, signOut,loadingAuth, loading, storageUser, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;