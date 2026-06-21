import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { supabase } from '../../shared/services/supabase';
import { useAuthStore } from '../../auth/stores/useAuthStore';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme';

export const ProfileScreen = () => {
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>
      <Button title="Cerrar Sesión" onPress={handleLogout} variant="outline" />
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
    marginBottom: spacing.xl,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.body,
    marginBottom: spacing.md,
  },
});
