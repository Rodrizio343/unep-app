import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {Alert, StyleSheet, View, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {ActivityIndicator, Title, Card, Subheading, Paragraph} from 'react-native-paper'
import AppContext from '../context/AppContext';

const Details = ({route}) => {

    const {id} = route.params;
    const [loading, setLoading] = useState(true);
    const [vino, setVino] = useState({})
    const {moneda} = useContext(AppContext)

    
    useEffect(() => {
        const fetchVino = async () => {
            try {
               const jwt = await AsyncStorage.getItem('jwt');
               const {data} = await axios.get(`http://192.168.0.11:1337/products/${id}`,
               {
                   headers: {
                       Authorization: `Bearer ${jwt}`
                   }
               })
                  setVino(data);
                  setLoading(false);
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
        fetchVino(); 
    }, [])


    if(loading) return <ActivityIndicator animating={true}/>
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>{vino.name}</Title>
                <Card>
                <Card.Cover source={{uri: 'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/padrillos-pinot-noir-alejandro-kuschnaroff-argentina-finca-de-los-mendoza-vino-tinto-vinos-del-mundo_688_2000x.jpg?v=1545702332'}} />
                </Card>
                <Subheading>Esto es una prueba</Subheading>
                <Paragraph>{vino.description}</Paragraph>
                <Paragraph>{vino.notes}</Paragraph>
                <Text>Tu moneda es {moneda}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 16,
        backgroundColor: '#777'
    },
})


export default Details
