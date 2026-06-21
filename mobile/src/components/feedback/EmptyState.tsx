import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Icon, IconName } from '../Icon';
import { Text } from '../Text';
import { Button } from '../Button';
import { spacing } from '../../theme/spacing';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'Inbox',
  title,
  description,
  actionTitle,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name={icon} size={64} colorToken="textSecondary" />
      <Text variant="h2" align="center" style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="body" colorToken="textSecondary" align="center" style={styles.description}>
          {description}
        </Text>
      )}
      {actionTitle && onAction && (
        <Button title={actionTitle} onPress={onAction} style={styles.actionButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    flex: 1,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.lg,
  },
  actionButton: {
    marginTop: spacing.md,
  },
});
