import React from 'react';
import { TouchableOpacity, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';

export interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, onValueChange, label, disabled = false, style }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[styles.container, style, { opacity: disabled ? tokens.opacity.disabled : 1 }]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
    >
      <View
        style={[
          styles.box,
          {
            borderColor: value ? colors.primary : colors.border,
            backgroundColor: value ? colors.primary : 'transparent',
          },
        ]}
      >
        {value && <Icon name="Check" size={16} color="#FFFFFF" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48, // Accessibility touch target
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: tokens.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: spacing.sm,
  },
});
