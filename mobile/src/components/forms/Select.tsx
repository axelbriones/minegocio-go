import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { spacing } from '../../theme/spacing';
import { tokens } from '../../theme/tokens';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Seleccionar...',
  style,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <View style={[styles.container, style]}>
      {label && <Text variant="subtitle" colorToken="textSecondary" style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
      >
        <Text colorToken={selectedOption ? 'textPrimary' : 'textSecondary'}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Icon name="ChevronDown" colorToken="textSecondary" size={20} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text variant="h3">{label || 'Seleccionar opción'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Icon name="X" colorToken="textPrimary" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.optionItem, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={item.value === selectedValue ? { fontWeight: 'bold' } : {}}>
                    {item.label}
                  </Text>
                  {item.value === selectedValue && <Icon name="Check" colorToken="primary" size={20} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: tokens.borderRadius.md,
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: tokens.borderRadius.xl,
    borderTopRightRadius: tokens.borderRadius.xl,
    maxHeight: '70%',
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  closeButton: {
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    minHeight: 56,
  },
});
