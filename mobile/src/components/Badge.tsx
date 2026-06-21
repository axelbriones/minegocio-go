import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Text } from './Text';
import { spacing } from '../theme/spacing';
import { tokens } from '../theme/tokens';

export type BadgeVariant = 'success' | 'warning' | 'destructive' | 'info' | 'primary' | 'secondary';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', style }) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.success, text: '#FFFFFF' };
      case 'warning':
        return { bg: colors.warning, text: '#000000' };
      case 'destructive':
        return { bg: colors.destructive, text: '#FFFFFF' };
      case 'info':
        return { bg: colors.info, text: '#FFFFFF' };
      case 'secondary':
        return { bg: colors.secondary, text: '#FFFFFF' };
      case 'primary':
      default:
        return { bg: colors.primary, text: '#FFFFFF' };
    }
  };

  const { bg, text } = getVariantStyles();

  return (
    <View style={[styles.container, { backgroundColor: bg }, style]}>
      <Text variant="caption" style={[styles.text, { color: text }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: tokens.borderRadius.full,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});
