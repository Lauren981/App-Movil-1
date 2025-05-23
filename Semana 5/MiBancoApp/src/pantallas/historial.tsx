import React from 'react'; 
import { View, Text, FlatList, StyleSheet } from 'react-native'; 
import { useAppContext } from '../context/AppContext'; 

const Historial = () => { 
const appContext = useAppContext(); 
const transactions = appContext?.transactions || [];

return ( 
<View style={styles.container}> 
<Text style={styles.title}>Historial de Transacciones</Text> 
<FlatList 
data={transactions} 
keyExtractor={(item) => item.id.toString()} 
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
transaction: { fontSize: 16, marginTop: 5 }, 
}); 

export default Historial; 