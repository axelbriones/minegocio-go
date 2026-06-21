import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';
import { useNavigation } from '@react-navigation/native';

export interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  rightIcon,
  onRightPress,
  style,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }, style]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Volver atrás"
            accessibilityRole="button"
          >
            <Icon name="ArrowLeft" size={24} colorToken="textPrimary" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text variant="h3" numberOfLines={1} style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            accessibilityRole="button"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: spacing.sm,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 2,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    textAlign: 'center',
  },
  iconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: tokens.borderRadius.full,
  },
});
