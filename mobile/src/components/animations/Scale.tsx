import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { animations } from '../../theme/animations';

interface ScaleProps {
  children: React.ReactNode;
  visible: boolean;
  style?: ViewStyle;
  duration?: number;
}

export const Scale: React.FC<ScaleProps> = ({ children, visible, style, duration = animations.timing.normal }) => {
  const scale = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: visible ? 1 : 0.8,
        duration,
        useNativeDriver: true,
        easing: animations.easing.bounce,
      }),
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration,
        useNativeDriver: true,
        easing: animations.easing.standard,
      }),
    ]).start();
  }, [visible, duration, scale, opacity]);

  return <Animated.View style={[{ transform: [{ scale }], opacity }, style]}>{children}</Animated.View>;
};
