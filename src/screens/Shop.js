import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{Text, FlatList, View} from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Carousel from 'react-native-snap-carousel';

const Shop = () => {
    const [vinos, setVinos] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        const getVinos = async () => {
            try {
                const jwt = await AsyncStorage.getItem('jwt');
                const {data} = await axios.get('http://192.168.0.11:1337/products', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
               setVinos(data)
               console.log(vinos)
            } catch (error) {
                console.log(error)
            }
        }
        getVinos();
    }, [])


    const handlePressVer = (id) => () => navigation.navigate('Details', {id})

    _renderItem = ({item}) =>
        <Card>
             {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
             <Card.Cover source={ {uri: item.picture.formats.thumbnail.url} } />
             <Card.Content>
                 <Title>{item.name}</Title>
                 <Paragraph>{item.description}</Paragraph>
             </Card.Content>
             <Card.Actions>
                 <Button onPress={handlePressVer(item.id)}>Ver Más</Button>
                 <Button>Comprar</Button>
             </Card.Actions>
         </Card>
    

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        
        <Carousel
            //   ref={(c) => { this._carousel = c; }}
            Layout={"default"}
             data={vinos}
              renderItem={_renderItem}
              sliderWidth={300}
              itemWidth={300}
            />

        </View>

    )
}

export default Shop
