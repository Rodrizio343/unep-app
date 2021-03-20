import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, Text, Button, View, Alert } from 'react-native';

const Login = ({navigation}) => {
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            if(userName && password){
                setLoading(true);
                const {data} = await axios.post(
                    'http://192.168.0.11:1337/auth/local',
                    {
                        identifier: userName,
                        password,
                    }
                )
                console.log(data.jwt)
                await AsyncStorage.setItem('jwt', data.jwt)
                navigation.reset({
                    index: 0,
                    routes: [{name:'Main'}]
                });
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TextInput style={{height:40, borderColor: "gray", borderWidth: 1, margin: 16, width:200}} onChangeText={(text) => setuserName(text)} value={userName}/>
            <TextInput style={{height:40, borderColor: "gray", borderWidth: 1, margin: 16, width:200}} onChangeText={(text) => setPassword(text)}  value={password} secureTextEntry/>
            {
                loading ? (<Text>Cargando..</Text>) : (<Button title="Log In" onPress={handleLogin} style={{height:40, borderColor: "gray", borderWidth: 1, margin: 16, width: 30}}/>)
            }
        </View>
    )
}

export default Login
