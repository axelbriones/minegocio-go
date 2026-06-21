import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { api } from '../../shared/services/api';
import { useInventoryStore } from '../../inventory/stores/useInventoryStore';

export const DashboardScreen = () => {
  const { products, setProducts } = useInventoryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await api.products.list();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockProducts = products.filter((p) => (p.stock || 0) < 5).length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Productos</Text>
          <Text style={styles.cardValue}>{loading ? '...' : totalProducts}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stock Total</Text>
          <Text style={styles.cardValue}>{loading ? '...' : totalStock}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stock Bajo</Text>
          <Text style={[styles.cardValue, lowStockProducts > 0 && styles.alertValue]}>
            {loading ? '...' : lowStockProducts}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: '47%',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  cardValue: {
    ...typography.h2,
  },
  alertValue: {
    color: '#EF4444',
  },
});
