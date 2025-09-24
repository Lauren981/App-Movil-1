import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { createProducto } from '../services/producto.service';
import * as ImagePicker from 'expo-image-picker';

export default function FormularioArticulo() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('disponible');
    const [imagen, setImagen] = useState('');

    const pickImage = async () => {
       
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert("Error", "Se requiere permiso de cámara");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8
        });
        
        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
    
        if (!nombre || !descripcion || !precio || !categoria) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        const nuevoPrecio: number = parseFloat(precio);
        if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
            Alert.alert("Error", "El precio debe ser un número válido mayor a 0");
            return;
        }

        try {
            const status = await createProducto(
                nombre,
                descripcion,
                nuevoPrecio,
                estado,
                categoria,
                imagen
            );
            
            if (status === 201) {
                Alert.alert("Éxito", "Producto creado correctamente", [
                    { text: "OK", onPress: limpiarFormulario }
                ]);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo crear el producto");
        }
    };

    const limpiarFormulario = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setCategoria('');
        setEstado('disponible');
        setImagen('');
    };

    const toggleEstado = () => {
        setEstado(estado === 'disponible' ? 'no disponible' : 'disponible');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Agregar Nuevo Producto</Text>
            
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nombre del Producto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre del producto"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describa el producto"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                    numberOfLines={3}
                />

                <Text style={styles.label}>Precio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    value={precio}
                    onChangeText={setPrecio}
                />

                <Text style={styles.label}>Categoría</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Electrónicos, Ropa, Hogar"
                    value={categoria}
                    onChangeText={setCategoria}
                />

                <Text style={styles.label}>Estado</Text>
                <TouchableOpacity style={styles.condicionButton} onPress={toggleEstado}>
                    <Text style={[
                        styles.condicionText, 
                        { color: estado === 'disponible' ? '#4CAF50' : '#f44336' }
                    ]}>
                        {estado === 'disponible' ? '✓ Disponible' : '✗ No disponible'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Fotografía</Text>
                <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                    <Text style={styles.cameraButtonText}>📷 Tomar Foto</Text>
                </TouchableOpacity>

                {imagen && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imagen }} style={styles.image} />
                        <TouchableOpacity 
                            style={styles.removeImageButton} 
                            onPress={() => setImagen('')}
                        >
                            <Text style={styles.removeImageText}>Quitar imagen</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Guardar Producto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clearButton} onPress={limpiarFormulario}>
                    <Text style={styles.clearButtonText}>Limpiar Formulario</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    formContainer: {
        padding: 20,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    condicionButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    condicionText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    cameraButton: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    cameraButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imageContainer: {
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    removeImageButton: {
        backgroundColor: '#f44336',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    removeImageText: {
        color: '#fff',
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#ff9800',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});