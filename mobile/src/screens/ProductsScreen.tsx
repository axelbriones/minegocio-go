import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { getProducts, createProduct, Product } from '../services/products';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../theme';

export const ProductsScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [priceSell, setPriceSell] = useState('');

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreate = async () => {
        if (!name || !priceSell) return;
        await createProduct({
            name,
            priceSell: parseFloat(priceSell),
            priceBuy: 0,
            stock: 0,
            barcode: null,
            category: null,
            image: null
        });
        setName('');
        setPriceSell('');
        loadProducts(); // Refresh list
    };

    return (
        <View style={styles.container}>
            <Text style={typography.h2}>Inventario</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del producto"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Precio"
                    keyboardType="numeric"
                    value={priceSell}
                    onChangeText={setPriceSell}
                />
                <Button title="Agregar Producto" onPress={handleCreate} />
            </View>

            <FlatList
                data={products}
                keyExtractor={p => p.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${item.priceSell}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
    form: { marginBottom: spacing.xl, gap: spacing.sm },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
    itemName: { ...typography.body },
    itemPrice: { ...typography.body, fontWeight: 'bold' }
});
