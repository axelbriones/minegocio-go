import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScanLine, ArrowUpRight, ArrowDownRight, RefreshCcw, ArrowRightLeft } from 'lucide-react-native';
import { useInventoryStore } from '../../inventory/stores/useInventoryStore';
import { enqueueSync } from '../../shared/services/offline';
import { useSyncStore } from '../../shared/stores/useSyncStore';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme';
import uuid from 'react-native-uuid';

export const MovementsScreen = () => {
  const { products, updateProduct } = useInventoryStore();
  const { setPendingCount, pendingCount } = useSyncStore();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [type, setType] = useState('IN');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  const handleSave = async () => {
    if (!selectedProductId || !quantity) {
      Alert.alert('Error', 'Por favor seleccione un producto y cantidad.');
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert('Error', 'Cantidad inválida.');
      return;
    }

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    if (type === 'OUT' || type === 'TRANSFER') {
      if (product.stock < qty) {
        Alert.alert('Stock Insuficiente', `Solo hay ${product.stock} unidades disponibles.`);
        return;
      }
    }

    const newStock = type === 'IN' || type === 'ADJUST' ? product.stock + qty : product.stock - qty;

    const movement = {
      id: uuid.v4().toString(),
      type,
      productId: product.id,
      quantity: qty,
      reason,
      createdAt: new Date().toISOString()
    };

    updateProduct({ ...product, stock: newStock });
    await enqueueSync('stock_movement', 'CREATE', movement);
    setPendingCount(pendingCount + 1);

    // Quick visual confirmation (<15s flow goal)
    Alert.alert('Movimiento Registrado', 'Guardado en cola offline', [{ text: 'OK' }]);
    setQuantity('');
    setReason('');
  };

  const TypeButton = ({ t, label, icon: Icon, color }: any) => (
    <TouchableOpacity
      style={[styles.typeButton, type === t && { borderColor: color, backgroundColor: `${color}15` }]}
      onPress={() => setType(t)}
    >
      <Icon color={type === t ? color : colors.textSecondary} size={24} />
      <Text style={[styles.typeText, type === t && { color, fontWeight: 'bold' }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Registrar Movimiento</Text>

        <View style={styles.formCard}>
          <View style={styles.headerRow}>
            <Text style={styles.label}>Producto</Text>
            <TouchableOpacity style={styles.scanButton}>
              <ScanLine color={colors.primary} size={16} />
              <Text style={styles.scanText}>Escanear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedProductId}
              onValueChange={itemValue => setSelectedProductId(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar producto..." value="" />
              {products.map(p => (
                <Picker.Item key={p.id} label={`${p.name} (${p.stock} uds)`} value={p.id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Tipo de Movimiento</Text>
          <View style={styles.typeGrid}>
            <TypeButton t="IN" label="Entrada" icon={ArrowDownRight} color={colors.primary} />
            <TypeButton t="OUT" label="Salida" icon={ArrowUpRight} color="#EF4444" />
            <TypeButton t="ADJUST" label="Ajuste" icon={RefreshCcw} color="#F59E0B" />
            <TypeButton t="TRANSFER" label="Transferir" icon={ArrowRightLeft} color="#3B82F6" />
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Cantidad</Text>
              <TextInput
                style={styles.inputLarge}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                placeholder="0"
                maxLength={5}
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Unidad</Text>
              <View style={styles.unitBox}>
                <Text style={styles.unitText}>Unidades</Text>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Observaciones</Text>
          <TextInput
            style={styles.textArea}
            value={reason}
            onChangeText={setReason}
            placeholder="Motivo del movimiento..."
            multiline
            numberOfLines={3}
          />
        </View>

        <Button title="Confirmar Movimiento" onPress={handleSave} variant="primary" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  formCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scanText: {
    ...typography.subtitle,
    color: colors.primary,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginBottom: spacing.lg,
  },
  picker: {
    height: 50,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  typeButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  typeText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  halfWidth: {
    flex: 1,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.background,
    ...typography.h2,
    textAlign: 'center',
  },
  unitBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  unitText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.background,
    ...typography.body,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
