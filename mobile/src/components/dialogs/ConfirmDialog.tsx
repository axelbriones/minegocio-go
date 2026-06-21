import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ModalBase } from './ModalBase';
import { Text } from '../Text';
import { Button } from '../Button';
import { spacing } from '../../theme/spacing';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  destructive = false,
}) => {
  return (
    <ModalBase visible={visible} onClose={onCancel} showCloseButton={false}>
      <Text variant="h2" style={styles.title}>{title}</Text>
      <Text variant="body" colorToken="textSecondary" style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        <View style={styles.buttonContainer}>
          <Button title={cancelText} variant="outline" onPress={onCancel} />
        </View>
        <View style={styles.spacer} />
        <View style={styles.buttonContainer}>
          <Button
            title={confirmText}
            variant={destructive ? 'destructive' : 'primary'}
            onPress={onConfirm}
          />
        </View>
      </View>
    </ModalBase>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
  },
  spacer: {
    width: spacing.md,
  },
});
