// Utilidades para llamar a las Edge Functions de administración

import { supabase } from '../lib/supabase';

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_URL?.replace('/rest/v1', '/functions/v1') || '';

/**
 * Obtiene el token de autenticación actual
 */
async function getAuthToken() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || '';
}

/**
 * Crea un nuevo usuario de empresa
 * @param {object} data - { email, password, nombre, rut_empresa }
 * @returns {Promise<object>} { success, user_id, empresa_id }
 */
export async function createCompanyUser(data) {
    const token = await getAuthToken();

    const response = await fetch(`${FUNCTIONS_URL}/create-company-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error || 'Error creating company user');
    }

    return result;
}

/**
 * Resetea la contraseña de un usuario
 * @param {string} userId - ID del usuario
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<object>} { success, message }
 */
export async function resetCompanyPassword(userId, newPassword) {
    const token = await getAuthToken();

    const response = await fetch(`${FUNCTIONS_URL}/reset-company-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            user_id: userId,
            new_password: newPassword,
        }),
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error || 'Error resetting password');
    }

    return result;
}

/**
 * Elimina un usuario de empresa y todos sus datos
 * @param {string} userId - ID del usuario en Auth
 * @param {number} empresaId - ID de la empresa en la base de datos
 * @returns {Promise<object>} { success, message }
 */
export async function deleteCompanyUser(userId, empresaId) {
    const token = await getAuthToken();

    const response = await fetch(`${FUNCTIONS_URL}/delete-company-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            user_id: userId,
            empresa_id: empresaId,
        }),
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error || 'Error deleting company user');
    }

    return result;
}
