import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CalculatorComponent() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!num1 || !num2 || !operation) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }

    const a = parseFloat(num1);
    const b = parseFloat(num2);
    const op = parseInt(operation);

    if (isNaN(a) || isNaN(b) || isNaN(op)) {
      Alert.alert('Error', 'Por favor ingrese valores válidos.');
      return;
    }

    let calcResult: string;
    switch (op) {
      case 1:
        calcResult = `Resultado: ${a + b}`;
        break;
      case 2:
        calcResult = `Resultado: ${a - b}`;
        break;
      case 3:
        calcResult = `Resultado: ${a * b}`;
        break;
      case 4:
        calcResult = b !== 0 ? `Resultado: ${a / b}` : 'Error: División por cero';
        break;
      default:
        calcResult = 'Operación inválida';
    }

    setResult(calcResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese el primer número (a):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
        placeholder="Número 1"
      />

      <Text style={styles.label}>Ingrese el segundo número (b):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
        placeholder="Número 2"
      />

      <Text style={styles.label}>Ingrese la operación (1: +, 2: -, 3: *, 4: /):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={operation}
        onChangeText={setOperation}
        placeholder="Operación"
      />

      <Button title="Calcular" onPress={calculate} />

      {result && <Text style={styles.result}>{result}</Text>}
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '80%',
    paddingHorizontal: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
});