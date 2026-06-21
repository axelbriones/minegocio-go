# DevOps - Estado y Plan de Acción (Tarea 10)

Este documento detalla el estado actual y lo que falta por implementar para la infraestructura DevOps del proyecto **MI NEGOCIO GO**.

## Resumen de Arquitectura
El ecosistema consta de:
- **Mobile:** React Native (Expo) - App principal
- **Web:** Next.js - Panel administrativo
- **Backend:** NestJS + PostgreSQL + Redis + BullMQ - API y motor de sincronización

---

## Estado por Componente

### 1. Docker
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Crear `Dockerfile` optimizado (multi-stage) para el **Backend** (NestJS).
  - Crear `Dockerfile` optimizado (multi-stage) para la **Web** (Next.js), en caso de no usar Vercel.
  - Crear `docker-compose.yml` para desarrollo local (PostgreSQL, Redis, Backend).
  - Crear `docker-compose.prod.yml` para el despliegue de producción en el VPS.

### 2. CI/CD & GitHub Actions
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Crear `.github/workflows/backend-ci.yml` para ejecutar lint, unit tests y build del backend en cada PR o push.
  - Crear `.github/workflows/web-ci.yml` para validar la app Next.js.
  - Crear `.github/workflows/mobile-ci.yml` para ejecutar comprobaciones en Expo (lint, TSC) y generar build previews usando EAS (Expo Application Services).
  - Crear pipeline de **CD (Continuous Deployment)** para desplegar los contenedores de backend automáticamente al VPS mediante SSH cuando se integra en la rama `main`.

### 3. VPS (Virtual Private Server)
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Aprovisionamiento del servidor (Ubuntu 22.04 / 24.04 recomendado).
  - Hardening de seguridad: Configurar UFW (Firewall), deshabilitar login de root por contraseña, cambiar puerto SSH.
  - Instalar Docker y Docker Compose (plugin).
  - Configurar un Reverse Proxy (Traefik o Nginx) con soporte TLS para enrutar tráfico a los contenedores.

### 4. Cloudflare
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Trasladar administración de DNS al panel de Cloudflare.
  - Configurar registros (ej. `api.midominio.com` apuntando al VPS, `admin.midominio.com` apuntando a Vercel/VPS).
  - Activar el Proxy (nube naranja) para obtener:
    - Ocultamiento de la IP de origen (protección contra ataques directos al VPS).
    - Terminación SSL gratuita y estricta (Cloudflare <-> VPS).
    - Reglas WAF (Web Application Firewall) básicas y rate-limiting.

### 5. Vercel
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Importar el repositorio de GitHub en Vercel.
  - Ajustar el directorio raíz (`Root Directory`) a la carpeta `web/`.
  - Configurar variables de entorno (ej. `NEXT_PUBLIC_API_URL` apuntando a Cloudflare/VPS).
  - Asociar un dominio personalizado si es necesario.
  - Validar que el build en producción (`npm run build`) funcione correctamente sin dependencias faltantes.

### 6. Backups
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Escribir un script (`scripts/backup.sh`) que utilice `pg_dump` para realizar respaldos regulares de la base de datos PostgreSQL.
  - Configurar un Cronjob (o contenedor como `ofelia`/`cron`) para ejecutar los backups automáticamente.
  - Política de retención: limpiar backups locales con más de X días de antigüedad.
  - Envío a Cloud/Offsite: Integrar un mecanismo para copiar los dumps de la BD a un servicio externo (S3 de AWS, R2 de Cloudflare, o Google Drive) para tolerancia a fallos críticos del VPS.

### 7. Logs
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Configurar el daemon de Docker (`/etc/docker/daemon.json`) para limitar el tamaño de los logs locales y evitar que el disco del VPS se llene (`max-size: 10m`, `max-file: 3`).
  - Implementar un stack de centralización de logs ligero (Ej: Loki + Promtail + Grafana) o integrar servicios externos como Datadog / Papertrail si el presupuesto lo permite.
  - Asegurar que la aplicación de Backend genere logs en un formato fácil de parsear (JSON) usando herramientas como `Pino` (en NestJS).

### 8. Monitoring
- **Estado Actual:** 🔴 Pendiente
- **Qué falta:**
  - Configurar Healthchecks de Docker para todos los contenedores críticos (Postgres, Redis, NestJS).
  - Instalar monitorización del VPS (Prometheus + Node Exporter).
  - Panel visual de Grafana para vigilar carga de CPU, RAM, I/O de disco y conexiones a la DB.
  - Implementar un monitor externo Uptime (ej. Uptime Kuma o UptimeRobot) que envíe notificaciones por Slack, Telegram o Email si la API o Base de Datos se caen.
