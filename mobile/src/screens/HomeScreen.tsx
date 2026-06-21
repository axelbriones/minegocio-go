import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon, Text } from '../components';
import { spacing } from '../theme';
import { useTheme } from '../theme/ThemeContext';

export const HomeScreen = () => {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h1" align="center">
            MI NEGOCIO <Text variant="h1" colorToken="primary">GO</Text>
          </Text>
          <Text variant="subtitle" colorToken="textSecondary" align="center" style={styles.subtitleMargin}>
            Tu libreta inteligente
          </Text>
        </View>

        <View style={styles.mainActions}>
          <Button
            title="+ VENTA"
            onPress={() => console.log('Nueva Venta')}
            icon={<Icon name="ShoppingCart" colorToken="textInverse" size={28} />}
          />

          <Button
            title="+ COMPRA"
            onPress={() => console.log('Nueva Compra')}
            variant="outline"
            icon={<Icon name="PackagePlus" colorToken="textPrimary" size={28} />}
          />
        </View>

        <View style={styles.secondaryActions}>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Button
                title="INVENTARIO"
                onPress={() => console.log('Inventario')}
                variant="outline"
                icon={<Icon name="List" colorToken="textPrimary" size={24} />}
              />
            </View>
            <View style={styles.halfWidth}>
              <Button
                title="GANANCIAS"
                onPress={() => console.log('Ganancias')}
                variant="outline"
                icon={<Icon name="TrendingUp" colorToken="textPrimary" size={24} />}
              />
            </View>
          </View>
        </View>

        <View style={styles.aiSection}>
          <Button
            title="MIGO IA"
            onPress={() => console.log('MIGO IA')}
            variant="secondary"
            icon={<Icon name="Sparkles" colorToken="textInverse" size={24} />}
          />
          <Text variant="subtitle" colorToken="textSecondary" align="center" style={styles.aiHelperTextMargin}>
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
  subtitleMargin: {
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
  aiHelperTextMargin: {
    marginTop: spacing.sm,
  },
});
