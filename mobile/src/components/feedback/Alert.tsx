import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text';
import { Icon, IconName } from '../Icon';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';

export type AlertVariant = 'success' | 'warning' | 'destructive' | 'info';

export interface AlertProps {
  title: string;
  message?: string;
  variant?: AlertVariant;
  style?: ViewStyle;
}

export const Alert: React.FC<AlertProps> = ({ title, message, variant = 'info', style }) => {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.surfaceHighlight, border: colors.success, icon: 'CheckCircle' };
      case 'warning':
        return { bg: colors.surfaceHighlight, border: colors.warning, icon: 'AlertTriangle' };
      case 'destructive':
        return { bg: colors.surfaceHighlight, border: colors.destructive, icon: 'XCircle' };
      case 'info':
      default:
        return { bg: colors.surfaceHighlight, border: colors.info, icon: 'Info' };
    }
  };

  const { bg, border, icon } = getVariantStyles();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bg, borderLeftColor: border },
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon name={icon as IconName} color={border} size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text variant="bodyBold" colorToken="textPrimary">{title}</Text>
        {message && <Text variant="subtitle" colorToken="textSecondary" style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: tokens.borderRadius.md,
    borderLeftWidth: 4,
    marginBottom: spacing.md,
  },
  iconContainer: {
    marginRight: spacing.md,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    marginTop: spacing.xxs,
  },
});
