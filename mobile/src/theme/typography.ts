export const typography = {
  fontFamily: {
    regular: 'System', // Standard fallback, assumes Inter or San Francisco on iOS / Roboto on Android
    bold: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16, // Base body size
    lg: 18,
    xl: 20,
    xxl: 24, // H2
    xxxl: 32, // H1
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const textVariants = {
  h1: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes.xxxl * typography.lineHeights.tight,
  },
  h2: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes.xxl * typography.lineHeights.tight,
  },
  h3: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.xl * typography.lineHeights.tight,
  },
  body: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.md * typography.lineHeights.normal,
  },
  bodyBold: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.md * typography.lineHeights.normal,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.sm * typography.lineHeights.normal,
  },
  caption: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.xs * typography.lineHeights.normal,
  },
  button: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes.lg * typography.lineHeights.normal,
  },
  price: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.xl * typography.lineHeights.tight,
  },
};
