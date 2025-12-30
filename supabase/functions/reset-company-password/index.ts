// Edge Function para resetear contraseña de usuario
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )

        // Verificar autenticación y permisos de admin
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('No authorization header')
        }

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

        if (userError || !user) {
            throw new Error('Unauthorized')
        }

        const { data: empresaData, error: empresaError } = await supabaseAdmin
            .from('empresas')
            .select('rol')
            .eq('auth_usuario_id', user.id)
            .single()

        if (empresaError || empresaData?.rol !== 'administrador') {
            throw new Error('Forbidden: Admin access required')
        }

        // Obtener datos del body
        const { user_id, new_password } = await req.json()

        if (!user_id || !new_password) {
            throw new Error('Missing required fields: user_id and new_password')
        }

        // Actualizar contraseña
        const { data, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            user_id,
            { password: new_password }
        )

        if (updateError) {
            throw updateError
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Password updated successfully',
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message,
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
