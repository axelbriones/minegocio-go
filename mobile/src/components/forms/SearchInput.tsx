import React from 'react';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { TextInput, TextInputProps } from '../TextInput';
import { Icon } from '../Icon';
import { useTheme } from '../../theme/ThemeContext';

export interface SearchInputProps extends Omit<TextInputProps, 'icon'> {
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onClear,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      value={value}
      icon={<Icon name="Search" colorToken="textSecondary" size={20} />}
      style={style}
      // Assuming TextInput allows rendering children inside the input container in a full implementation,
      // for MVP we can use the `rightIcon` pattern. Let's adapt if needed.
    />
  );
};
