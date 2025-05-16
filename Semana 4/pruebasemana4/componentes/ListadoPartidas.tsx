import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { JuegoContext } from '../contexto/ContextoJuego';

const ListadoPartidas = () => {
  const { partidas } = useContext(JuegoContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listado de Partidas</Text>
      {partidas.length === 0 ? (
        <Text>No se han jugado partidas aún.</Text>
      ) : (
        partidas.map((partida, index) => (
          <Text key={index} style={styles.partida}>
            Partida {index + 1}: {partida.resultado}
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  partida: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ListadoPartidas;