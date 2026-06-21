import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { animations } from '../../theme/animations';

interface SlideProps {
  children: React.ReactNode;
  visible: boolean;
  style?: ViewStyle;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export const Slide: React.FC<SlideProps> = ({
  children,
  visible,
  style,
  direction = 'up',
  distance = 50,
  duration = animations.timing.normal,
}) => {
  // Initialize to 0 (off-screen) so it animates to 1 (on-screen) on mount
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
      easing: animations.easing.standard,
    }).start();
  }, [visible, duration, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [direction === 'up' ? distance : direction === 'down' ? -distance : 0, 0],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [direction === 'left' ? distance : direction === 'right' ? -distance : 0, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[{ transform: [{ translateY }, { translateX }], opacity }, style]}>
      {children}
    </Animated.View>
  );
};

export const SlideUp: React.FC<Omit<SlideProps, 'direction'>> = (props) => <Slide direction="up" {...props} />;
export const SlideDown: React.FC<Omit<SlideProps, 'direction'>> = (props) => <Slide direction="down" {...props} />;
