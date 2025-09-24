import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Alert, RefreshControl, Modal } from 'react-native';
import { getProductos, deleteProducto } from '../services/producto.service';
import { Producto } from '../models/producto';
import { useFocusEffect } from '@react-navigation/native';

export default function ListaArticulos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

    const cargarProductos = async () => {
        try {
            const _data = await getProductos();
            setProductos(_data);
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los productos");
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await cargarProductos();
        setRefreshing(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            cargarProductos();
        }, [])
    );

    const confirmarEliminacion = (producto: Producto) => {
        Alert.alert(
            "Eliminar Producto",
            `¿Está seguro que desea eliminar "${producto.nombre}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", style: "destructive", onPress: () => eliminar(producto.id) }
            ]
        );
    };

    const eliminar = async (id: number) => {
        try {
            const status = await deleteProducto(id);
            if (status === 200) {
                Alert.alert("Éxito", "Producto eliminado correctamente");
                cargarProductos();
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el producto");
        }
    };

    const mostrarDetalle = (producto: Producto) => {
        setProductoSeleccionado(producto);
        setModalVisible(true);
    };

    const renderProducto = ({ item }: { item: Producto }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.titulo}>{item.nombre}</Text>
                <View style={[
                    styles.estadoBadge, 
                    { backgroundColor: item.estado === 'disponible' ? '#4CAF50' : '#f44336' }
                ]}>
                    <Text style={styles.estadoText}>
                        {item.estado === 'disponible' ? 'Disponible' : 'No disponible'}
                    </Text>
                </View>
            </View>

            {item.url_foto && (
                <Image source={{ uri: item.url_foto }} style={styles.imagen} />
            )}

            <Text style={styles.descripcion} numberOfLines={2}>
                {item.descripcion || 'Sin descripción'}
            </Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Precio:</Text>
                    <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Categoría:</Text>
                    <Text style={styles.valor}>{item.categoria}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.detalleButton]}
                    onPress={() => mostrarDetalle(item)}
                >
                    <Text style={styles.buttonText}>Ver Detalle</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.eliminarButton]}
                    onPress={() => confirmarEliminacion(item)}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Lista de Productos</Text>
            
            {productos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay productos registrados</Text>
                    <Text style={styles.emptySubtext}>Agrega tu primer producto desde la pestaña Formulario</Text>
                </View>
            ) : (
                <FlatList
                    data={productos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProducto}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Modal de Detalle */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {productoSeleccionado && (
                            <>
                                <Text style={styles.modalTitle}>Detalle del Producto</Text>
                                
                                {productoSeleccionado.url_foto && (
                                    <Image 
                                        source={{ uri: productoSeleccionado.url_foto }} 
                                        style={styles.modalImage} 
                                    />
                                )}

                                <View style={styles.modalInfo}>
                                    <Text style={styles.modalLabel}>Nombre:</Text>
                                    <Text style={styles.modalValue}>{productoSeleccionado.nombre}</Text>

                                    <Text style={styles.modalLabel}>Descripción:</Text>
                                    <Text style={styles.modalValue}>{productoSeleccionado.descripcion || 'Sin descripción'}</Text>

                                    <Text style={styles.modalLabel}>Precio:</Text>
                                    <Text style={styles.modalPrecio}>${productoSeleccionado.precio.toFixed(2)}</Text>

                                    <Text style={styles.modalLabel}>Categoría:</Text>
                                    <Text style={styles.modalValue}>{productoSeleccionado.categoria}</Text>

                                    <Text style={styles.modalLabel}>Estado:</Text>
                                    <View style={[
                                        styles.modalEstado,
                                        { backgroundColor: productoSeleccionado.estado === 'disponible' ? '#4CAF50' : '#f44336' }
                                    ]}>
                                        <Text style={styles.modalEstadoText}>
                                            {productoSeleccionado.estado === 'disponible' ? '✓ Disponible' : '✗ No disponible'}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity 
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 12,
        padding: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    estadoBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    estadoText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    imagen: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
    },
    descripcion: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        lineHeight: 20,
    },
    infoContainer: {
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    precio: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    valor: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    detalleButton: {
        backgroundColor: '#2196F3',
    },
    eliminarButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    
    // Estilos del Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        margin: 20,
        maxWidth: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
    },
    modalInfo: {
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginTop: 10,
        marginBottom: 5,
    },
    modalValue: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    modalPrecio: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    modalEstado: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginTop: 5,
    },
    modalEstadoText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    closeButton: {
        backgroundColor: '#666',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});