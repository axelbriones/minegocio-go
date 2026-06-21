export const colors = {
  primary: '#00A859', // Migo Green
  secondary: '#2563EB', // Digital Blue
  background: '#F8FAFC', // Off-White
  surface: '#FFFFFF', // Pure White
  textPrimary: '#0F172A', // Slate Dark
  textSecondary: '#64748B', // Slate Muted
  destructive: '#EF4444', // Alert Red
  border: '#E2E8F0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.surface,
  },
};
