import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { getProductos } from '../services/producto.service';
import { Producto } from '../models/producto';

export default function ListaProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const loadProductos = async () => {
            const _data = await getProductos();
            setProductos(_data);
        };
        loadProductos()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Lista de productos</Text>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                        <View>
                            <Text>Nombre: {item.nombre}</Text>
                        </View>
                    </>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});