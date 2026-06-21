import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Edit3, MapPin, Tag, Image as ImageIcon } from 'lucide-react-native';
import { api } from '../../shared/services/api';
import { Product } from '../stores/useInventoryStore';
import { colors, spacing, typography } from '../../../theme';

export const InventoryDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
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
    return <View style={styles.centerContainer}><Text>Cargando producto...</Text></View>;
  }

  if (!product) {
    return <View style={styles.centerContainer}><Text>Producto no encontrado.</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <ArrowLeft color={colors.textPrimary} size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Edit3 color={colors.textPrimary} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.imagePlaceholder}>
        <ImageIcon color={colors.textSecondary} size={48} />
        <Text style={styles.imageText}>Sin imagen</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Tag size={12} color={colors.textSecondary} /><Text style={styles.tagText}>{product.category || 'Sin categoría'}</Text></View>
          <View style={styles.tag}><MapPin size={12} color={colors.textSecondary} /><Text style={styles.tagText}>{product.warehouse || 'Bodega Principal'}</Text></View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Stock</Text>
            <Text style={styles.statValue}>{product.stock}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Precio</Text>
            <Text style={styles.statValue}>${product.priceSell.toFixed(2)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Costo Prom.</Text>
            <Text style={styles.statValue}>${(product.priceBuy || 0).toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Detalles Adicionales</Text>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.label}>SKU</Text><Text style={styles.value}>{product.sku || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Código (EAN/UPC)</Text><Text style={styles.value}>{product.barcode || 'N/A'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Lotes Activos</Text><Text style={styles.value}>Lote-2023 (10 uds)</Text></View>
          <View style={styles.row}><Text style={styles.label}>Proveedor</Text><Text style={styles.value}>Distribuidora XYZ</Text></View>
          <View style={styles.row}><Text style={styles.label}>Observaciones</Text><Text style={styles.value}>Mantener en lugar fresco.</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Historial de Movimientos</Text>
        <View style={styles.card}>
          {movements.length === 0 ? (
            <Text style={styles.emptyText}>No hay movimientos registrados.</Text>
          ) : (
            movements.map(m => (
              <View key={m.id} style={styles.movementRow}>
                <View>
                  <Text style={styles.movType}>{m.type === 'IN' ? 'Entrada' : m.type === 'OUT' ? 'Salida' : m.type}</Text>
                  <Text style={styles.movDate}>{new Date(m.createdAt).toLocaleDateString()}</Text>
                </View>
                <Text style={[styles.movQty, { color: m.type === 'IN' ? colors.primary : '#EF4444' }]}>
                  {m.type === 'IN' ? '+' : '-'}{m.quantity}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconButton: {
    padding: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    ...typography.subtitle,
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
  content: {
    padding: spacing.lg,
    marginTop: -20,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  tagRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statLabel: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  value: {
    ...typography.body,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.lg,
  },
  movementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  movType: {
    ...typography.body,
    fontWeight: 'bold',
  },
  movDate: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  movQty: {
    ...typography.h2,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: spacing.md,
  },
});
