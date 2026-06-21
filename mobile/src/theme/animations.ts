import { Easing } from 'react-native';

export const animations = {
  timing: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    standard: Easing.bezier(0.4, 0.0, 0.2, 1),
    accelerate: Easing.bezier(0.4, 0.0, 1, 1),
    decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),
    bounce: Easing.bounce,
  },
};
