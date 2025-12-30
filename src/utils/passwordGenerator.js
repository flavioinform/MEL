/**
 * Genera contraseñas seguras aleatorias
 */

// Caracteres permitidos (evitando ambiguos como 0, O, l, 1, I)
const UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijkmnopqrstuvwxyz';
const NUMBERS = '23456789';
const SYMBOLS = '!@#$%&*-_+=?';

/**
 * Genera una contraseña aleatoria segura
 * @param {number} length - Longitud de la contraseña (por defecto 16)
 * @param {object} options - Opciones de generación
 * @returns {string} Contraseña generada
 */
export function generatePassword(length = 16, options = {}) {
    const {
        includeUppercase = true,
        includeLowercase = true,
        includeNumbers = true,
        includeSymbols = true,
    } = options;

    let charset = '';
    const required = [];

    if (includeUppercase) {
        charset += UPPERCASE;
        required.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
    }
    if (includeLowercase) {
        charset += LOWERCASE;
        required.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
    }
    if (includeNumbers) {
        charset += NUMBERS;
        required.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
    }
    if (includeSymbols) {
        charset += SYMBOLS;
        required.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }

    if (charset.length === 0) {
        throw new Error('Debe incluir al menos un tipo de carácter');
    }

    // Generar caracteres aleatorios
    const remainingLength = length - required.length;
    const randomChars = Array.from({ length: remainingLength }, () =>
        charset[Math.floor(Math.random() * charset.length)]
    );

    // Combinar y mezclar
    const allChars = [...required, ...randomChars];

    // Shuffle usando Fisher-Yates
    for (let i = allChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
    }

    return allChars.join('');
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} True si se copió exitosamente
 */
export async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                console.error('Fallback: No se pudo copiar', err);
                textArea.remove();
                return false;
            }
        }
    } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
        return false;
    }
}

/**
 * Evalúa la fortaleza de una contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {object} { score: number (0-4), feedback: string }
 */
export function evaluatePasswordStrength(password) {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) {
        feedback.push('Débil');
    } else if (score <= 4) {
        feedback.push('Media');
    } else {
        feedback.push('Fuerte');
    }

    return {
        score: Math.min(score, 4),
        feedback: feedback.join(', '),
    };
}
