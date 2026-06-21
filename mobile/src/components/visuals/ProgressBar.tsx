import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { tokens } from '../../theme/tokens';
import { ThemeColors } from '../../theme/colors';

export interface ProgressBarProps {
  progress: number; // 0 to 1
  colorToken?: keyof ThemeColors;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorToken = 'primary',
  height = 8,
  style,
}) => {
  const { colors } = useTheme();
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  return (
    <View style={[styles.container, { height, backgroundColor: colors.border }, style]}>
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: colors[colorToken],
            width: animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: tokens.borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: tokens.borderRadius.full,
  },
});
