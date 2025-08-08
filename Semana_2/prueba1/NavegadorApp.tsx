import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import JuegoMemoria from './JuegoMemoria';
import HistorialPartidas from './HistorialPartidas';

export default function NavegadorApp() {
  const [vista, setVista] = useState('juego');

  return (
    <View style={estilos.container}>
      <View style={estilos.tabs}>
        <TouchableOpacity
          style={[estilos.tab, vista === 'juego' && estilos.activo]}
          onPress={() => setVista('juego')}
        >
          <Text style={[estilos.texto, vista === 'juego' && estilos.textoActivo]}>
            Juego
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[estilos.tab, vista === 'historial' && estilos.activo]}
          onPress={() => setVista('historial')}
        >
          <Text style={[estilos.texto, vista === 'historial' && estilos.textoActivo]}>
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.content}>
        {vista === 'juego' ? <JuegoMemoria /> : <HistorialPartidas />}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activo: {
    borderBottomColor: '#0066cc',
  },
  texto: {
    fontSize: 15,
    fontWeight: '500',
    color: '#888',
  },
  textoActivo: {
    color: '#0066cc',
  },
  content: {
    flex: 1,
  },
});
