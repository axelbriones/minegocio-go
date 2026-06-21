import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { ShoppingCart, PackagePlus, List, TrendingUp, Sparkles } from 'lucide-react-native';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../theme';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>MI NEGOCIO <Text style={styles.brandGo}>GO</Text></Text>
          <Text style={styles.subtitle}>Tu libreta inteligente</Text>
        </View>

        <View style={styles.mainActions}>
          <Button
            title="+ VENTA"
            onPress={() => console.log('Nueva Venta')}
            icon={<ShoppingCart color={colors.surface} size={28} />}
          />

          <Button
            title="+ COMPRA"
            onPress={() => console.log('Nueva Compra')}
            variant="outline"
            icon={<PackagePlus color={colors.textPrimary} size={28} />}
          />
        </View>

        <View style={styles.secondaryActions}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Button
                title="INVENTARIO"
                onPress={() => console.log('Inventario')}
                variant="outline"
                icon={<List color={colors.textPrimary} size={24} />}
              />
            </View>
            <View style={styles.halfWidth}>
              <Button
                title="GANANCIAS"
                onPress={() => console.log('Ganancias')}
                variant="outline"
                icon={<TrendingUp color={colors.textPrimary} size={24} />}
              />
            </View>
          </View>
        </View>

        <View style={styles.aiSection}>
          <Button
            title="MIGO IA"
            onPress={() => console.log('MIGO IA')}
            variant="secondary"
            icon={<Sparkles color={colors.surface} size={24} />}
          />
          <Text style={styles.aiHelperText}>
            Toca para usar voz o fotos
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    letterSpacing: -0.5,
  },
  brandGo: {
    color: colors.primary,
  },
  subtitle: {
    ...typography.subtitle,
    marginTop: spacing.xs,
  },
  mainActions: {
    marginBottom: spacing.xl,
  },
  secondaryActions: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  aiSection: {
    marginTop: 'auto', // Pushes to bottom
    alignItems: 'center',
  },
  aiHelperText: {
    ...typography.subtitle,
    marginTop: spacing.sm,
  },
});
