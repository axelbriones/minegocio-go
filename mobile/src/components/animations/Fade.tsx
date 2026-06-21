import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { animations } from '../../theme/animations';

interface FadeProps {
  children: React.ReactNode;
  visible: boolean;
  style?: ViewStyle;
  duration?: number;
}

export const Fade: React.FC<FadeProps> = ({ children, visible, style, duration = animations.timing.normal }) => {
  // Initialize to 0 so it animates to 1 on mount if visible is true
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
      easing: animations.easing.standard,
    }).start();
  }, [visible, duration, opacity]);

  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
};

export const FadeIn: React.FC<Omit<FadeProps, 'visible'>> = (props) => <Fade visible={true} {...props} />;
export const FadeOut: React.FC<Omit<FadeProps, 'visible'>> = (props) => <Fade visible={false} {...props} />;
