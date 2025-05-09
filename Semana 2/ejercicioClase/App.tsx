import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';

export default function App() {
  let num1 = '';
  let num2 = '';
  let operation = '';
  let result = '';

  const calcular = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const op = parseInt(operation);

    switch (op) {
      case 1:
        result = (n1 + n2).toString();
        break;
      case 2:
        result = (n1 - n2).toString();
        break;
      case 3:
        result = (n1 * n2).toString();
        break;
      case 4:
        result = n2 !== 0 ? (n1 / n2).toString() : 'División por cero';
        break;
      default:
        result = 'Operación inválida';
    }

    alert(`Resultado: ${result}`); // Mostrar el resultado en una alerta
  };

  return (
    <View style={styles.container}>
      <Text>Ingrese Numero 1:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el primer número"
        keyboardType="numeric"
        onChangeText={(text) => (num1 = text)}
      />
      <Text>Ingrese Numero 2:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el segundo número"
        keyboardType="numeric"
        onChangeText={(text) => (num2 = text)}
      />
      <Text>Ingrese Operación (1: +, 2: -, 3: *, 4: /):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la operación"
        keyboardType="numeric"
        onChangeText={(text) => (operation = text)}
      />
      <Button title="Calcular" onPress={calcular} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});
