import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';
import { FadeIn } from '../animations/Fade';

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message = 'Cargando...' }) => {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay]}>
      <FadeIn duration={200} style={StyleSheet.flatten([styles.container, { backgroundColor: colors.surface }, tokens.shadows.lg])}>
        <ActivityIndicator size="large" color={colors.primary} />
        {message && <Text variant="bodyBold" style={styles.message}>{message}</Text>}
      </FadeIn>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: tokens.zIndices.overlay,
  },
  container: {
    padding: spacing.xl,
    borderRadius: tokens.borderRadius.lg,
    alignItems: 'center',
  },
  message: {
    marginTop: spacing.md,
  },
});
