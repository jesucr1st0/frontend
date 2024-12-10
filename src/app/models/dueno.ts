import { User } from "./user"

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
}
