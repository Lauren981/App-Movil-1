import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useJuego } from './GameContext';

export default function HistorialPartidas() {
  const { estado } = useJuego();

  let ganadas = 0;
  let perdidas = 0;
  
  estado.partidas.forEach((p: any) => {
    if (p.resultado === 'ganada') {
      ganadas++;
    } else {
      perdidas++;
    }
  });

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Mis Partidas</Text>
      
      <View style={estilos.stats}>
        <View style={estilos.stat}>
          <Text style={estilos.numero}>{estado.partidas.length}</Text>
          <Text style={estilos.label}>Total</Text>
        </View>
        <View style={estilos.stat}>
          <Text style={[estilos.numero, estilos.win]}>{ganadas}</Text>
          <Text style={estilos.label}>Ganadas</Text>
        </View>
        <View style={estilos.stat}>
          <Text style={[estilos.numero, estilos.lose]}>{perdidas}</Text>
          <Text style={estilos.label}>Perdidas</Text>
        </View>
      </View>

      <ScrollView style={estilos.lista}>
        {estado.partidas.length === 0 ? (
          <Text style={estilos.vacio}>
            Aun no has jugado{'\n'}Empieza una partida!
          </Text>
        ) : (
          estado.partidas
            .slice()
            .reverse()
            .map((partida: any, index: number) => (
              <View key={index} style={estilos.item}>
                <View>
                  <Text style={estilos.partidaNum}>Juego #{estado.partidas.length - index}</Text>
                  <Text style={estilos.fecha}>
                    {partida.fecha.toLocaleDateString()}
                  </Text>
                </View>
                <View style={[
                  estilos.badge,
                  partida.resultado === 'ganada' ? estilos.badgeWin : estilos.badgeLose
                ]}>
                  <Text style={estilos.badgeText}>
                    {partida.resultado === 'ganada' ? 'Ganada' : 'Perdida'}
                  </Text>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
  },
  stat: {
    alignItems: 'center',
  },
  numero: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  win: {
    color: '#00cc00',
  },
  lose: {
    color: '#cc0000',
  },
  label: {
    fontSize: 11,
    color: '#666',
    marginTop: 3,
  },
  lista: {
    flex: 1,
  },
  vacio: {
    textAlign: 'center',
    fontSize: 15,
    color: '#888',
    marginTop: 30,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partidaNum: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  fecha: {
    fontSize: 13,
    color: '#777',
    marginTop: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeWin: {
    backgroundColor: '#ccffcc',
  },
  badgeLose: {
    backgroundColor: '#ffcccc',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },
});
