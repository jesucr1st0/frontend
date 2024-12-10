import { Dueno } from './dueno';
import { User } from './user';
export class Conductor {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  direccion: string;
  fecha_nacimiento: Date;
  dueno_id?: number;
  dueno?: Dueno;
  usuario_id?: string;
  usuario?: User;
}
