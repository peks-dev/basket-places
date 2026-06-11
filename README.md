# Basket Places

**Basket Places** es una aplicación web para descubrir, compartir y gestionar canchas de baloncesto en tu comunidad. Los usuarios pueden autenticarse sin contraseña, subir imágenes de canchas, y administrar perfiles personales, fomentando una comunidad activa de jugadores.

## Estado del Proyecto

Actualmente en desarrollo (Fase 1 del MVP). Características implementadas:

- Autenticación sin contraseña vía OTP con Supabase.
- Subida de imágenes optimizadas para perfiles y canchas.
- Middleware para proteger rutas autenticadas ( `/profile`, `/contribution`).

## Tabla de Contenidos

- [Instalación](#instalacion)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologias)
- [Convención de Commits](#convenci%C3%B3n-de-commits)
- [Contribución](#contribuci%C3%B3n)
- [Licencia](#licencia)

## Instalacion

1. Clona el repositorio:
   ```
   git clone https://github.com/peks-dev/basket-places.git
   cd basket-places
   ```

````
2. Instala las dependencias:
    ```
npm install


````

3. Configura las variables de entorno en `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   RESEND_API_KEY=tu_resend_api_key
   GEMINI_API_KEY=tu_gemini_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

````
4. Inicia el servidor de desarrollo:
    ```
npm run dev


````

## Scripts Disponibles

- Iniciar el proyecto: `npm run dev`
- Verificar linting: `npm run lint`
- Corregir linting/formato: `npm run lint:fix`
- Formatear con Prettier: `npm run format`

## Estructura del Proyecto

- `lib/`: Utilidades globales (clientes de Supabase, funciones de almacenamiento).
- `lib/supabase/`: Configuración de Supabase (clientes, middleware, subida de imágenes).
- `app/(auth)/`: Páginas y lógica de autenticación (login, verificación OTP).
- `app/(main)/`: Rutas principales (perfil, contribución de canchas).
- `middleware.ts`: Middleware para proteger rutas autenticadas.

## Tecnologias

- **Frontend/Backend**: Next.js
- **Base de datos y autenticación**: Supabase
- **Envío de emails**: Resend
- **Optimización de imágenes**: Sharp
- **Generación de IDs únicos**: UUID
- **Estilizado**: Tailwind CSS
- **Linting/Formato**: ESLint, Prettier

## Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para un historial de cambios claro. Formato:

```
<tipo>[ámbito opcional]: <descripción breve>
[cuerpo opcional]
[pie opcional]


```

### Tipos de Commit

- `feat`: Nueva funcionalidad (ej. `feat(auth): implementar login OTP`).
- `fix`: Corrección de errores (ej. `fix(ui): ajustar alineación móvil`).
- `docs`: Cambios en documentación (ej. `docs: actualizar README`).
- `style`: Cambios de formato (ej. `style: formatear con Prettier`).
- `refactor`: Reorganización de código (ej. `refactor(storage): optimizar uploadImage`).
- `test`: Añadir/modificar pruebas (ej. `test(auth): pruebas de login`).
- `chore`: Tareas de mantenimiento (ej. `chore: actualizar dependencias`).

### Ejemplo

```
feat(storage): configurar subida de imágenes con optimización
- Implementar lib/uploadImage.ts con Sharp
- Configurar buckets avatars y communities
- Añadir dependencias uuid y sharp


```

## Contribución

1. Crea un fork del repositorio.
2. Crea una rama: `git checkout -b feat/nueva-funcionalidad`.
3. Realiza cambios y haz commits siguiendo la convención.
4. Envía un pull request a la rama `main`.

Consulta la Guía de Contribución para más detalles (en desarrollo).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

### ¿Qué significa esto?

- ✅ Uso comercial y privado
- ✅ Modificación y distribución
- ✅ Incluir en proyectos propietarios
- ❗ Incluir aviso de copyright
- ❗ Incluir la licencia MIT
