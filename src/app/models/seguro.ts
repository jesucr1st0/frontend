import { Vehiculo } from "./vehiculo"

export class Seguro {
    id?: number
    vehiculo_id?: number
    vehiculo?: Vehiculo
    tipoSeguro: string
    monto: number
    fechaInicio: Date
    fechaFin: Date
}
