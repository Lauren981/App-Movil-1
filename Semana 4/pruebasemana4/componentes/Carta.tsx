import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  valor: string;
  estaVolteada: boolean;
  manejarCarta: () => void;
}

class Carta extends React.Component<Props> {
  render() {
    const { valor, estaVolteada, manejarCarta } = this.props;
    return (
      <TouchableOpacity style={styles.carta} onPress={manejarCarta} disabled={estaVolteada}>
        <Text style={styles.texto}>{estaVolteada ? valor : '?'}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  carta: {
    width: 60,
    height: 90,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  texto: {
    fontSize: 24,
  },
});

export default Carta;