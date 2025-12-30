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
        const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
        if (!RESEND_API_KEY) {
            throw new Error('Missing RESEND_API_KEY in Edge Function secrets')
        }

        // Create Supabase client to check auth
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // Verify user is authenticated
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
        if (userError || !user) {
            throw new Error('Unauthorized')
        }

        const { to, subject, html } = await req.json()

        if (!to || !subject || !html) {
            throw new Error('Missing required fields: to, subject, html')
        }

        console.log(`Sending email to ${to} with subject: ${subject}`)

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'MELS <onboarding@resend.dev>', // Replace with your domain if verified
                to: [to],
                subject: subject,
                html: html,
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            console.error('Resend API Error:', data)
            throw new Error(data.message || 'Error sending email via Resend')
        }

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Edge Function Error:', error)
        // Return 200 even on error so client can parse the error message in body
        return new Response(JSON.stringify({ error: { message: error.message || 'Unknown error' } }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    }
})
