import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PackageOpen } from 'lucide-react-native';
import { colors, spacing, typography } from '../../../theme';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ title = 'Sin resultados', message = 'No encontramos lo que buscas.', icon }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {icon || <PackageOpen color={colors.textSecondary} size={48} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    minHeight: 200,
  },
  title: {
    ...typography.h2,
    marginTop: spacing.md,
    color: colors.textPrimary,
  },
  message: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
