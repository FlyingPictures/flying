# Flying Pictures México

Sitio web moderno para vuelos en globo aerostático sobre Teotihuacán, construido con Next.js 16, React 19, TypeScript y Tailwind CSS.

## 🚀 Características

- **Next.js 16** con App Router
- **React 19** con Server Components
- **TypeScript** para type safety
- **Tailwind CSS 4** para estilos
- **next-intl** para internacionalización (ES/EN)
- **Cloudinary** para optimización de imágenes
- **SEO optimizado** con metadata, sitemap y robots.txt
- **PWA ready** con manifest.json
- **Structured Data** (Schema.org) para mejor SEO
- **Google Analytics** integrado
- **Headers de seguridad** configurados
- **Error boundaries** para manejo de errores

## 📋 Requisitos Previos

- Node.js 20+ 
- npm, yarn, pnpm o bun

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd v1
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` y configura:
- `NEXT_PUBLIC_SITE_URL` - URL del sitio (ej: https://www.flyingpicturesmexico.com)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Nombre de tu cuenta de Cloudinary
- `GOOGLE_VERIFICATION_CODE` - Código de verificación de Google Search Console
- `NEXT_PUBLIC_GA_ID` - ID de Google Analytics (opcional)

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
v1/
├── app/                    # App Router de Next.js
│   ├── [locale]/          # Rutas internacionalizadas
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # Página 404
│   ├── global-error.tsx   # Error boundary global
│   ├── sitemap.ts         # Sitemap dinámico
│   └── manifest.ts        # PWA manifest
├── components/            # Componentes React
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Secciones de página
│   ├── shared/           # Componentes compartidos
│   ├── ui/               # Componentes UI (shadcn/ui)
│   └── analytics/         # Componentes de analytics
├── lib/                  # Utilidades y helpers
│   ├── cloudinary.ts     # Funciones de Cloudinary
│   ├── structured-data.tsx # Schema.org JSON-LD
│   └── utils.ts          # Utilidades generales
├── constants/            # Constantes de configuración
├── hooks/                # Custom React hooks
├── i18n/                 # Configuración de internacionalización
├── messages/             # Traducciones (en.json, es.json)
└── public/               # Archivos estáticos
    ├── robots.txt        # Configuración de robots
    └── .well-known/      # Archivos de seguridad
```

## 🌐 Internacionalización

El proyecto soporta dos idiomas:
- Español (`es`)
- Inglés (`en`)

Las rutas están prefijadas con el locale: `/es/` y `/en/`

## 🎨 Estilos

El proyecto usa Tailwind CSS 4 con configuración personalizada. Los estilos globales están en `app/globals.css`.

## 🖼️ Optimización de Imágenes

Las imágenes se optimizan automáticamente usando Cloudinary. Usa el componente `OptimizedImage` para imágenes responsivas.

## 🔍 SEO

- **Metadata**: Configurado en cada página con OpenGraph y Twitter Cards
- **Sitemap**: Generado dinámicamente en `/sitemap.xml`
- **Robots.txt**: Configurado en `/robots.txt`
- **Structured Data**: Schema.org JSON-LD para mejor indexación
- **Canonical URLs**: Configuradas para evitar contenido duplicado

## 🔒 Seguridad

Headers de seguridad configurados en `next.config.ts`:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

## 📊 Analytics

Google Analytics 4 está integrado. Configura `NEXT_PUBLIC_GA_ID` en las variables de entorno.

## 🚢 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. Deploy automático en cada push

### Otros proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 16.1.1** - Framework React
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Estilos
- **next-intl 4.7.0** - Internacionalización
- **shadcn/ui** - Componentes UI
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

## 📄 Licencia

Este proyecto es privado y propiedad de Flying Pictures México.

## 🤝 Soporte

Para soporte, contacta a: security@flyingpicturesmexico.com
