import React from 'react'; 
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext'; 

const Inicio = () => { 
const appContext = useAppContext();
const balance = appContext?.balance ?? 0;
const transactions = appContext?.transactions ?? [];
const deposit = appContext?.deposit ?? (() => {});

return ( 
<View style={styles.container}> 
<Text style={styles.title}>Bienvenido a MiBanco</Text> 
<Text style={styles.balance}>Saldo Actual: L.{balance}</Text> 
<Button title="Depositar L.500" onPress={deposit} /> 
<Text style={styles.subtitle}>Historial de Transacciones</Text> 
<FlatList 
data={transactions} 
keyExtractor={item => item.id.toString()} 
renderItem={({ item }) => ( 
<Text style={styles.transaction}> 
{item.type} de L.{item.amount} 
</Text> 
)} 
/> 
</View> 
); 
}; 

const styles = StyleSheet.create({ 
container: { flex: 1, padding: 20, alignItems: 'center' }, 
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }, 
balance: { fontSize: 20, marginBottom: 10 }, 
subtitle: { fontSize: 18, marginTop: 20 }, 
transaction: { fontSize: 16, marginTop: 5 }, 
}); 

export default Inicio; 