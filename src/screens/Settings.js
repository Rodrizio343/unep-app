import React, { useContext } from 'react'
import {Text, View} from 'react-native'
import { Button } from 'react-native-paper';
import AppContext from '../context/AppContext'

const Settings = () => {

    const {handleSetMoneda} = useContext(AppContext);

    const handlePress = () =>  handleSetMoneda('EUR')

    return (
        <View>
            <Text>Hola, soy Settings</Text>
            <Button onPress={handlePress}>CAMBIAR MONEDA EUR</Button>
        </View>
        
    )
}

export default Settings
