// Edge Function para eliminar usuario y todos sus datos asociados
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
        const { user_id, empresa_id } = await req.json()

        if (!user_id || !empresa_id) {
            throw new Error('Missing required fields: user_id and empresa_id')
        }

        // Verificar que no sea un admin
        const { data: targetEmpresa, error: targetError } = await supabaseAdmin
            .from('empresas')
            .select('rol')
            .eq('id', empresa_id)
            .single()

        if (targetError) {
            throw targetError
        }

        if (targetEmpresa.rol === 'administrador') {
            throw new Error('Cannot delete administrator account')
        }

        // 1. Eliminar documentos de la base de datos
        const { error: docsError } = await supabaseAdmin
            .from('documentos')
            .delete()
            .eq('empresa_id', empresa_id)

        if (docsError) {
            console.error('Error deleting documents:', docsError)
        }

        // 2. Eliminar archivos del storage
        try {
            const { data: files } = await supabaseAdmin.storage
                .from('documentacion-empresas')
                .list(empresa_id.toString())

            if (files && files.length > 0) {
                const filePaths = files.map((file) => `${empresa_id}/${file.name}`)
                await supabaseAdmin.storage
                    .from('documentacion-empresas')
                    .remove(filePaths)
            }
        } catch (storageError) {
            console.error('Error deleting storage files:', storageError)
        }

        // 3. Eliminar registro de empresa
        const { error: empresaDeleteError } = await supabaseAdmin
            .from('empresas')
            .delete()
            .eq('id', empresa_id)

        if (empresaDeleteError) {
            throw empresaDeleteError
        }

        // 4. Eliminar usuario de Auth
        const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(user_id)

        if (authDeleteError) {
            console.error('Error deleting auth user:', authDeleteError)
            // No lanzar error aquí, ya que los datos principales ya fueron eliminados
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Company and user deleted successfully',
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
