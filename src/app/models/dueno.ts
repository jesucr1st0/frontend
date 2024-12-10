import { User } from "./user"
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
    usuario_id?: string;
    usuario?: User;
    conductor_id?: number
    conductor?: Conductor
    duenosVehiculos?: DuenoVehiculo[]
}
