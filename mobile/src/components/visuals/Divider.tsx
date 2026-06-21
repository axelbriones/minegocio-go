import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme/spacing';

interface DividerProps {
  vertical?: boolean;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({ vertical = false, style }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.border,
        },
        vertical ? styles.vertical : styles.horizontal,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
    marginVertical: spacing.md,
  },
  vertical: {
    width: 1,
    height: '100%',
    marginHorizontal: spacing.md,
  },
});
