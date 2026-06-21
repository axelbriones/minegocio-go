import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleSheet, DimensionValue } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { tokens } from '../../theme/tokens';

interface SkeletonAnimationProps {
  style?: ViewStyle;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
}

export const SkeletonAnimation: React.FC<SkeletonAnimationProps> = ({ style, width = '100%', height = 20, borderRadius = tokens.borderRadius.md }) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};
