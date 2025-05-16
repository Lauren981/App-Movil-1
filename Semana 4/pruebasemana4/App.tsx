import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProveedorJuego, JuegoContext } from './contexto/ContextoJuego';
import BotonIniciar from './componentes/BotonIniciar';
import Carta from './componentes/Carta';


class App extends React.Component {
  static contextType = JuegoContext;
  declare context: any;
  renderTablero() {
    const { cartas, voltearCarta } = this.context;
    return (
      <View style={styles.tablero}>
        {cartas.map((carta: any, index: number) => (
          <Carta
            key={index}
            valor={carta.valor}
            estaVolteada={carta.estaVolteada || carta.emparejada}
            manejarCarta={() => voltearCarta(index)}
          />
        ))}
      </View>
    );
  }

  render() {
    return (
      <ProveedorJuego>
        <View style={styles.container}>
          <BotonIniciar />
          <JuegoContext.Consumer>
            {() => this.renderTablero()}
          </JuegoContext.Consumer>
        </View>
      </ProveedorJuego>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tablero: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
