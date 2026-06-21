# MI NEGOCIO GO - Arquitectura del Sistema

Este documento describe la arquitectura técnica del proyecto, con un enfoque particular en el Design System desarrollado para la aplicación móvil en React Native (Expo).

## 1. Stack Tecnológico Principal

*   **Frontend Mobile:** React Native (Expo) con TypeScript.
*   **Gestión de Estado:** Zustand.
*   **Enrutamiento:** `@react-navigation/native` (native-stack).
*   **Base de Datos Local:** `expo-sqlite` (Offline-first).
*   **Iconografía:** `lucide-react-native`.

## 2. Design System (Sistema de Diseño)

El sistema de diseño ha sido construido siguiendo las directrices de `BRANDING.md`, enfocado en ser rápido, accesible ("chunky & tap-friendly") y altamente escalable. Reside en el directorio `mobile/src/theme/` y `mobile/src/components/`.

### 2.1 Tokens de Diseño (`src/theme/`)

Los tokens son las variables fundamentales de la UI, separadas de la lógica de los componentes.

*   **`colors.ts`**: Define las paletas `lightColors` y `darkColors`. Incluye colores de marca (Migo Green, Digital Blue), superficies, textos (Slate) y estados de alerta.
*   **`typography.ts`**: Define la escala tipográfica, familias de fuentes (System default - Inter/Roboto/San Francisco), tamaños (xs a xxxl), pesos (regular a bold) y alturas de línea. Expone la variable `textVariants` (h1, h2, body, subtitle, etc.).
*   **`spacing.ts`**: Define una escala de espaciado estándar (4px, 8px, 16px, 24px, 32px, 48px, 64px) para mantener consistencia en márgenes y paddings.
*   **`tokens.ts`**: Contiene configuraciones para `borderRadius` (redondeos), `shadows` (sombras con elevación) y `zIndices`.
*   **`animations.ts`**: Centraliza duraciones de tiempo y curvas de aceleración (`Easing`) estándar para ser consumidas por la API `Animated` de React Native.

### 2.2 Motor de Temas (`ThemeContext.tsx`)

Maneja el estado global del tema (Light / Dark / System).

*   Provee un contexto mediante `ThemeProvider`.
*   Utiliza el hook `useColorScheme` de React Native para reaccionar a los cambios de esquema del sistema operativo.
*   Expone el hook `useTheme()`, que retorna el tema actual (`isDark`), la función para cambiarlo, y el objeto de `colors` correspondiente al esquema activo.

### 2.3 Componentes Base (`src/components/`)

Componentes genéricos y agnósticos al negocio que consumen estrictamente el Theme Context y los Tokens.

1.  **`Text.tsx`**: Wrapper de `Text` de React Native. Recibe un prop `variant` (ej. 'h1', 'body') y resuelve los colores inteligentemente usando `colorToken`.
2.  **`Button.tsx`**: Componente interactivo que implementa la regla "tap-friendly" (mínimo 64px de alto). Soporta variantes (primary, secondary, outline, ghost, destructive) e incorpora una animación suave de escala nativa (`Animated`) al presionar.
3.  **`Icon.tsx`**: Wrapper de `lucide-react-native` que se conecta automáticamente con `ThemeContext` para colorear los iconos basándose en los tokens (ej. `colorToken="textPrimary"`).
4.  **`Card.tsx`**: Contenedor de superficie. En Light mode aplica un `shadow` suave, y en Dark mode cambia dinámicamente a un borde sutil, respetando las mejores prácticas de contraste.
5.  **`TextInput.tsx`**: Campo de texto con manejo de estados interactivos (focus/blur), bordes dinámicos que reaccionan al Theme (Migo Green al hacer focus) y soporte para validación de errores visuales.
6.  **`Badge.tsx`**: Etiqueta indicadora pequeña y redondeada, útil para estados (success, warning, info) usando los colores semánticos del tema.

## 3. Patrones de Arquitectura UX/UI

*   **Offline-First Visual:** Todos los componentes están diseñados para no requerir estados de carga complejos por red. Operan inmediatamente.
*   **Context-Aware Components:** Al usar el hook `useTheme()`, ningún componente de UI necesita saber explícitamente si está en "Modo Oscuro". Simplemente piden "color de fondo" (`colors.background`), y el contexto provee el valor correcto en tiempo real.
*   **Sin Estilos Mágicos:** Se prohíbe el uso de "Magic Numbers" en los `StyleSheet.create`. Todo el padding, margen o color debe provenir de `spacing.X`, `tokens.borderRadius.X` o `colors.X`.

## 4. Estado Actual (MVP)

*   [x] Estructura de navegación básica.
*   [x] Base de datos SQLite local inicializada.
*   [x] **Design System UI** implementado (Tokens, Contexto Light/Dark, Componentes Core, Animaciones).
*   [ ] Tablas y modelos de datos SQLite.
*   [ ] Flujos de operaciones (CRUD Inventario/Ventas).
*   [ ] Integración de IA (MIGO).

### 2.4 Ampliación del Design System (Componentes Adicionales)
El sistema ha sido extendido exhaustivamente para soportar el 100% de la UI sin declarar estilos quemados. Todos los componentes cumplen accesibilidad (áreas táctiles mínimas de 48px y soporte para lectores):

*   **Feedback:** `Alert`, `EmptyState`, `LoadingOverlay`.
*   **Visuales:** `Avatar`, `Divider`, `ProgressBar`, `CircularProgress`.
*   **Formularios:** `Switch`, `Checkbox`, `SearchInput`, `Select`.
*   **Navegación:** `AppHeader`.
*   **Diálogos:** `ModalBase`, `ConfirmDialog`.
*   **Datos:** `KeyValueCard`.
*   **Dominio (Inventario):** `ProductCard`.
*   **Dominio (IA):** `AIChatBubble`.
*   **Animaciones Base (`src/components/animations/`):** `FadeIn`, `FadeOut`, `SlideUp`, `SlideDown`, `Scale`, `SkeletonAnimation`.

Estos componentes son agnósticos a la lógica de negocio (reciben datos vía *props*) y reaccionan de manera nativa al modo oscuro y paleta general del `ThemeContext`.
