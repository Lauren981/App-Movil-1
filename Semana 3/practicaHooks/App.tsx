import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

export default function App() {
  const [estudiantes, setEstudiantes] = useState([
    { id: '1', nombre: 'Juan' },
    { id: '2', nombre: 'María' },
    { id: '3', nombre: 'Carlos' },
    { id: '4', nombre: 'Ana' },
    { id: '5', nombre: 'Luis' },
    { id: '6', nombre: 'Sofía' },
    { id: '7', nombre: 'Pedro' },
    { id: '8', nombre: 'Lucía' },
    { id: '9', nombre: 'Miguel' },
    { id: '10', nombre: 'Elena' },
  ]);

  const [nuevoNombreEstudiante, setNuevoNombreEstudiante] = useState('');

  const agregarEstudiante = () => {
    const nuevoId = (estudiantes.length + 1).toString();
    const nuevoEstudiante = { id: nuevoId, nombre: nuevoNombreEstudiante };
    setEstudiantes([...estudiantes, nuevoEstudiante]);
    setNuevoNombreEstudiante(''); // Limpiar el campo de entrada
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Lista de Estudiantes</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={estilos.item}>{item.nombre}</Text>}
      />
      <TextInput
        style={estilos.entrada}
        placeholder="Nombre del estudiante"
        value={nuevoNombreEstudiante}
        onChangeText={setNuevoNombreEstudiante}
      />
      <Button title="Agregar Estudiante" onPress={agregarEstudiante} />
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  },
  entrada: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
  },
});
