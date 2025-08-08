import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// cada carta individual
function ComponenteCarta({ carta, onPress }: any) {
  
  let colorFondo = '#4287f5';
  if (carta.volteada) {
    colorFondo = '#d3d3d3';
  }
  if (carta.emparejada) {
    colorFondo = '#32cd32';
  }
  
  return (
    <TouchableOpacity
      style={[
        estilos.carta,
        { backgroundColor: colorFondo }
      ]}
      onPress={onPress}
      disabled={carta.volteada || carta.emparejada}
    >
      <Text style={estilos.letra}>
        {carta.volteada || carta.emparejada ? carta.valor : '?'}
      </Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  carta: {
    width: 65,
    height: 65,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#666',
  },
  letra: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
  },
});

export default ComponenteCarta;
