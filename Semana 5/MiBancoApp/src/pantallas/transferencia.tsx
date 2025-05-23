import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext'; 

const Transferencias = () => { 
const appContext = useAppContext(); 
const balance = appContext?.balance ?? 0; 
const transfer = appContext?.transfer;
const [accountNumber, setAccountNumber] = useState(''); 
const [recipient, setRecipient] = useState(''); 
const [amount, setAmount] = useState(''); 

const handleTransfer = () => { 
const transferAmount = parseFloat(amount); 

if (!accountNumber || !recipient || isNaN(transferAmount) || transferAmount <= 0) { 
Alert.alert("Error", "Por favor, ingrese datos válidos. "); 
return; 
} 

if (transfer && transfer(transferAmount, recipient)) { 
setAccountNumber(''); 
setRecipient(''); 
setAmount(''); 
} 
}; 

return ( 
<View style={styles.container}> 
<Text style={styles.title}>Realizar una Transferencia</Text> 
<Text style={styles.balance}>Saldo Disponible: L.{balance}</Text> 

<TextInput 
style={styles.input} 
placeholder="Número de cuenta" 
value={accountNumber} 
onChangeText={setAccountNumber} 
keyboardType="numeric" 
/> 

<TextInput 
style={styles.input} 
placeholder="Nombre del destinatario" 
value={recipient} 
onChangeText={setRecipient} 
/> 

<TextInput 
style={styles.input} 
placeholder="Monto a transferir" 
value={amount} 
onChangeText={setAmount} 
keyboardType="numeric" 
/> 

<Button title="Transferir Saldo" onPress={handleTransfer} /> 
</View> 
); 
}; 


const styles = StyleSheet.create({ 
container: { flex: 1, padding: 20, alignItems: 'center' }, 
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }, 
balance: { fontSize: 20, marginBottom: 10 }, 
input: {
width: '100%',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,
marginBottom: 10,
},
}); 

export default Transferencias; 