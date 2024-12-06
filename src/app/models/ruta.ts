import { Vehiculo } from './vehiculo';
import { Contrato } from './contrato';
export class Ruta {
    id?: number
    contrato_id?: number
    contrato?: Contrato
    vehiculo_id?: number
    vehiculo?: Vehiculo
    fecha_asignacion: Date
    origen: string
    destino: string
}
