import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Icon } from '../Icon';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';
import { FadeIn } from '../animations/Fade';

export interface ModalBaseProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  style?: ViewStyle;
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  visible,
  onClose,
  children,
  showCloseButton = true,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <FadeIn style={StyleSheet.flatten([styles.content, { backgroundColor: colors.surface }, tokens.shadows.lg, style])}>
          {showCloseButton && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityRole="button" accessibilityLabel="Cerrar modal">
              <Icon name="X" colorToken="textPrimary" />
            </TouchableOpacity>
          )}
          {children}
        </FadeIn>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  content: {
    width: '100%',
    borderRadius: tokens.borderRadius.lg,
    padding: spacing.xl,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
