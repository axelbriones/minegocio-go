import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../Card';
import { Text } from '../Text';
import { Badge } from '../Badge';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';
import { textVariants } from '../../theme/typography';

export interface ProductCardProps {
  name: string;
  sku?: string;
  price: number;
  stock: number;
  minStock?: number;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  sku,
  price,
  stock,
  minStock = 5,
  onPress,
}) => {
  const { colors } = useTheme();

  const isLowStock = stock <= minStock;
  const isOutOfStock = stock === 0;

  let badgeVariant: 'success' | 'warning' | 'destructive' = 'success';
  let badgeLabel = `${stock} un.`;

  if (isOutOfStock) {
    badgeVariant = 'destructive';
    badgeLabel = 'Agotado';
  } else if (isLowStock) {
    badgeVariant = 'warning';
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={!onPress}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text variant="bodyBold" numberOfLines={2} style={styles.name}>{name}</Text>
          <Badge variant={badgeVariant} label={badgeLabel} />
        </View>

        {sku && <Text variant="caption" colorToken="textSecondary" style={styles.sku}>SKU: {sku}</Text>}

        <View style={styles.footer}>
          <Text style={[{ color: colors.textPrimary }, textVariants.price]}>
            ${price.toFixed(2)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    marginRight: spacing.sm,
  },
  sku: {
    marginTop: spacing.xs,
  },
  footer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
