import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import formularioProducto from '../screens/formularioProducto';
import listaProductos from '../screens/listaProductos';

export default function BottomTabs() {
    const Tabs = createBottomTabNavigator()
    return (
        <Tabs.Navigator>
            <Tabs.Screen name='Formulario' component={formularioProducto} />
            <Tabs.Screen name='Lista' component={listaProductos} />
        </Tabs.Navigator>
    )
}