import React from 'react'
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormularioArticulo from '../screens/FormularioArticulo';
import ListaArticulos from '../screens/ListaArticulos';

export default function BottomTabs() {
    const Tabs = createBottomTabNavigator()
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: '#666',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                headerStyle: {
                    backgroundColor: '#4CAF50',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen 
                name='Formulario' 
                component={FormularioArticulo}
                options={{
                    title: 'Agregar Producto',
                    tabBarIcon: () => <Text>➕</Text>,
                }}
            />
            <Tabs.Screen 
                name='Lista' 
                component={ListaArticulos}
                options={{
                    title: 'Mis Productos',
                    tabBarIcon: () => <Text>📋</Text>,
                }}
            />
        </Tabs.Navigator>
    )
}
