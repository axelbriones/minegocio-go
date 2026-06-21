import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../Card';
import { Text } from '../Text';
import { spacing } from '../../theme/spacing';

export interface KeyValuePair {
  label: string;
  value: string | React.ReactNode;
}

export interface KeyValueCardProps {
  items: KeyValuePair[];
  style?: ViewStyle;
}

export const KeyValueCard: React.FC<KeyValueCardProps> = ({ items, style }) => {
  return (
    <Card style={style}>
      {items.map((item, index) => (
        <View key={index} style={[styles.row, index < items.length - 1 && styles.borderBottom]}>
          <Text variant="subtitle" colorToken="textSecondary" style={styles.label}>
            {item.label}
          </Text>
          <View style={styles.valueContainer}>
            {typeof item.value === 'string' ? (
              <Text variant="bodyBold" style={styles.valueText} align="right">
                {item.value}
              </Text>
            ) : (
              item.value
            )}
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150,150,150,0.2)',
  },
  label: {
    flex: 1,
  },
  valueContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  valueText: {
    textAlign: 'right',
  },
});
