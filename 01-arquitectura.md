# 🧱 TAREA 1 — ARQUITECTURA

## 🎯 Objetivo global

Construir una arquitectura monorepo profesional, escalable y estándar industrial para MI NEGOCIO GO.

## ✅ SUBTAREA 1.3 — TYPESCRIPT GLOBAL CONFIG

Se ha unificado la configuración de TypeScript en todo el sistema.

### Entregables:
- `tsconfig.base.json` creado en la raíz del proyecto.
- Archivos `tsconfig.json` por aplicación (`mobile`, `web`, `backend`) configurados para heredar del base.
- Configuración de alias de rutas (paths) para los siguientes directorios:
  - `@shared/*`
  - `@ui/*`
  - `@api/*`
  - `@core/*`
