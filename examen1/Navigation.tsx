import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Button } from 'react-native';
import { HomeScreen } from './pages/inicio';
import { TransferScreen } from './pages/transferencias';
import { HistoryScreen } from './pages/historial';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Transfer: undefined;
  History: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type TransferScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>;
type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;  

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#FFD600',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#222', height: 64, borderTopWidth: 0.5, borderTopColor: '#444' },
          tabBarLabelStyle: { fontSize: 14, marginBottom: 4 },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Transfer') {
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            }
            return <Ionicons name={iconName as any} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Transfer" component={TransferScreen} options={{ title: 'Transfer' }} />
        <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}