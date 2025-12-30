# Guía de Despliegue de Edge Functions

## Requisitos Previos

1. **Supabase CLI** instalado:
```bash
npm install -g supabase
```

2. **Autenticación** con Supabase:
```bash
supabase login
```

3. **Vincular proyecto**:
```bash
supabase link --project-ref TU_PROJECT_REF
```

## Desplegar Edge Functions

### 1. Desplegar todas las funciones

```bash
# Desde la raíz del proyecto
supabase functions deploy create-company-user
supabase functions deploy reset-company-password  
supabase functions deploy delete-company-user
```

### 2. Configurar variables de entorno

Las Edge Functions necesitan acceso a las siguientes variables de entorno (ya configuradas automáticamente por Supabase):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Verificar despliegue

```bash
supabase functions list
```

## Uso desde el Cliente

Las funciones están configuradas para ser llamadas desde `src/utils/adminApi.js`:

```javascript
import { createCompanyUser, resetCompanyPassword, deleteCompanyUser } from '../utils/adminApi';

// Crear empresa
await createCompanyUser({
    email: 'user@company.com',
    password: 'secure-password',
    nombre: 'Company Name',
    rut_empresa: '12.345.678-9'
});

// Resetear contraseña
await resetCompanyPassword(userId, newPassword);

// Eliminar empresa
await deleteCompanyUser(userId, empresaId);
```

## Seguridad

- ✅ Todas las funciones verifican que el usuario autenticado sea administrador
- ✅ Las funciones usan el `service_role_key` solo en el servidor
- ✅ CORS configurado para permitir llamadas desde tu dominio
- ✅ Validaciones de permisos antes de ejecutar operaciones sensibles

## Solución Temporal (Sin Edge Functions)

Si no puedes desplegar Edge Functions inmediatamente, el panel de administración funcionará con limitaciones:

- ✅ **Crear empresas**: Funciona usando `supabase.auth.signUp()`
- ⚠️ **Resetear contraseñas**: Requiere Edge Function
- ⚠️ **Eliminar usuarios**: Requiere Edge Function

Para habilitar todas las funcionalidades, debes desplegar las Edge Functions siguiendo los pasos anteriores.

## Troubleshooting

### Error: "Function not found"
- Verifica que las funciones estén desplegadas: `supabase functions list`
- Asegúrate de que el nombre de la función coincida exactamente

### Error: "Unauthorized"
- Verifica que el usuario esté autenticado
- Confirma que el usuario tenga rol de administrador en la tabla `empresas`

### Error: "CORS"
- Las funciones ya tienen CORS configurado para `*`
- Si necesitas restringir, modifica `corsHeaders` en cada función
