import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

export type IconName = keyof typeof LucideIcons;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  colorToken?: keyof ThemeColors;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color, colorToken }) => {
  const { colors } = useTheme();
  const LucideIcon = LucideIcons[name] as React.ElementType;

  if (!LucideIcon) {
    console.warn(`Icon "${String(name)}" does not exist in lucide-react-native.`);
    return null;
  }

  const iconColor = color || (colorToken ? colors[colorToken] : colors.textPrimary);

  return <LucideIcon color={iconColor} size={size} />;
};
