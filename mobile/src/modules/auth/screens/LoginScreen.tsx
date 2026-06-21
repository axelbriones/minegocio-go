import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, Text } from 'react-native';
import { supabase } from '../../shared/services/supabase';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MI NEGOCIO <Text style={styles.brandGo}>GO</Text></Text>
      <Text style={styles.subtitle}>Inventario</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={loading ? 'Ingresando...' : 'Ingresar'}
          onPress={signInWithEmail}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  brandGo: {
    color: colors.primary,
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
});
