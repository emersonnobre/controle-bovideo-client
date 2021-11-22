export function verificaNumero(array: any[]) {
    let valid: boolean = true
    array.forEach(numero => {
        if (!Number(numero) && Number(numero) != 0) valid = false
    })
    return valid
}