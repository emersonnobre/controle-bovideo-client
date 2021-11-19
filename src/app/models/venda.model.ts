export interface Venda {
    id?: number
    data_venda: string
    quantidade: number
    id_especie: number
    id_propriedade_destino: number
    id_propriedade_origem: number
    motivo: string
}