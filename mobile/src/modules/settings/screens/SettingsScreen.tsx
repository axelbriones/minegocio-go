import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, LogOut } from 'lucide-react-native';
import { useAuthStore } from '../../auth/stores/useAuthStore';
import { supabase } from '../../shared/services/supabase';
import { colors, spacing, typography } from '../../../theme';

export const SettingsScreen = () => {
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const SettingRow = ({ title, value }: { title: string; value?: string }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.rowTitle}>{title}</Text>
      <View style={styles.rowRight}>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        <ChevronRight color={colors.textSecondary} size={20} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <SettingRow title="Usuario" value={user?.email} />
        <SettingRow title="Empresa" value="Mi Negocio Local" />
        <SettingRow title="Rol" value="Administrador" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hardware</Text>
        <SettingRow title="Dispositivos Vinculados" />
        <SettingRow title="Impresoras Bluetooth" />
        <SettingRow title="Escáneres Externos" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <SettingRow title="Sincronización Offline" value="Automática" />
        <SettingRow title="Tema" value="Sistema" />
        <SettingRow title="Idioma" value="Español" />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color="#EF4444" size={20} />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    ...typography.subtitle,
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowTitle: {
    ...typography.body,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowValue: {
    ...typography.body,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    margin: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    gap: spacing.sm,
  },
  logoutText: {
    ...typography.button,
    color: '#EF4444',
  },
});
