import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useBalance } from '../BalanceContext';

export function HistoryScreen() {
  const { transacciones } = useBalance();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Historial de Transacciones</Text>
        <Text style={styles.total}>Total de transacciones: {transacciones.length}</Text>
        <FlatList
          data={transacciones}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>{item.desc}</Text>
            </View>
          )}
          style={{ width: '100%', marginTop: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  total: {
    color: '#FFD600',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 64,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 4,
  },
});