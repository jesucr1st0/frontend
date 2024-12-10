import { Conductor } from "./conductor"
import { DuenoVehiculo } from "./dueno-vehiculo"

export class Dueno {
    id?: number
    nombre: string
    apellido: string
    telefono: string
    correo: string
    direccion: string
    fecha_nacimiento: Date
    conductor_id?: number
    conductor?: Conductor
    usuario_id?: number
    duenosVehiculos?: DuenoVehiculo[]
}
