import React, { useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { tokens } from '../theme/tokens';
import { animations } from '../theme/animations';
import { Text } from './Text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  fullWidth = true,
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors, isDark } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.timing(scaleAnim, {
      toValue: 0.96,
      duration: animations.timing.fast,
      useNativeDriver: true,
      easing: animations.easing.standard,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: animations.timing.normal,
      useNativeDriver: true,
      easing: animations.easing.standard,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return isDark ? '#334155' : '#E2E8F0';
    switch (variant) {
      case 'primary': return colors.primary;
      case 'secondary': return colors.secondary;
      case 'destructive': return colors.destructive;
      case 'outline': return 'transparent';
      case 'ghost': return 'transparent';
      default: return colors.primary;
    }
  };

  const getTextColorToken = () => {
    if (disabled) return 'textSecondary';
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'destructive':
        return 'textInverse';
      case 'outline':
      case 'ghost':
        return 'textPrimary';
      default:
        return 'textInverse';
    }
  };

  const getBorderColor = () => {
    if (disabled) return isDark ? '#334155' : '#E2E8F0';
    if (variant === 'outline') return colors.border;
    return 'transparent';
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : 'auto' }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={variant === 'ghost' ? 0.6 : 1}
        disabled={disabled}
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'outline' ? 2 : 0,
            opacity: disabled && variant === 'ghost' ? tokens.opacity.disabled : tokens.opacity.full,
          },
          !disabled && variant !== 'outline' && variant !== 'ghost' && tokens.shadows.md,
          style,
        ]}
      >
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            variant="button"
            colorToken={getTextColorToken()}
            style={textStyle}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 64, // Large tap target (chunk & tap-friendly rule)
    borderRadius: tokens.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
});
