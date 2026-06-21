import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WifiOff, RefreshCw } from 'lucide-react-native';
import { useSyncStore } from '../stores/useSyncStore';
import { colors, spacing, typography } from '../../../theme';

export const OfflineIndicator = () => {
  const { isOnline, pendingCount, isSyncing } = useSyncStore();

  if (isOnline && pendingCount === 0) return null;

  return (
    <View style={[styles.container, !isOnline ? styles.offlineBg : styles.pendingBg]}>
      <View style={styles.left}>
        {!isOnline ? (
          <WifiOff color={colors.surface} size={16} />
        ) : (
          <RefreshCw color={colors.textPrimary} size={16} />
        )}
        <Text style={[styles.text, !isOnline ? styles.textLight : styles.textDark]}>
          {!isOnline
            ? 'Sin conexión'
            : `${pendingCount} pendientes de sincronizar`}
        </Text>
      </View>

      {isOnline && pendingCount > 0 && (
        <TouchableOpacity style={styles.syncButton} disabled={isSyncing}>
          {isSyncing ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={styles.syncText}>Sincronizar</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  offlineBg: {
    backgroundColor: '#EF4444',
  },
  pendingBg: {
    backgroundColor: '#FDE047',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  text: {
    ...typography.subtitle,
    fontWeight: 'bold',
  },
  textLight: {
    color: colors.surface,
  },
  textDark: {
    color: colors.textPrimary,
  },
  syncButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  syncText: {
    ...typography.subtitle,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
