import { Cliente } from "./cliente"
import { Cuota } from "./cuota"
import { Ruta } from "./ruta"

export class Contrato {
    id?: number
    cliente_id?: number
    cliente?: Cliente
    fecha_inicio: Date
    fecha_fin: Date
    tipo_contrato: string
    monto: number
    estado: string
    descripcion: string
    terminos_y_condiciones: string
    rutas?: Ruta[]
    cuotas?: Cuota[]

}
