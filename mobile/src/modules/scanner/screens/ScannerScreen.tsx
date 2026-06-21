import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Flashlight, Zap, Settings as SettingsIcon } from 'lucide-react-native';
import { api } from '../../shared/services/api';
import { colors, spacing, typography } from '../../../theme';

export const ScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  const [continuous, setContinuous] = useState(false);
  const navigation = useNavigation<any>();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>Necesitamos acceso a la cámara para escanear</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Otorgar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned && !continuous) return;

    setScanned(true);
    Vibration.vibrate(100); // Haptic feedback on scan

    try {
      const product = await api.products.getByBarcode(data);
      if (product) {
        if (!continuous) {
          navigation.navigate('InventoryDetail', { id: product.id });
        } else {
          // Toast or subtle alert for continuous scanning mode
          console.log(`Scanned: ${product.name}`);
        }
      }
    } catch (error) {
      console.log('Product not found');
    }

    if (continuous) {
      setTimeout(() => setScanned(false), 1500); // Wait before next scan in continuous mode
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={flashlight}
        onBarcodeScanned={(scanned && !continuous) ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39", "upc_a", "upc_e"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={[styles.iconButton, continuous && styles.iconButtonActive]}
              onPress={() => setContinuous(!continuous)}
            >
              <Zap color={continuous ? colors.primary : colors.surface} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, flashlight && styles.iconButtonActive]}
              onPress={() => setFlashlight(!flashlight)}
            >
              <Flashlight color={flashlight ? colors.primary : colors.surface} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.scanArea} />

          {scanned && !continuous && (
            <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
              <Text style={styles.rescanText}>Toca para escanear de nuevo</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  message: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    ...typography.button,
    color: colors.surface,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topControls: {
    position: 'absolute',
    top: spacing.xxl,
    right: spacing.lg,
    gap: spacing.md,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonActive: {
    backgroundColor: colors.surface,
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  rescanButton: {
    position: 'absolute',
    bottom: spacing.xxl,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 24,
  },
  rescanText: {
    ...typography.button,
    color: colors.textPrimary,
  },
});
