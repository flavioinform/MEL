# Instrucciones para completar la configuración

## 1. Ejecutar la migración de base de datos

Necesitas ejecutar la migración SQL en tu base de datos de Supabase:

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo `supabase/migrations/add_comentarios_carpeta.sql`
4. Ejecuta la query

## 2. Configurar Resend API (para notificaciones por email)

Para que las notificaciones por email funcionen, necesitas:

1. Crear una cuenta en [Resend](https://resend.com)
2. Obtener tu API Key
3. Agregar la siguiente variable a tu archivo `.env`:

```
VITE_RESEND_API_KEY=tu_api_key_aqui
```

> **Nota**: Si no configuras Resend, el sistema funcionará normalmente pero NO enviará emails de notificación.

## 3. Reiniciar el servidor de desarrollo

Después de agregar la variable de entorno, reinicia el servidor:

```bash
npm run dev
```

## Funcionalidades implementadas

✅ **Botón "Volver al Dashboard"** en el panel de Gestión de Empresas
✅ **Sistema de comentarios por carpeta** para administradores
✅ **Visualización de comentarios** para usuarios normales
✅ **Notificaciones por email** cuando el admin agrega un comentario
✅ **Formato automático de RUT** con puntos y guión
✅ **Contraseñas de 8 caracteres** en el registro
