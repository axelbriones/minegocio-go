import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Package, AlertTriangle, Clock, Activity, Settings2 } from 'lucide-react-native';
import { colors, spacing, typography } from '../../../theme';
import { api } from '../../shared/services/api';
import { useInventoryStore } from '../../inventory/stores/useInventoryStore';
import { OfflineIndicator } from '../../shared/components/OfflineIndicator';

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
  const criticalStock = products.filter((p) => (p.stock || 0) < 5).length;
  const reorderStock = products.filter((p) => (p.stock || 0) >= 5 && (p.stock || 0) < 15).length; // Mock threshold

  return (
    <ScrollView style={styles.container}>
      <OfflineIndicator />
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Package color={colors.primary} size={24} />
          <Text style={styles.cardValue}>{loading ? '...' : totalProducts}</Text>
          <Text style={styles.cardTitle}>Productos Activos</Text>
        </View>
        <View style={styles.card}>
          <Activity color={colors.primary} size={24} />
          <Text style={styles.cardValue}>{loading ? '...' : totalStock}</Text>
          <Text style={styles.cardTitle}>Unidades en Stock</Text>
        </View>
        <View style={[styles.card, styles.alertCard]}>
          <AlertTriangle color="#EF4444" size={24} />
          <Text style={[styles.cardValue, styles.alertValue]}>{loading ? '...' : criticalStock}</Text>
          <Text style={[styles.cardTitle, styles.alertValue]}>Stock Crítico</Text>
        </View>
        <View style={[styles.card, styles.warningCard]}>
          <Clock color="#F59E0B" size={24} />
          <Text style={[styles.cardValue, styles.warningValue]}>{loading ? '...' : reorderStock}</Text>
          <Text style={[styles.cardTitle, styles.warningValue]}>Punto de Reorden</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Últimos Movimientos</Text>
      <View style={styles.listCard}>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.itemTitle}>Entrada: Coca Cola 3L</Text>
            <Text style={styles.itemSubtitle}>Hace 10 min • Proveedor</Text>
          </View>
          <Text style={[styles.itemAmount, { color: colors.primary }]}>+50</Text>
        </View>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.itemTitle}>Ajuste: Pan Integral</Text>
            <Text style={styles.itemSubtitle}>Hace 2 horas • Inventario físico</Text>
          </View>
          <Text style={[styles.itemAmount, { color: '#EF4444' }]}>-2</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Alertas Inteligentes</Text>
      <View style={styles.listCard}>
        <View style={styles.alertItem}>
          <AlertTriangle color="#F59E0B" size={20} />
          <Text style={styles.alertText}>3 productos no han tenido rotación en 30 días.</Text>
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
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    width: '47%',
  },
  alertCard: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  warningCard: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },
  cardValue: {
    ...typography.h1,
    marginTop: spacing.sm,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  alertValue: {
    color: '#EF4444',
  },
  warningValue: {
    color: '#F59E0B',
  },
  sectionTitle: {
    ...typography.h2,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listCard: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemTitle: {
    ...typography.body,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  itemAmount: {
    ...typography.h2,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  alertText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
});
