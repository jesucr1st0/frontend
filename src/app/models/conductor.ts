import { Dueno } from './dueno';
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
}
