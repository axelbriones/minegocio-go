import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';

export interface AIChatBubbleProps {
  message: string;
  isUser?: boolean;
  style?: ViewStyle;
}

export const AIChatBubble: React.FC<AIChatBubbleProps> = ({ message, isUser = false, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer, style]}>
      {!isUser && (
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Icon name="Sparkles" color={colors.surface} size={16} />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: colors.surfaceHighlight, borderBottomRightRadius: 4 }
            : { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1, borderTopLeftRadius: 4 },
        ]}
      >
        <Text colorToken={isUser ? 'textPrimary' : 'textPrimary'}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: 4,
  },
  bubble: {
    padding: spacing.md,
    borderRadius: tokens.borderRadius.lg,
  },
});
