import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { api } from '../../shared/services/api';
import { Product } from '../stores/useInventoryStore';
import { colors, spacing, typography } from '../../../theme';

export const InventoryDetailScreen = () => {
  const route = useRoute<any>();
  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params?.id) {
      loadDetails(route.params.id);
    }
  }, [route.params?.id]);

  const loadDetails = async (id: string) => {
    try {
      setLoading(true);
      const prod = await api.products.getById(id);
      setProduct(prod);

      const movs = await api.movements.listRecent(id);
      setMovements(movs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.container}><Text>Cargando...</Text></View>;
  }

  if (!product) {
    return <View style={styles.container}><Text>Producto no encontrado.</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información General</Text>
        <Text>Stock Disponible: {product.stock}</Text>
        <Text>Costo: ${product.priceBuy}</Text>
        <Text>Precio Venta: ${product.priceSell}</Text>
        <Text>Código: {product.barcode || 'N/A'}</Text>
        <Text>Categoría: {product.category || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimos Movimientos</Text>
        {movements.length === 0 ? (
          <Text>No hay movimientos recientes.</Text>
        ) : (
          movements.map(m => (
            <View key={m.id} style={styles.movementRow}>
              <Text>{m.type} - {m.quantity} uds</Text>
              <Text style={styles.date}>{new Date(m.createdAt).toLocaleDateString()}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
    marginBottom: spacing.lg,
  },
  section: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  movementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  date: {
    color: colors.textSecondary,
  },
});
