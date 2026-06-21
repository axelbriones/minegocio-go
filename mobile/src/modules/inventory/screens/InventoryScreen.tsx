import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useInventoryStore } from '../stores/useInventoryStore';
import { colors, spacing, typography } from '../../../theme';

export const InventoryScreen = () => {
  const { products } = useInventoryStore();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.barcode && p.barcode.includes(search))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o código..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate('InventoryDetail', { id: item.id })}
          >
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetail}>Stock: {item.stock} | Precio: ${item.priceSell}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  itemCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemName: {
    ...typography.body,
    fontWeight: 'bold',
  },
  itemDetail: {
    ...typography.subtitle,
    marginTop: spacing.xs,
  },
});
