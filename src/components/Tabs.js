import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '../screens/Home'
import Shop from '../screens/Shop'
import Settings from '../screens/Settings'

const Tab = createMaterialBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' options={{tabBarIcon: 'home-account'}} component={Home} />
            <Tab.Screen name='Shop' options={{tabBarIcon: 'home-account'}} component={Shop} />
            <Tab.Screen name='Settings' options={{tabBarIcon: 'home-account'}} component={Settings} />
        </Tab.Navigator>
    )
}

export default Tabs
