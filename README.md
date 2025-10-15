# Backend Simple

Backend REST construido con Node.js, Express, TypeScript y Prisma ORM usando SQLite.

## Características

- Autenticación JWT
- Gestión de usuarios y items
- Validación con Zod
- Base de datos SQLite (puedes cambiar a otro motor en `prisma/schema.prisma`)
- Scripts de seed para datos iniciales

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

   ```
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` (puedes usar `.env.example` como referencia):

   ```
   PORT=3000
   JWT_SECRET=supersecret
   DATABASE_URL="file:./dev.db"
   ```

4. Genera el cliente Prisma:

   ```
   npx prisma generate
   ```

5. (Opcional) Ejecuta el script de seed para crear datos iniciales:

   ```
   npm run db:seed
   ```

## Uso

- Ejecuta el servidor en modo desarrollo:

  ```
  npm run dev
  ```

- Compila el proyecto:

  ```
  npm run build
  ```

- Inicia el servidor en producción:

  ```
  npm start
  ```

## Endpoints principales

- `POST /auth/register` — Registro de usuario
- `POST /auth/login` — Login y obtención de token JWT
- `GET /items` — Listado de items (requiere autenticación)
- `POST /items` — Crear item (requiere autenticación)

## Estructura del proyecto

```
src/
  app.ts
  index.ts
  config/
  controllers/
  middleware/
  modules/
  routes/
  scripts/
  types/
prisma/
  schema.prisma
.env
```

## Licencia

MIT
