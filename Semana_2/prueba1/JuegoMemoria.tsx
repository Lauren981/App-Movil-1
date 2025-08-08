import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useJuego } from './GameContext';
import ComponenteCarta from './ComponenteCarta';

function JuegoMemoria() {
  const { estado, dispatch } = useJuego();

  useEffect(() => {
    if (estado.cartasVolteadas.length === 2) {
      const primera = estado.cartasVolteadas[0];
      const segunda = estado.cartasVolteadas[1];
      
      setTimeout(() => {
        if (primera.valor === segunda.valor) {
          // si son iguales
          dispatch({ type: 'MARCAR_PARES', cartas: [primera, segunda] });
          
          // ver si ya ganó
          let yaGano = true;
          estado.cartas.forEach((carta: any) => {
            if (!carta.emparejada && carta.id !== primera.id && carta.id !== segunda.id) {
              yaGano = false;
            }
          });
          
          if (yaGano) {
            setTimeout(() => {
              Alert.alert('¡Ganaste!', '¡Encontraste todos los pares!');
              dispatch({ type: 'TERMINAR_JUEGO', resultado: 'ganada' });
            }, 500);
          }
        } else {
          // no son iguales
          dispatch({ type: 'RESETEAR_CARTAS' });
          setTimeout(() => {
            Alert.alert('Perdiste', 'Las cartas no coinciden');
            dispatch({ type: 'TERMINAR_JUEGO', resultado: 'perdida' });
          }, 500);
        }
      }, 1000);
    }
  }, [estado.cartasVolteadas]);

  function empezar() {
    dispatch({ type: 'INICIAR_JUEGO' });
  }

  function tocarCarta(carta: any) {
    // solo si no está volteada ya
    if (!carta.volteada && !carta.emparejada) {
      dispatch({ type: 'VOLTEAR_CARTA', carta });
    }
  }

  function nuevoJuego() {
    dispatch({ type: 'NUEVO_JUEGO' });
  }

  if (!estado.juegoIniciado) {
    return (
      <View style={estilos.pantalla}>
        <Text style={estilos.titulo}>Memoria</Text>
        <Text style={estilos.info}>
          Busca los pares iguales
        </Text>
        <TouchableOpacity style={estilos.boton} onPress={empezar}>
          <Text style={estilos.textoBoton}>Empezar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.titulo}>Memoria</Text>
      
      <View style={estilos.tablero}>
        {estado.cartas.map((carta: any, index: number) => (
          <ComponenteCarta
            key={`carta-${index}`}
            carta={carta}
            onPress={() => tocarCarta(carta)}
          />
        ))}
      </View>

      {estado.juegoTerminado && (
        <TouchableOpacity style={estilos.botonOtro} onPress={nuevoJuego}>
          <Text style={estilos.textoBoton}>Otra vez</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  tablero: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 270,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#007acc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  botonOtro: {
    backgroundColor: '#cc3300',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  textoBoton: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default JuegoMemoria;
