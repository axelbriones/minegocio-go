export const lightColors = {
  // Brand
  primary: '#00A859', // Migo Green
  secondary: '#2563EB', // Digital Blue

  // Backgrounds & Surfaces
  background: '#F8FAFC', // Off-White
  surface: '#FFFFFF', // Pure White
  surfaceHighlight: '#F1F5F9', // Light gray for pressed/hover states

  // Typography
  textPrimary: '#0F172A', // Slate Dark
  textSecondary: '#64748B', // Slate Muted
  textInverse: '#FFFFFF', // White text on dark elements

  // Borders & Dividers
  border: '#E2E8F0',

  // Status / Alerts
  success: '#10B981',
  warning: '#F59E0B',
  destructive: '#EF4444', // Alert Red
  info: '#3B82F6',
};

export const darkColors = {
  // Brand
  primary: '#00A859', // Migo Green
  secondary: '#3B82F6', // Lighter Digital Blue for dark mode visibility

  // Backgrounds & Surfaces
  background: '#0F172A', // Slate Dark
  surface: '#1E293B', // Slate slightly lighter
  surfaceHighlight: '#334155', // Lighter slate for pressed/hover states

  // Typography
  textPrimary: '#F8FAFC', // Off-White
  textSecondary: '#94A3B8', // Slate light
  textInverse: '#0F172A', // Dark text on light elements

  // Borders & Dividers
  border: '#334155',

  // Status / Alerts
  success: '#10B981',
  warning: '#FBBF24',
  destructive: '#F87171', // Lighter Alert Red
  info: '#60A5FA',
};

export type ThemeColors = typeof lightColors;
