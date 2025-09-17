import React from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { useBalance } from '../BalanceContext';

export function HomeScreen() {
  const { balance, deposito, transacciones } = useBalance();

  const SetDeposito = () => {
    deposito(500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¡Hola, usuario!</Text>
        <Text style={styles.balanceLabel}>Saldo Actual:</Text>
        <Text style={styles.balance}>L. {balance.toLocaleString()}</Text>
        <View style={{ marginVertical: 16 }}>
          <Button title="Depositar Saldo" onPress={SetDeposito} color="#FFD600" />
        </View>
        <Text style={styles.transLabel}>Transacciones recientes:</Text>
        <FlatList
          data={transacciones}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>{item.desc}</Text>
            </View>
          )}
          style={{ width: '100%' }}
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
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  balance: {
    color: '#FFD600',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
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