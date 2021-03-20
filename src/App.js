import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Tabs from './components/Tabs'
import Login from './screens/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert, Text} from 'react-native' 
import Details from './screens/Details';
import AppProvider from './components/AppProvider';


const Stack = createStackNavigator();


export default function App() {
  
  const [loading, setLoading] = useState(true)
  const [initialRouteName, setInitialRouteName] = useState('Login')
  

  useEffect(() => {
    const getToken = async () => {
        // await AsyncStorage.removeItem('jwt');
        try {
          const jwt = await AsyncStorage.getItem('jwt');
          if(jwt){
            setInitialRouteName('Main');
          }
          setLoading(false);
          
        } catch (error) {
          Alert.alert('Error', error.message)
        }
      }
    getToken();
  }, [])

  

  if(loading) 
  return (
  <SafeAreaView>
      <Text>Cargando...</Text>
  </SafeAreaView>
  )

  return (
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Main' component={Tabs}/>
            <Stack.Screen name='Details' component={Details}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    
  );
}

registerRootComponent(App)