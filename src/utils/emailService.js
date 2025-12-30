import { supabase } from '../lib/supabase';

/**
 * Envía una notificación por email usando Supabase Edge Function
 */
export async function sendCommentNotification({
  toEmail,
  empresaNombre,
  carpetaNombre,
  comentario
}) {
  try {
    console.log('📤 Enviando notificación de comentario via Edge Function...');

    const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
                .comment-box { background: white; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0; border-radius: 5px; }
                .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
                .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">📝 Nuevo Comentario del Administrador</h1>
                </div>
                <div class="content">
                  <p>Hola <strong>${empresaNombre}</strong>,</p>
                  <p>El administrador ha dejado un comentario en la carpeta <strong>"${carpetaNombre}"</strong>:</p>
                  
                  <div class="comment-box">
                    <p style="margin: 0; white-space: pre-wrap;">${comentario}</p>
                  </div>
                  
                  <p>Puedes revisar todos tus documentos y comentarios ingresando a tu panel de gestión.</p>
                  
                  <a href="${window.location.origin}/dashboard" class="button">Ir al Dashboard</a>
                  
                  <div class="footer">
                    <p>Este es un mensaje automático del sistema MELS.</p>
                    <p>Por favor no respondas a este correo.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;

    const { data, error } = await supabase.functions.invoke('send-email-notification', {
      body: {
        to: toEmail,
        subject: `Nuevo comentario en carpeta: ${carpetaNombre}`,
        html: htmlContent
      }
    });

    if (error) {
      console.error('❌ Error invocando Edge Function:', error);
      return { success: false, error: 'Error de conexión con el servicio de correo' };
    }

    if (data?.error) {
      console.error('❌ Error de API Resend:', data.error);
      return { success: false, error: `Error de Resend: ${data.error.message || JSON.stringify(data.error)}` };
    }

    console.log('✅ Email enviado correctamente:', data);
    return { success: true };
  } catch (error) {
    console.error('💥 Excepción en sendCommentNotification:', error);
    return { success: false, error: error.message };
  }
}
