import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ThemeColors } from '../../theme/colors';

// Simplified for React Native without complex SVG libraries for MVP
// In a full implementation, `react-native-svg` should be used here.
export interface CircularProgressProps {
  size?: number;
  colorToken?: keyof ThemeColors;
  style?: ViewStyle;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 48,
  colorToken = 'primary',
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 8,
          borderColor: colors.border,
          borderTopColor: colors[colorToken],
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
