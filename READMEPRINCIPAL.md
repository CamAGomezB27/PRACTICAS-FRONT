# Proyecto Frontend React

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint

# Inicializar Tailwind CSS (si es necesario)
npm run tailwind-init
```

## Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## Consideraciones

- El servidor de desarrollo se ejecuta con `--host` habilitado para acceso desde la red local
- Utiliza Vite como bundler para un desarrollo más rápido
- TypeScript está configurado con ESLint para mantener calidad de código
- Tailwind CSS puede requerir inicialización con `npm run tailwind-init` si no está configurado

## Tecnologías Principales

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Query
- Google OAuth
