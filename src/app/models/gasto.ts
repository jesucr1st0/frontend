import { Conductor } from './conductor'
import { Dueno } from './dueno'
import { Factura } from './factura'
import { Servicio } from './servicio'
export class Gasto {
    id?: number
    monto: number
    fecha: Date
    descripcion: string
    tipo: string
    factura_id?: number
    factura?: Factura
    servicio_id?: number
    servicio?: Servicio
    conductor_id?: number   
    conductor?: Conductor
    dueno_id?: number
    dueno?: Dueno


}
