import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { textVariants } from '../theme/typography';
import { ThemeColors } from '../theme/colors';

export interface TextProps extends RNTextProps {
  variant?: keyof typeof textVariants;
  color?: string;
  colorToken?: keyof ThemeColors;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  colorToken = 'textPrimary',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const textColor = color || colors[colorToken];
  const variantStyle = textVariants[variant];

  return (
    <RNText
      style={[
        variantStyle,
        { color: textColor, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
