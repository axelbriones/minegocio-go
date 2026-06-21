import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Mic, Camera, Send, Sparkles } from 'lucide-react-native';
import { colors, spacing, typography } from '../../../theme';

export const MigoScreen = () => {
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Sparkles color={colors.primary} size={24} />
        <Text style={styles.title}>MIGO IA</Text>
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>Sugerencias</Text>
          <Text style={styles.suggestionText}>• "Crear un producto tomando una foto"</Text>
          <Text style={styles.suggestionText}>• "Registrar entrada de 10 Coca Colas"</Text>
          <Text style={styles.suggestionText}>• "¿Cuáles son los productos con stock bajo?"</Text>
        </View>

        {/* Processing Indicator Placeholder */}
        {/* <View style={styles.processingBubble}>
          <Text style={styles.processingText}>MIGO está pensando...</Text>
        </View> */}
      </ScrollView>

      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.iconButton}>
          <Camera color={colors.textSecondary} size={24} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Escribe o dicta una instrucción..."
          value={text}
          onChangeText={setText}
          multiline
        />

        {text.length > 0 ? (
          <TouchableOpacity style={[styles.iconButton, styles.primaryButton]}>
            <Send color={colors.surface} size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.iconButton, styles.primaryButton]}>
            <Mic color={colors.surface} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  title: {
    ...typography.h2,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: spacing.md,
  },
  suggestionCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  suggestionTitle: {
    ...typography.body,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    color: colors.textSecondary,
  },
  suggestionText: {
    ...typography.body,
    marginBottom: spacing.xs,
    color: colors.primary,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
});
