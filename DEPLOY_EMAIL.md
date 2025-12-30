# Instrucciones para Habilitar el Envío de Emails

Para solucionar el problema de envío de emails (bloqueo por CORS), he creado una **Supabase Edge Function** segura.

Necesitas desplegar esta función y configurar tu API Key de Resend.

## 1. Configurar el Secreto (API Key)

Ejecuta este comando en tu terminal para guardar tu API Key de Resend en Supabase de forma segura:

```bash
npx supabase secrets set RESEND_API_KEY=tu_api_key_de_resend_aqui
```
*(Reemplaza `tu_api_key_de_resend_aqui` por tu clave real que empieza con `re_`)*

## 2. Desplegar la Función

Ejecuta este comando para subir la nueva función a Supabase:

```bash
npx supabase functions deploy send-email-notification
```

## 3. Verificar

Una vez desplegada:
1. Recarga la página del Dashboard.
2. Intenta agregar un nuevo comentario.
3. Deberías ver en la consola del navegador: `✅ Email enviado correctamente`.

> **Nota**: Si no tienes `npx` o Supabase CLI configurado, asegúrate de haber hecho login antes con `npx supabase login`.
