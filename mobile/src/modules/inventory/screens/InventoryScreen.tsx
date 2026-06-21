import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Filter, Star, Clock, MapPin, Grid } from 'lucide-react-native';
import { EmptyState } from '../../shared/components/EmptyState';
import { useInventoryStore } from '../stores/useInventoryStore';
import { colors, spacing, typography } from '../../../theme';

export const InventoryScreen = () => {
  const { products } = useInventoryStore();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Favoritos', 'Recientes', 'Stock Bajo'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || (p.barcode && p.barcode.includes(search));
    if (!matchesSearch) return false;

    if (activeFilter === 'Stock Bajo') return (p.stock || 0) < 5;
    // Favoritos and Recientes would use properties that are mocked for now
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventario</Text>
        <TouchableOpacity style={styles.filterIcon}>
          <Filter color={colors.textPrimary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search color={colors.textSecondary} size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto, SKU o código..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.filterChip}>
            <Grid color={colors.textSecondary} size={16} style={{marginRight: 4}} />
            <Text style={styles.filterText}>Categoría</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <MapPin color={colors.textSecondary} size={16} style={{marginRight: 4}} />
            <Text style={styles.filterText}>Bodega</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate('InventoryDetail', { id: item.id })}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <TouchableOpacity>
                <Star color={colors.border} size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDetailsRow}>
              <Text style={styles.itemStock}>Stock: {item.stock}</Text>
              <Text style={styles.itemPrice}>${item.priceSell.toFixed(2)}</Text>
            </View>
            {item.category && <Text style={styles.itemMeta}>{item.category}</Text>}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No se encontraron productos.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  filterIcon: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    ...typography.body,
  },
  filterScroll: {
    height: 50,
  },
  filterContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  listContent: {
    padding: spacing.lg,
  },
  itemCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  itemName: {
    ...typography.body,
    fontWeight: 'bold',
    flex: 1,
    marginRight: spacing.sm,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  itemStock: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  itemPrice: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  itemMeta: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontSize: 12,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
