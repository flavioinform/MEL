export const formatRut = (rut) => {
    if (!rut) return "";
    const cleanRut = rut.replace(/[^0-9kK]/g, "");
    if (cleanRut.length < 2) return cleanRut;

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
};

export const validateRut = (rut) => {
    if (!rut || rut.trim().length < 3) return false;

    const cleanRut = rut.replace(/[^0-9kK]/g, "");
    if (cleanRut.length < 2) return false;

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Validate digit
    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= body.length; i++) {
        const index = multiplo * rut.charAt(body.length - i);
        suma = suma + index;
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }

    // Calculate expected DV
    let sumaTotal = 0;
    let factor = 2;

    // Revert the body string for easier calculation
    const reversedBody = body.split('').reverse().join('');

    for (let i = 0; i < reversedBody.length; i++) {
        sumaTotal += parseInt(reversedBody[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const dvEsperado = 11 - (sumaTotal % 11);
    let dvCalculado = "";

    if (dvEsperado === 11) dvCalculado = "0";
    else if (dvEsperado === 10) dvCalculado = "K";
    else dvCalculado = dvEsperado.toString();

    return dv === dvCalculado;
};
