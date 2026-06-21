import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useInventoryStore } from '../../inventory/stores/useInventoryStore';
import { enqueueSync } from '../../shared/services/offline';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme';
import uuid from 'react-native-uuid';

export const MovementsScreen = () => {
  const { products, updateProduct } = useInventoryStore();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [type, setType] = useState('IN');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  const handleSave = async () => {
    if (!selectedProductId || !quantity) {
      Alert.alert('Error', 'Por favor complete el producto y la cantidad.');
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

    // Calcular nuevo stock optimista
    const newStock = type === 'IN' || type === 'ADJUST' ? product.stock + qty : product.stock - qty;

    const movement = {
      id: uuid.v4().toString(),
      type,
      productId: product.id,
      quantity: qty,
      reason,
      createdAt: new Date().toISOString()
    };

    // Actualizar estado local
    updateProduct({ ...product, stock: newStock });

    // Encolar para sincronización
    await enqueueSync('stock_movement', 'CREATE', movement);

    Alert.alert('Éxito', 'Movimiento registrado localmente.');
    setQuantity('');
    setReason('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Movimiento</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Producto</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedProductId}
            onValueChange={itemValue => setSelectedProductId(itemValue)}
          >
            <Picker.Item label="Seleccionar producto..." value="" />
            {products.map(p => (
              <Picker.Item key={p.id} label={`${p.name} (Stock: ${p.stock})`} value={p.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Tipo de Movimiento</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={itemValue => setType(itemValue)}
          >
            <Picker.Item label="Entrada" value="IN" />
            <Picker.Item label="Salida" value="OUT" />
            <Picker.Item label="Ajuste" value="ADJUST" />
            <Picker.Item label="Transferencia" value="TRANSFER" />
          </Picker>
        </View>

        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Ej: 10"
        />

        <Text style={styles.label}>Motivo (opcional)</Text>
        <TextInput
          style={styles.input}
          value={reason}
          onChangeText={setReason}
          placeholder="Ej: Recepción de proveedor"
        />

        <Button title="Confirmar Movimiento" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
});
