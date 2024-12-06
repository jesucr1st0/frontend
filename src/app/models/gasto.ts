import { Factura } from './factura'
export class Gasto {
    id?: number
    monto: number
    fecha: Date
    descripcion: string
    tipo: string
    factura_id?: number
    factura?: Factura
}
