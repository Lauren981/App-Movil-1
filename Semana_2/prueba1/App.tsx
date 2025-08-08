import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ProveedorJuego } from './GameContext';
import NavegadorApp from './NavegadorApp';

export default function App() {
  return (
    <ProveedorJuego>
      <View style={miEstilo.container}>
        <StatusBar style="auto" />
        <NavegadorApp />
      </View>
    </ProveedorJuego>
  );
}

const miEstilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
