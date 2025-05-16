import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { JuegoContext } from '../contexto/ContextoJuego';

type JuegoContextType = {
  iniciarJuego: () => void;
  // agrega aquí otras propiedades si existen en tu contexto
};

class BotonIniciar extends React.Component {
  static contextType = JuegoContext;
  declare context: JuegoContextType;
  render() {
    const { iniciarJuego } = this.context;
    return (
      <TouchableOpacity style={styles.boton} onPress={iniciarJuego}>
        <Text style={styles.texto}>Iniciar a Jugar</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  texto: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BotonIniciar;