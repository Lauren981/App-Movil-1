import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// ...import eliminado por duplicado

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Transfer: undefined;
  History: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type TransferScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>;
type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useBalance } from '../BalanceContext';

export function TransferScreen({ navigation }: { navigation: TransferScreenNavigationProp }) {
  const { balance, retiro } = useBalance();
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    const monto = parseFloat(amount);
    if (!account || !name || !amount || isNaN(monto) || monto <= 0) {
      Alert.alert('Error', 'Completa todos los campos con datos válidos.');
      return;
    }
    if (monto > balance) {
      Alert.alert('Saldo insuficiente', 'No cuenta con el saldo para completar la transacción');
      return;
    }
    retiro(monto, `Transferencia a ${name} (${account}) de L.${monto}`);
    setAccount('');
    setName('');
    setAmount('');
    Alert.alert('Éxito', '¡Transferencia realizada con éxito!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Transferir Saldo</Text>
        <Text style={styles.label}>Número de Cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 1234567890"
          placeholderTextColor="#aaa"
          value={account}
          onChangeText={setAccount}
          keyboardType="number-pad"
        />
        <Text style={styles.label}>Nombre del Destinatario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Pérez"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Monto a Transferir</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 500"
          placeholderTextColor="#aaa"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <View style={{ marginVertical: 16 }}>
          <Button title="Transferir Saldo" onPress={handleTransfer} color="#FFD600" />
        </View>
        <Text style={styles.balance}>Saldo actual: L. {balance.toLocaleString()}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 8,
    width: '100%',
    fontSize: 16,
  },
  balance: {
    color: '#FFD600',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
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