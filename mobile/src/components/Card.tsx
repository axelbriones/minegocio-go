import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { tokens } from '../theme/tokens';
import { spacing } from '../theme/spacing';

export interface CardProps extends ViewProps {
  padding?: keyof typeof spacing;
  noShadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  padding = 'lg',
  noShadow = false,
  style,
  children,
  ...props
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          padding: spacing[padding],
        },
        // Subtle border in dark mode instead of heavy shadow
        isDark && { borderWidth: 1, borderColor: colors.border },
        !noShadow && !isDark && tokens.shadows.sm,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: tokens.borderRadius.lg,
    width: '100%',
    marginBottom: spacing.md,
  },
});
