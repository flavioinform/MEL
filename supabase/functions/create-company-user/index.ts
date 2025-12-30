// Edge Function para crear usuario de empresa con Supabase Admin API
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
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

        // Verificar que el usuario que hace la petición es admin
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('No authorization header')
        }

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

        if (userError || !user) {
            throw new Error('Unauthorized')
        }

        // Verificar que el usuario es administrador
        const { data: empresaData, error: empresaError } = await supabaseAdmin
            .from('empresas')
            .select('rol')
            .eq('auth_usuario_id', user.id)
            .single()

        if (empresaError || empresaData?.rol !== 'administrador') {
            throw new Error('Forbidden: Admin access required')
        }

        // Obtener datos del body
        const { email, password, nombre, rut_empresa } = await req.json()

        if (!email || !password || !nombre || !rut_empresa) {
            throw new Error('Missing required fields')
        }

        // Crear usuario en Auth
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirmar email
            user_metadata: {
                empresa_nombre: nombre,
                empresa_rut: rut_empresa,
            }
        })

        if (createError) {
            throw createError
        }

        // Crear registro en tabla empresas
        const { data: empresaCreated, error: insertError } = await supabaseAdmin
            .from('empresas')
            .insert([
                {
                    auth_usuario_id: newUser.user.id,
                    nombre: nombre,
                    rut_empresa: rut_empresa,
                    email_contacto: email,
                    rol: 'normal',
                }
            ])
            .select()
            .single()

        if (insertError) {
            // Si falla, intentar eliminar el usuario creado
            await supabaseAdmin.auth.admin.deleteUser(newUser.user.id)
            throw insertError
        }

        return new Response(
            JSON.stringify({
                success: true,
                user_id: newUser.user.id,
                empresa_id: empresaCreated.id,
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
