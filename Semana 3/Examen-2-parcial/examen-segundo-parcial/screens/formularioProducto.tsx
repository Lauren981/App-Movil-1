import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { createProducto } from '../services/producto.service';
import * as ImagePicker from 'expo-image-picker';

export default function FormularioProducto() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('');
    const [imagen, setImagen] = useState('');

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        const newPrecio: number = parseFloat(precio)
        await createProducto(
            nombre,
            descripcion,
            newPrecio,
            estado,
            categoria,
            imagen
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                keyboardType="numeric"
                value={precio}
                onChangeText={setPrecio}
            />
            <TextInput
                style={styles.input}
                placeholder="Categoría"
                value={categoria}
                onChangeText={setCategoria}
            />

            <TouchableOpacity>
                <Text style={styles.toggle}>Estado: {estado ? 'Disponible' : 'No disponible'}</Text>
            </TouchableOpacity>

            <Button title="Tomar Foto" onPress={pickImage} />
            {imagen && <Image source={{ uri: imagen }} style={styles.image} />}

            <Button title="Guardar Producto" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    toggle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 10,
    },
});